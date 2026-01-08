import {create} from "zustand";
interface IJoinRequiredInputState {
  userName: string;
  email: string;
  phone: string;
  name: string;
  birth: string;
  registCode: string;
  sido: string;
  sigungu: string;
  roadname: string;
  postcode: string;
}

interface IJoinRequiredInputStateFn {
  setUserName: (input: string) => void;
  setEmail: (input: string) => void;
  setPhone: (input: string) => void;
  setName: (input: string) => void;
  setBirth: (input: string) => void;
  setRegistCode: (input: string) => void;
  setSido: (sido: string) => void;
  setSigungu: (sigungu: string) => void;
  setRoadName: (roadname: string) => void;
  setPostCode: (postcode: string) => void;
  resetStates: () => void;
}

type TJoinRequiredStates = IJoinRequiredInputState & IJoinRequiredInputStateFn;

export const useJoinRequiredInputState = create<TJoinRequiredStates>((set) => ({
  userName: "",
  email: "",
  phone: "",
  name: "",
  birth: "",
  registCode: "",
  sido: "",
  sigungu: "",
  roadname: "",
  postcode: "",
  setUserName: (userName) => set(() => ({userName})),
  setEmail: (email) => set(() => ({email})),
  setPhone: (phone) => set(() => ({phone})),
  setName: (name) => set(() => ({name})),
  setBirth: (birth) => set(() => ({birth})),
  setRegistCode: (registCode) => set(() => ({registCode})),
  setSido: (sido) => set(() => ({sido})),
  setSigungu: (sigungu) => set(() => ({sigungu})),
  setRoadName: (roadname) => set(() => ({roadname})),
  setPostCode: (postcode) => set(() => ({postcode})),
  resetStates: () =>
    set(() => ({
      userName: "",
      email: "",
      phone: "",
      name: "",
      birth: "",
      registCode: "",
      sido: "",
      sigungu: "",
      roadname: "",
      postcode: "",
    })),
}));
