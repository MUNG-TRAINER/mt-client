import {create} from "zustand";

interface ICounselingModal extends ICounselingModalFn {
  counselModalOpen: boolean;
  dogId: number | null;
}
interface ICounselingModalFn {
  setCounselModalOpen: () => void;
  setCounselModalClose: () => void;
  setDogId: (id: number | null) => void;
}

export const useCounselingModal = create<ICounselingModal>((set) => ({
  counselModalOpen: false,
  dogId: null,
  setCounselModalOpen: () => set(() => ({counselModalOpen: true})),
  setCounselModalClose: () => set(() => ({counselModalOpen: false})),
  setDogId: (id: number | null) => set(() => ({dogId: id})),
}));
