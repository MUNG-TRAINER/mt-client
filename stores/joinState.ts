import getOS from "@/util/getOS";
import {create} from "zustand";

interface IJoinStateType {
  isTrainer: boolean;
  isUserAgree: number;
  isTrainerAgree: number;
  isPolicyAgree: number;
  toggleIsTrainer: () => void;
  toggleIsUserAgree: (index: number) => void;
  toggleIsTrainerAgree: (index: number) => void;
  toggleIsPolicyAgree: (index: number) => void;
  resetToggleIsAgree: () => void;
}

export const useJoinState = create<IJoinStateType>((set) => ({
  isTrainer: true,
  isUserAgree: 0,
  isTrainerAgree: 0,
  isPolicyAgree: 0,
  toggleIsTrainer: () => set((prev) => ({isTrainer: !prev.isTrainer})),
  toggleIsUserAgree: (index: number) => set(() => ({isUserAgree: index})),
  toggleIsTrainerAgree: (index: number) => set(() => ({isTrainerAgree: index})),
  toggleIsPolicyAgree: (index: number) => set(() => ({isPolicyAgree: index})),
  resetToggleIsAgree: () =>
    set(() => ({
      isUserAgree: 0,
      isTrainerAgree: 0,
      isPolicyAgree: 0,
    })),
}));

interface IPolicyStateType {
  offset: number;
  isTPolicyState: boolean;
  isUPolicyState: boolean;
  isPPolicyState: boolean;
  setNextOffset: () => void;
  setZeroOffset: () => void;
  setUPolicyState: () => void;
  setTPolicyState: () => void;
  setPPolicyState: () => void;
  setResetPolicy: () => void;
}

const POLICY_OFFSET = {
  ios: 335,
  android: 315,
  desktop: 100,
} as const;

const calOSOffset = (offset: number) => {
  const os = getOS();
  const width =
    os === "ios"
      ? POLICY_OFFSET.ios
      : os === "android"
      ? POLICY_OFFSET.android
      : POLICY_OFFSET.desktop;

  const next = offset + width;
  const max = width * 2;
  return next > max ? max : next;
};

export const usePolicyState = create<IPolicyStateType>((set) => ({
  offset: 0,
  isTPolicyState: true,
  isUPolicyState: true,
  isPPolicyState: true,
  setNextOffset: () =>
    set(({offset}) => {
      return {offset: calOSOffset(offset)};
    }),
  setZeroOffset: () => set(() => ({offset: 0})),
  setUPolicyState: () =>
    set((state) => ({isUPolicyState: !state.isUPolicyState})),
  setTPolicyState: () =>
    set((state) => ({isTPolicyState: !state.isTPolicyState})),
  setPPolicyState: () =>
    set((state) => ({isPPolicyState: !state.isPPolicyState})),
  setResetPolicy: () =>
    set(() => ({
      isUPolicyState: true,
      isTPolicyState: true,
      isPPolicyState: true,
    })),
}));
