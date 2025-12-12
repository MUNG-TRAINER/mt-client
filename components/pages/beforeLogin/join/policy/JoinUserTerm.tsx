import UserTerm from "@/markdown/user_terms.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
export default function JoinUserTerm() {
  return (
    <MotherPolicyLayout name="isUserAgree">
      <JoinPolicyLayout>
        <UserTerm />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
