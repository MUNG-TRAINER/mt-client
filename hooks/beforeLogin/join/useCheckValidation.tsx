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
  const [unableStates, setAbleStatus] = useState({userName: true, email: true});
  // Custom Hook
  const {refetch: checkUserNameRefetch} = useCheckUserName(userNameInput);
  const {refetch: checkEmailRefetch} = useCheckEmail(emailInput);
  /* functions */
  // 유저이름 확인
  const handleCheckUserName = async () => {
    queryClient.removeQueries({queryKey: ["checkUserName", userNameInput]});
    if (!userNameInput.trim()) {
      setCheckUserName(false);
      setAbleStatus((prev) => ({
        ...prev,
        userName: true,
      }));
      return;
    }
    const {data} = await checkUserNameRefetch();
    const isValid = data?.valid === true;
    setCheckUserName(isValid);
    setAbleStatus((prev) => ({
      ...prev,
      userName: isValid,
    }));
  };
  // 유저 이메일 확인
  const handleCheckEmail = async () => {
    queryClient.removeQueries({queryKey: ["checkEmail"]});
    if (!emailInput.trim()) {
      setCheckEmail(false);
      setAbleStatus((prev) => ({
        ...prev,
        email: true,
      }));
      return;
    }
    const {data} = await checkEmailRefetch();
    const isValid = data?.valid === true;
    setCheckEmail(isValid);
    setAbleStatus((prev) => ({
      ...prev,
      email: isValid,
    }));
  };
  // Reset State
  const handleResetState = useCallback(() => {
    setCheckEmail(false);
    setCheckUserName(false);
    setAbleStatus({email: true, userName: true});
    queryClient.removeQueries({queryKey: ["checkEmail"]});
    queryClient.removeQueries({queryKey: ["checkUserName"]});
  }, [queryClient]);

  return {
    checkUserName,
    checkEmail,
    unableStates,
    handleCheckUserName,
    handleCheckEmail,
    handleResetState,
  };
}
