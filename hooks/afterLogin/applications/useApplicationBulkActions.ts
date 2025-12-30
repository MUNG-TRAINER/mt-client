"use client";
import useBulkUpdateStatus from "./useBulkUpdateStatus";
import {useQueryClient} from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const {mutateAsync: bulkUpdateStatusAsync} = useBulkUpdateStatus();

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runWithRetry = async <T>(fn: () => Promise<T>, retries = 1) => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await fn();
      } catch (e) {
        lastError = e;
        if (attempt < retries) await sleep(250);
      }
    }
    throw lastError;
  };

  const handleBulkApprove = async (
    selectedItems: Set<string>,
  ): Promise<BulkActionResult> => {
    const succeeded: string[] = [];
    const failed: Array<{key: string; error: unknown}> = [];

    const keys = Array.from(selectedItems);
    for (const key of keys) {
      const [courseId, dogId] = key.split("-").map(Number);
      try {
        await runWithRetry(
          () =>
            bulkUpdateStatusAsync({
              courseId,
              dogId,
              data: {status: "ACCEPT"},
            }),
          1,
        );
        succeeded.push(key);
      } catch (error) {
        failed.push({key, error});
      }
    }
    await queryClient.invalidateQueries({queryKey: ["groupedApplications"]});
    return {succeeded, failed};
  };

  const handleBulkReject = async (
    selectedItems: Set<string>,
    reason: string,
  ): Promise<BulkActionResult> => {
    const succeeded: string[] = [];
    const failed: Array<{key: string; error: unknown}> = [];

    const keys = Array.from(selectedItems);

    for (const key of keys) {
      const [courseId, dogId] = key.split("-").map(Number);
      try {
        await runWithRetry(
          () =>
            bulkUpdateStatusAsync({
              courseId,
              dogId,
              data: {status: "REJECTED", rejectReason: reason},
            }),
          1,
        );
        succeeded.push(key);
      } catch (error) {
        failed.push({key, error});
      }
    }
    await queryClient.invalidateQueries({queryKey: ["groupedApplications"]});
    return {succeeded, failed};
  };

  return {
    handleBulkApprove,
    handleBulkReject,
  };
}
