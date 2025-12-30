import {create} from "zustand";
interface IUserAlertState {
  alertState: boolean;
  setAlertState: () => void;
  resetAlertState: () => void;
}

export const useAlertState = create<IUserAlertState>((set) => ({
  alertState: false,
  setAlertState: () => set(({alertState}) => ({alertState: !alertState})),
  resetAlertState: () => set(() => ({alertState: false})),
}));
