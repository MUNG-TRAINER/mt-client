# 백엔드 수정 요청 - 상담 API 이미지 URL 반환

## 🚨 현재 문제

상담 API(`GET /trainer/counseling`)에서 반려견 이미지를 **S3 키** 형태로 반환하고 있습니다:

```json
{
  "counselingId": 1,
  "dogName": "뭉치",
  "ownerName": "홍길동",
  "dogImage": "dog-profile/1/dog2-1765940776168.jpeg"  ❌ S3 키
}
```

Next.js Image 컴포넌트는 상대 경로를 지원하지 않아 다음 에러가 발생합니다:

```
Error: Failed to parse src "dog-profile/1/dog2-1765940776168.jpeg"
on `next/image`, if using relative image it must start with a
leading slash "/" or be an absolute URL (http:// or https://)
```

---

## ✅ 필요한 수정

### 방법 1: Presigned URL 반환 (권장)

API 응답에서 S3 Presigned URL을 반환해주세요:

```json
{
  "counselingId": 1,
  "dogName": "뭉치",
  "ownerName": "홍길동",
  "dogImage": "https://your-bucket.s3.ap-northeast-2.amazonaws.com/dog-profile/1/dog2-1765940776168.jpeg?X-Amz-Algorithm=..."  ✅ Presigned URL
}
```

#### Java 코드 예시 (MyBatis + Service 레이어)

**CounselingService.java**

```java
@Service
@RequiredArgsConstructor
public class CounselingService {
    private final CounselingDAO counselingDAO;
    private final S3Service s3Service; // S3 Presigned URL 생성 서비스

    public List<CounselingDogResponse> getDogsByCompleted(boolean completed) {
        List<CounselingDogResponse> dogs = counselingDAO.findDogsByCompleted(completed);

        // S3 키를 Presigned URL로 변환
        return dogs.stream()
            .map(dog -> {
                if (dog.getDogImage() != null && !dog.getDogImage().isEmpty()) {
                    String presignedUrl = s3Service.generatePresignedUrl(
                        dog.getDogImage(),
                        3600 // 1시간 유효
                    );
                    return new CounselingDogResponse(
                        dog.getCounselingId(),
                        dog.getDogName(),
                        dog.getOwnerName(),
                        presignedUrl
                    );
                }
                return dog;
            })
            .collect(Collectors.toList());
    }
}
```

**S3Service.java**

```java
@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public String generatePresignedUrl(String fileKey, int expirationSeconds) {
        try {
            Date expiration = new Date(System.currentTimeMillis() + expirationSeconds * 1000L);

            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, fileKey)
                    .withMethod(HttpMethod.GET)
                    .withExpiration(expiration);

            URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
            return url.toString();
        } catch (Exception e) {
            log.error("Presigned URL 생성 실패: {}", fileKey, e);
            return null;
        }
    }
}
```

---

### 방법 2: 공개 S3 URL 반환

S3 버킷이 공개 읽기 권한이 있다면:

```json
{
  "dogImage": "https://your-bucket.s3.ap-northeast-2.amazonaws.com/dog-profile/1/dog2-1765940776168.jpeg"
}
```

---

## 📝 참고사항

### 다른 API도 동일하게 수정 필요

같은 패턴으로 이미지를 반환하는 다른 API들도 확인해주세요:

- `GET /dogs` - 반려견 목록
- `GET /dogs/{id}` - 반려견 상세
- `GET /trainer/{id}` - 훈련사 프로필
- 기타 프로필 이미지를 반환하는 모든 API

### Presigned URL 만료 시간

- **권장**: 1시간 (3600초)
- **최대**: 7일
- 프론트엔드에서 캐싱을 고려하여 적절한 시간 설정

### 성능 최적화

대량의 리스트를 반환할 때 성능 고려:

```java
// 병렬 처리로 성능 개선
return dogs.parallelStream()
    .map(dog -> convertToPresignedUrl(dog))
    .collect(Collectors.toList());
```

---

## 🔍 테스트 확인

수정 후 다음을 확인해주세요:

```bash
# API 호출
curl -X GET "https://api.example.com/trainer/counseling?completed=false" \
  -H "Cookie: session=..."

# 응답 예시
{
  "counselingId": 1,
  "dogName": "뭉치",
  "ownerName": "홍길동",
  "dogImage": "https://..."  # https:// 로 시작하는지 확인
}
```

---

**긴급도**: ⚠️ 높음 (프로덕션 에러 발생 중)  
**작성일**: 2025-12-19  
**요청자**: 프론트엔드팀
