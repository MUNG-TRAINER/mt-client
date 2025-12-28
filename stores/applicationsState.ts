import { create } from "zustand";

interface IApplicationStateType {
  activeTab: "pending" | "completed";
  selectedIndex: number[]; // applicationId 배열
}
interface IApplicationSetStateType {
  setActiveTab: (tab: "pending" | "completed") => void;
  setSelectedIndex: (applicationId: number, checked: boolean) => void;
  resetSelectedIndex: () => void;
}

type ApplicationStateType = IApplicationSetStateType & IApplicationStateType;

export const useApplicationState = create<ApplicationStateType>((set) => ({
  activeTab: "pending",
  selectedIndex: [],
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
  setSelectedIndex: (applicationId, checked) =>
    set(({ selectedIndex }) => ({
      selectedIndex: checked
        ? [...selectedIndex, applicationId]
        : selectedIndex.filter((x) => x !== applicationId),
    })),
  resetSelectedIndex: () => set(() => ({ selectedIndex: [] })),
}));
