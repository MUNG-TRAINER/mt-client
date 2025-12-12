import PrivacyPolicy from "@/markdown/privacy_policy.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
export default function JoinPrivacyPolicy() {
  return (
    <MotherPolicyLayout name="isAgree">
      <JoinPolicyLayout>
        <PrivacyPolicy />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
