import { useModal } from "./ModalContext";

export const SomeCompUsingModal = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      modalConfig: {
        type: "info",
        content: <div>it's modal content!</div>,
      },
    });
  };

  return (
    <div>
      <div>SomeCompUsingModal</div>
      <button onClick={handleOpenModal}>open modal</button>
    </div>
  );
};
