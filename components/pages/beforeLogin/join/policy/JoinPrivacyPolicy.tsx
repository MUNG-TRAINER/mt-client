import PrivacyPolicy from "@/markdown/privacy_policy.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
import {useJoinState, usePolicyState} from "@/stores/joinState";
export default function JoinPrivacyPolicy() {
  const {isPolicyAgree, toggleIsPolicyAgree} = useJoinState();
  const {isPPolicyState, setPPolicyState} = usePolicyState();
  return (
    <MotherPolicyLayout
      name="isAgree"
      radioState={isPolicyAgree}
      radioStateFn={toggleIsPolicyAgree}
      policyState={isPPolicyState}
      policyStateFn={setPPolicyState}
    >
      <JoinPolicyLayout>
        <PrivacyPolicy />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
