import {useCallback, useState} from "react";
import useCheckUserName from "./useCheckUserName";
import useCheckEmail from "./useCheckEmail";
import {useQueryClient} from "@tanstack/react-query";

export default function useCheckValidation({
  userNameInput,
  emailInput,
}: {
  userNameInput: string;
  emailInput: string;
}) {
  const queryClient = useQueryClient();
  const [checkUserName, setCheckUserName] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [unableStates, setUnableStates] = useState({
    userName: true,
    email: true,
  });
  // Custom Hook
  const {refetch: checkUserNameRefetch} = useCheckUserName(userNameInput);
  const {refetch: checkEmailRefetch} = useCheckEmail(emailInput);
  /* functions */
  // 유저이름 확인
  const handleCheckUserName = async () => {
    queryClient.removeQueries({queryKey: ["checkUserName", userNameInput]});
    if (!userNameInput.trim()) {
      setCheckUserName(false);
      setUnableStates((prev) => ({
        ...prev,
        userName: true,
      }));
      return;
    }
    const {data} = await checkUserNameRefetch();
    if (data?.valid === true) {
      setCheckUserName(true);
      setUnableStates((prev) => ({
        ...prev,
        userName: false,
      }));
    } else {
      setCheckUserName(false);
      setUnableStates((prev) => ({
        ...prev,
        userName: true,
      }));
    }
  };
  // 유저 이메일 확인
  const handleCheckEmail = async () => {
    queryClient.removeQueries({queryKey: ["checkEmail", emailInput]});
    if (!emailInput.trim()) {
      setCheckEmail(false);
      setUnableStates((prev) => ({
        ...prev,
        email: true,
      }));
      return;
    }
    const {data} = await checkEmailRefetch();
    if (data?.valid === true) {
      setCheckEmail(true);
      setUnableStates((prev) => ({
        ...prev,
        email: false,
      }));
    } else {
      setCheckEmail(false);
      setUnableStates((prev) => ({
        ...prev,
        email: true,
      }));
    }
  };
  // Reset State
  const handleResetState = useCallback(() => {
    setCheckEmail(false);
    setCheckUserName(false);
    setUnableStates({email: true, userName: true});
    queryClient.removeQueries({queryKey: ["checkEmail", emailInput]});
    queryClient.removeQueries({queryKey: ["checkUserName", userNameInput]});
  }, [queryClient, emailInput, userNameInput]);

  return {
    checkUserName,
    checkEmail,
    unableStates,
    handleCheckUserName,
    handleCheckEmail,
    handleResetState,
  };
}
