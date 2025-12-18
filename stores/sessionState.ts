import {create} from "zustand";

interface ISessionStateTypes {
  count: number;
  free: boolean;
  price: number | null;
}
interface ISessionStateMutateTypes extends ISessionStateTypes {
  setCount: (index: number) => void;
  handleCountMinus: () => void;
  handleCountPlus: () => void;
  setFreeTrue: () => void;
  setFreeFalse: () => void;
  setPrice: (i: number | null) => void;
}

export const useSessionState = create<ISessionStateMutateTypes>((set) => ({
  count: 1,
  free: true,
  price: 0,
  setCount: (index) => set(() => ({count: index})),
  handleCountMinus: () =>
    set(({count}) => ({
      count: Number(count) <= 1 ? 1 : Number(count) - 1,
    })),
  handleCountPlus: () =>
    set(({count}) => ({
      count: Number(count) >= 5 ? 5 : Number(count) + 1,
    })),
  setFreeTrue: () => set(() => ({free: true})),
  setFreeFalse: () => set(() => ({free: false})),
  setPrice: (index) => set(() => ({price: index})),
}));
