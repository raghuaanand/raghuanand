import { create } from 'zustand';

export type ModalType = 'about' | 'skills' | 'experience' | 'projects' | 'blog' | 'contact';

interface DetailModalStore {
  isOpen: boolean;
  modalType: ModalType | null;
  scrollPositions: Record<ModalType, number>;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  saveScrollPosition: (type: ModalType, position: number) => void;
  getScrollPosition: (type: ModalType) => number;
}

export const useDetailModalStore = create<DetailModalStore>((set, get) => ({
  isOpen: false,
  modalType: null,
  scrollPositions: {
    about: 0,
    skills: 0,
    experience: 0,
    projects: 0,
    blog: 0,
    contact: 0,
  },
  openModal: (type: ModalType) => {
    set({ isOpen: true, modalType: type });
  },
  closeModal: () => {
    set({ isOpen: false, modalType: null });
  },
  saveScrollPosition: (type: ModalType, position: number) => {
    set((state) => ({
      scrollPositions: {
        ...state.scrollPositions,
        [type]: position,
      },
    }));
  },
  getScrollPosition: (type: ModalType) => {
    return get().scrollPositions[type] || 0;
  },
}));
