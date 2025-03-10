import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface LoginPopupState {
  isOpen: boolean;
}

interface LoginPopupActions {
  openPopup: () => void;
  closePopup: () => void;
}

const useLoginPopupStore = create(
  combine<LoginPopupState, LoginPopupActions>(
    {
      isOpen: false,
    },
    (set) => ({
      openPopup: () => set({ isOpen: true }),
      closePopup: () => set({ isOpen: false }),
    })
  )
);

export default useLoginPopupStore;
