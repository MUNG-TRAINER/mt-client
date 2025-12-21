import {ISessionType} from "@/types/course/sessionType";
import {create} from "zustand";

interface ISessionEditStateType extends ISessionEditSetStateType {
  sessionsData: Partial<ISessionType>[];
}

interface ISessionEditSetStateType {
  setSession: (session: ISessionType[]) => void;
  updateSession: (session: Partial<ISessionType>) => void;
}

export const useSessionEditState = create<ISessionEditStateType>((set) => ({
  sessionsData: [],
  setSession: (sessionsData: ISessionType[]) => set(() => ({sessionsData})),
  updateSession: (newSession: Partial<ISessionType>) =>
    set((state) => ({
      sessionsData: state.sessionsData.map((value) =>
        value.sessionId === newSession.sessionId ? newSession : value,
      ),
    })),
}));
