import { useEffect, useRef } from "react";
import { useModalContext } from "./ModalContext";

// showModal 을 통해 제어하면, 블로킹 모드 활성화 됨.
// open 을 통해 제어하면, 블로킹 모드가 활성화 되지 않음.

export const Modal = () => {
  const { modalState, closeModal } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // useEffect(() => {
  //   if (modalState.isOpen && dialogRef.current) {
  //     dialogRef.current.showModal(); // 모달을 블로킹 모드로 연다
  //   } else if (dialogRef.current) {
  //     dialogRef.current.close(); // 모달을 닫는다
  //   }
  // }, [modalState.isOpen]);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (modalState.isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [modalState.isOpen]);

  return (
    <dialog
      // open={modalState.isOpen}
      ref={dialogRef}
      style={{
        position: "fixed",
        border: "1px solid black",
        width: "500px",
        height: "500px",
      }}
    >
      <div style={{}}>
        {modalState.content}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          X
        </button>
      </div>
    </dialog>
  );
};
