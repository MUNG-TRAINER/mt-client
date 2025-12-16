import {create} from "zustand";

interface ISessionStateTypes {
  count: number | string;
}
interface ISessionStateMutateTypes extends ISessionStateTypes {
  setCount: (index: number | string) => void;
  handleCountMinus: () => void;
  handleCountPlus: () => void;
}

export const useSesseionState = create<ISessionStateMutateTypes>((set) => ({
  count: 1,
  setCount: (index) => set(() => ({count: index})),
  handleCountMinus: () =>
    set(({count}) => ({
      count: Number(count) <= 1 ? "1" : (Number(count) - 1).toString(),
    })),
  handleCountPlus: () =>
    set(({count}) => ({
      count: Number(count) >= 5 ? "5" : (Number(count) + 1).toString(),
    })),
}));
