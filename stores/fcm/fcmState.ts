import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
interface IFCMState {
  userId: number | null;
  targetId: number | null;
  trainerToken: string | null;
}
interface IFCMSetState {
  setUserId: (id: number | null) => void;
  setTargetId: (id: number | null) => void;
  setTrainerToken: (token: string | null) => void;
}
export const useFCMState = create<IFCMState & IFCMSetState>()(
  persist(
    (set) => ({
      userId: null,
      targetId: null,
      trainerToken: null,
      setUserId: (id: number | null) => set({userId: id}),
      setTargetId: (id: number | null) => set({targetId: id}),
      setTrainerToken: (token: string | null) => set({trainerToken: token}),
    }),
    {
      name: "TARGET_USERID",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
