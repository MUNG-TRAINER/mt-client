import {create} from "zustand";

interface IRegistModalState extends IRegistModalStateFn {
  modal: boolean;
  mode: "wishlist" | "apply" | null;
}

interface IRegistModalStateFn {
  setModalOn: () => void;
  setModalOff: () => void;
  setMode: (mode: IRegistModalState["mode"]) => void;
}

export const useRegistModal = create<IRegistModalState>((set) => ({
  modal: false,
  mode: null,
  setModalOn: () => set(() => ({modal: true})),
  setModalOff: () => set(() => ({modal: false})),
  setMode: (mode) => set(() => ({mode})),
}));
