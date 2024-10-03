import { createContext, ReactNode, useContext, useState } from "react";

type ModalType = "info" | "success" | "failed" | "custom";

type ModalState = {
  type?: ModalType;
  isOpen: boolean;
  content?: ReactNode;
};

const ModalContext = createContext<{
  modalState: ModalState;
  openModal: ({
    modalConfig,
  }: {
    modalConfig: Omit<ModalState, "isOpen">;
  }) => void;
  closeModal: () => void;
}>({
  modalState: { isOpen: false },
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

  const openModal = ({
    modalConfig,
  }: {
    modalConfig: Omit<ModalState, "isOpen">;
  }) => {
    setModalState({ ...modalConfig, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
