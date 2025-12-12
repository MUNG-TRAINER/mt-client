import TrainerTerm from "@/markdown/trainer_terms.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
export default function JoinTrainerTerm() {
  return (
    <MotherPolicyLayout name="isTrainerAgree">
      <JoinPolicyLayout>
        <TrainerTerm />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
