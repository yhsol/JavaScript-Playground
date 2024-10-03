import { useModalContext } from "./ModalContext";

export const SomeCompUsingModal = () => {
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal({
      type: "info",
      content: <div>hello it's modal!</div>,
    });
  };

  return (
    <div>
      <div>SomeCompUsingModal</div>
      <button onClick={handleOpenModal}>open modal</button>
    </div>
  );
};
