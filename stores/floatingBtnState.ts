import {create} from "zustand";

interface IFloatingBtnState {
  planPage: boolean;
}
interface IFloatingBtnFn {
  togglePlanPage: () => void;
}

export const useFloatingBtnState = create<IFloatingBtnFn & IFloatingBtnState>(
  (set) => ({
    planPage: false,
    togglePlanPage: () => set((state) => ({planPage: !state.planPage})),
  })
);
