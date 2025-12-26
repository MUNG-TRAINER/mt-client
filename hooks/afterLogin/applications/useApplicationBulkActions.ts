"use client";
import useBulkUpdateStatus from "./useBulkUpdateStatus";

/**
 * 일괄 처리 결과 타입
 */
interface BulkActionResult {
  succeeded: string[]; // 성공한 항목의 key 배열
  failed: Array<{key: string; error: unknown}>; // 실패한 항목 정보
}

/**
 * 신청 일괄 처리 로직 훅
 */
export function useApplicationBulkActions() {
  const {mutate: bulkUpdateStatus} = useBulkUpdateStatus();

  const handleBulkApprove = async (
    selectedItems: Set<string>,
  ): Promise<BulkActionResult> => {
    const succeeded: string[] = [];
    const failed: Array<{key: string; error: unknown}> = [];

    await Promise.allSettled(
      Array.from(selectedItems).map((key) => {
        const [courseId, dogId] = key.split("-").map(Number);
        return new Promise<void>((resolve, reject) => {
          bulkUpdateStatus(
            {
              courseId,
              dogId,
              data: {status: "ACCEPT"},
            },
            {
              onSuccess: () => {
                succeeded.push(key);
                resolve();
              },
              onError: (error) => {
                failed.push({key, error});
                reject(error);
              },
            },
          );
        });
      }),
    );

    return {succeeded, failed};
  };

  const handleBulkReject = async (
    selectedItems: Set<string>,
    reason: string,
  ): Promise<BulkActionResult> => {
    const succeeded: string[] = [];
    const failed: Array<{key: string; error: unknown}> = [];

    await Promise.allSettled(
      Array.from(selectedItems).map((key) => {
        const [courseId, dogId] = key.split("-").map(Number);
        return new Promise<void>((resolve, reject) => {
          bulkUpdateStatus(
            {
              courseId,
              dogId,
              data: {status: "REJECTED", rejectReason: reason},
            },
            {
              onSuccess: () => {
                succeeded.push(key);
                resolve();
              },
              onError: (error) => {
                failed.push({key, error});
                reject(error);
              },
            },
          );
        });
      }),
    );

    return {succeeded, failed};
  };

  return {
    handleBulkApprove,
    handleBulkReject,
  };
}
