import {create} from "zustand";

interface IApplicationStateType {
  activeTab: "pending" | "completed";
  selectedIndex: number[];
}
interface IApplicationSetStateType {
  setActiveTab: (tab: "pending" | "completed") => void;
  setSelectedIndex: (id: number, checked: boolean) => void;
  resetSelectedIndex: () => void;
}

type ApplicationStateType = IApplicationSetStateType & IApplicationStateType;

export const useApplicationState = create<ApplicationStateType>((set) => ({
  activeTab: "pending",
  selectedIndex: [],
  setActiveTab: (tab) => set(() => ({activeTab: tab})),
  setSelectedIndex: (id, checked) =>
    set(({selectedIndex}) => ({
      selectedIndex: checked
        ? [...selectedIndex, id]
        : selectedIndex.filter((x) => x !== id),
    })),
  resetSelectedIndex: () => set(() => ({selectedIndex: []})),
}));
