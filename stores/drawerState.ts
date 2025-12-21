import {create} from "zustand";
interface IDrawerState {
  toggle: boolean;
  onToggle: () => void;
  offToggle: () => void;
}
export const useDrawer = create<IDrawerState>((set) => ({
  toggle: false,
  onToggle: () => set(() => ({toggle: true})),
  offToggle: () => set(() => ({toggle: false})),
}));
