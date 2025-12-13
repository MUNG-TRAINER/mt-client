import UserTerm from "@/markdown/user_terms.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
import {useJoinState, usePolicyState} from "@/stores/joinState";
export default function JoinUserTerm() {
  const {isUserAgree, toggleIsUserAgree} = useJoinState();
  const {isUPolicyState, setUPolicyState} = usePolicyState();
  return (
    <MotherPolicyLayout
      name="isUserAgree"
      radioState={isUserAgree}
      radioStateFn={toggleIsUserAgree}
      policyState={isUPolicyState}
      policyStateFn={setUPolicyState}
    >
      <JoinPolicyLayout>
        <UserTerm />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
