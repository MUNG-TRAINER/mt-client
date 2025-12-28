import {createStore} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
interface IFCMState {
  targetId: number | null;
}
interface IFCMSetState {
  setTargetId: (id: number | null) => void;
}
export const useFCMState = createStore<IFCMState & IFCMSetState>()(
  persist(
    (set) => ({
      targetId: null,
      setTargetId: (id: number | null) => set(() => ({targetId: id})),
    }),
    {
      name: "TARGET_USERID",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
