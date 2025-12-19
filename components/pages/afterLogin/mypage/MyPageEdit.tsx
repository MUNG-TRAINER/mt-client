"use client";
import { UserIcon } from "@/components/icons/user";
import UserBadge from "@/components/shared/badges/UserBadge";
import AuthInput from "@/components/shared/inputs/AuthInput";
import useMe from "@/hooks/afterLogin/users/useMe";
import useUpdateUserInfo from "@/hooks/afterLogin/users/useUpdateUserInfo";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CakeIcon } from "@/components/icons/cake";
import { PhoneIcon } from "@/components/icons/phone";
import ProfileImageUploader from "./ProfileImageUploader";
import AddressInputs from "./AddressInputs";

export default function MyPageEdit() {
  const router = useRouter();
  const { data, isPending } = useMe();
  const { mutate, isPending: isUpdating, isError, error } = useUpdateUserInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [roadname, setRoadname] = useState("");
  const [postcode, setPostcode] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isError) {
      console.error("사용자 정보 수정 실패:", error);
      setErrorMessage("사용자 정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  }, [isError, error]);

  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.setAttribute(
      "src",
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    );
    document.body.appendChild(kakaoScript);
    return () => {
      document.body.removeChild(kakaoScript);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setProfileImage(data.profileImage || null);
      setIsImageDeleted(false);
      setName(data.name || "");
      setPhone(data.phone || "");
      setBirth(data.birth || "");
      setSido(data.sido || "");
      setSigungu(data.sigungu || "");
      setRoadname(data.roadname || "");
      setPostcode(data.postcode || "");
      setRestAddress(data.restAddress || "");
    }
  }, [data]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 검증 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrorMessage("파일 크기는 5MB를 초과할 수 없습니다.");
        e.target.value = "";
        return;
      }

      // 파일 형식 검증
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage(
          "지원하지 않는 파일 형식입니다. (지원 형식: JPG, PNG, GIF, WebP)"
        );
        e.target.value = "";
        return;
      }

      setProfileFile(file);
      setIsImageDeleted(false);
      setErrorMessage("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
    setProfileFile(null);
    setIsImageDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      let profileImageUrl: string | undefined;

      if (isImageDeleted) {
        profileImageUrl = "";
      } else if (profileFile) {
        const presignedUrlResponse = await fetch("/api/s3/getPresignedUrl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: profileFile.name,
            contentType: profileFile.type,
            category: "profile",
          }),
        });

        if (!presignedUrlResponse.ok) {
          const errorData = await presignedUrlResponse.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `프로필 이미지 업로드 URL 발급에 실패했습니다. (상태 코드: ${presignedUrlResponse.status})`
          );
        }

        const { presignedUrl } = await presignedUrlResponse.json();

        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": profileFile.type,
          },
          body: profileFile,
        });

        if (!uploadResponse.ok) {
          let errorMessage = "프로필 이미지 업로드에 실패했습니다.";

          if (uploadResponse.status === 403) {
            errorMessage = "이미지 업로드 권한이 없습니다. 다시 시도해주세요.";
          } else if (uploadResponse.status === 413) {
            errorMessage =
              "파일 크기가 너무 큽니다. 5MB 이하의 이미지를 선택해주세요.";
          } else if (uploadResponse.status >= 500) {
            errorMessage =
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          } else if (uploadResponse.status === 0) {
            errorMessage = "네트워크 연결을 확인해주세요.";
          } else {
            errorMessage = `이미지 업로드에 실패했습니다. (상태 코드: ${uploadResponse.status})`;
          }

          throw new Error(errorMessage);
        }

        const url = new URL(presignedUrl);
        profileImageUrl = url.pathname.substring(1);
      }

      const updateData: Partial<UpdateUserInfoType> = {
        name,
        phone: phone.replace(/-/g, ""),
        birth,
      };

      if (sido) updateData.sido = sido;
      if (sigungu) updateData.sigungu = sigungu;
      if (roadname) updateData.roadname = roadname;
      if (postcode) updateData.postcode = postcode;
      if (restAddress) updateData.restAddress = restAddress;

      if (isImageDeleted || profileImageUrl) {
        updateData.profileImage = profileImageUrl;
      }

      mutate(updateData as UpdateUserInfoType);
    } catch (error) {
      console.error("수정 중 오류:", error);
      const message =
        error instanceof Error
          ? error.message
          : "정보 수정 중 오류가 발생했습니다.";
      setErrorMessage(message);
    }
  };

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-2">
        <ProfileImageUploader
          profileImage={profileImage}
          isImageDeleted={isImageDeleted}
          fileInputRef={fileInputRef}
          onImageClick={handleImageClick}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
          hasExistingImage={!!data?.profileImage}
        />
        <div className="flex items-center gap-2">
          <UserBadge role={data?.role} />
          <h2 className="font-bold">{data?.userName}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AuthInput
          id="name"
          name="name"
          type="text"
          labelTxt="이름"
          placeholder="이름을 입력하세요"
          headIcon={<UserIcon className="size-5" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="font-bold">이메일</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={data?.email}
              readOnly
              className="border border-(--mt-gray-light) pl-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
            />
          </div>
        </div>

        <AuthInput
          id="phone"
          name="phone"
          type="tel"
          labelTxt="연락처"
          placeholder="연락처를 입력하세요"
          headIcon={<PhoneIcon />}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <AuthInput
          id="birth"
          name="birth"
          type="date"
          labelTxt="생년월일"
          placeholder="생년월일을 입력하세요"
          headIcon={<CakeIcon />}
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />

        <AddressInputs
          sido={sido}
          sigungu={sigungu}
          roadname={roadname}
          postcode={postcode}
          restAddress={restAddress}
          setSido={setSido}
          setSigungu={setSigungu}
          setRoadname={setRoadname}
          setPostcode={setPostcode}
          setRestAddress={setRestAddress}
        />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-(--mt-gray) text-(--mt-gray) py-3 rounded-md font-bold hover:bg-(--mt-gray-light) transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className={`flex-1 py-3 rounded-md font-bold text-(--mt-white) transition-colors ${
            isUpdating
              ? "bg-(--mt-gray) cursor-not-allowed"
              : "bg-(--mt-blue-point) hover:bg-(--mt-blue)"
          }`}
        >
          {isUpdating ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
