import {create} from "zustand";

interface ISessionStateTypes {
  count: number | null;
}
interface ISessionStateMutateTypes extends ISessionStateTypes {
  setCount: (index: number | null) => void;
  handleCountMinus: () => void;
  handleCountPlus: () => void;
}

export const useSessionState = create<ISessionStateMutateTypes>((set) => ({
  count: 1,
  setCount: (index) => set(() => ({count: index})),
  handleCountMinus: () =>
    set(({count}) => ({
      count: Number(count) <= 1 ? 1 : Number(count) - 1,
    })),
  handleCountPlus: () =>
    set(({count}) => ({
      count: Number(count) >= 5 ? 5 : Number(count) + 1,
    })),
}));
