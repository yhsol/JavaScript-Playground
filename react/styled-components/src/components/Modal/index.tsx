import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type ModalPropsType = {
  width?: string;
  height?: string;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const StyledModal = styled.div<ModalPropsType>`
  z-index: 100;
  background: white;
  position: relative;
  margin: 14rem auto;
  border-radius: 3px;
  width: ${(props) => (props.width ? props.width : "500px")};
  min-height: ${(props) => (props.height ? props.height : "300px")};
  padding: 1rem;
  border: 3px solid black;
  background-color: white;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalCloseButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border: none;
  background: none;
  border: 3px solid black;
  padding: 4px 8px;
  margin-right: 8px;
`;

const ButtonSection = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
`;

type ModalType = {
  children: ReactNode;
  isOpen: boolean;
  closeText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  width?: string;
  height?: string;
};

function Modal({
  children,
  isOpen,
  closeText,
  confirmText,
  onClose,
  onConfirm,
  width,
  height,
}: ModalType) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <ModalOverlay>
        <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
          <StyledModal width={width} height={height}>
            <ModalHeader>
              {/* <ModalCloseButton
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                X
              </ModalCloseButton> */}
            </ModalHeader>
            <div>{children}</div>
            <ButtonSection>
              {onConfirm ? (
                <>
                  <ModalCloseButton onClick={onClose}>
                    {closeText || "취소"}
                  </ModalCloseButton>
                  <ModalCloseButton onClick={onConfirm}>
                    {confirmText || "확인"}
                  </ModalCloseButton>
                </>
              ) : (
                <ModalCloseButton onClick={onClose}>
                  {closeText || "확인"}
                </ModalCloseButton>
              )}
            </ButtonSection>
          </StyledModal>
        </ModalWrapper>
      </ModalOverlay>
    </>,
    document.body
  );
}

export default Modal;
