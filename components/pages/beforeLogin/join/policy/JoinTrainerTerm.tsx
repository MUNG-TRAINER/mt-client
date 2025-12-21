import TrainerTerm from "@/markdown/trainer_terms.md";
import JoinPolicyLayout from "./JoinPolicyLayout";
import MotherPolicyLayout from "./MotherPolicyLayout";
import {useJoinState, usePolicyState} from "@/stores/joinState";
export default function JoinTrainerTerm() {
  const {isTrainerAgree, toggleIsTrainerAgree} = useJoinState();
  const {isTPolicyState, setTPolicyState} = usePolicyState();
  return (
    <MotherPolicyLayout
      name="isTrainerAgree"
      radioState={isTrainerAgree}
      radioStateFn={toggleIsTrainerAgree}
      policyState={isTPolicyState}
      policyStateFn={setTPolicyState}
    >
      <JoinPolicyLayout>
        <TrainerTerm />
      </JoinPolicyLayout>
    </MotherPolicyLayout>
  );
}
