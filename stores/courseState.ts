import {create} from "zustand";

interface ICourseStateType extends ICourseStateFnType {
  editMode: boolean;
}
interface ICourseStateFnType {
  setEditModeOn: () => void;
  setEditModeOff: () => void;
}

export const useCourseState = create<ICourseStateType>((set) => ({
  editMode: false,
  setEditModeOn: () => set(() => ({editMode: true})),
  setEditModeOff: () => set(() => ({editMode: false})),
}));
