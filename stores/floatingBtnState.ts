import {create} from "zustand";

interface IFloatingBtnState {
  planPage: boolean;
}
interface IFloatingBtnFn {
  togglePlanPage: () => void;
  resetBtnState: () => void;
}

export const useFloatingBtnState = create<IFloatingBtnFn & IFloatingBtnState>(
  (set) => ({
    planPage: false,
    togglePlanPage: () => set((state) => ({planPage: !state.planPage})),
    resetBtnState: () => set(() => ({planPage: false})),
  }),
);
