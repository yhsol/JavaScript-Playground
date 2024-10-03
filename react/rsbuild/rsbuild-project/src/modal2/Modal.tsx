import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useModal } from "./ModalContext";

export const Modal = () => {
  const { modalState, closeModal } = useModal();

  useEffect(() => {
    if (modalState.isOpen) {
      const originalFocus = document.activeElement as HTMLElement;
      const modalElement = document.getElementById("modal");

      if (modalElement) {
        modalElement.focus();
      }

      return () => {
        if (originalFocus) originalFocus.focus();
      };
    }
  }, []);

  if (!modalState.isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={closeModal}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="modal"
        id="modal"
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          border: "1px solid black",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={closeModal}
        >
          x
        </button>
        <div>{modalState.content}</div>
      </div>
    </div>,
    document.body
  );
};
