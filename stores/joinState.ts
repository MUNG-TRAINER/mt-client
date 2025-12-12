import {create} from "zustand";

interface IJoinStateType {
  isTrainer: boolean;
  toggleIsTrainer: () => void;
}

export const useJoinState = create<IJoinStateType>((set) => ({
  isTrainer: true,
  toggleIsTrainer: () =>
    set((prev) => {
      const {setZeroOffset} = usePolicyState();
      setZeroOffset();
      return {
        isTrainer: !prev.isTrainer,
      };
    }),
}));

interface IPolicyStateType {
  offset: number;
  setNextOffset: () => void;
  setZeroOffset: () => void;
}

export const usePolicyState = create<IPolicyStateType>((set) => ({
  offset: 0,
  setNextOffset: () =>
    set(({offset}) => {
      if (offset > 712) {
        return {offset: 712};
      }
      return {offset: offset + 356};
    }),
  setZeroOffset: () => set(() => ({offset: 0})),
}));
