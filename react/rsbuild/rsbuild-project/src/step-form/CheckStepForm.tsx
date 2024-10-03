import { useEffect, useRef, useState } from "react";
import { useStepFormContext } from "./StepForm";

export const CheckStepForm = () => {
  const { form, validationStatus, changeValidationStatus, resetForm } =
    useStepFormContext();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show]);

  useEffect(() => {
    if (validationStatus === "request") {
      changeValidationStatus("pass");
      setShow(true);
    }
  }, [validationStatus]);

  return (
    <>
      <dialog ref={dialogRef} role="dialog">
        <div>
          <div>validation reseults: {validationStatus}</div>
          <div>name: {form.name}</div>
          <div>address: {form.address}</div>
          <div>contact: {form.contact}</div>
          <button
            onClick={() => {
              alert("submitted!");
              resetForm();
              setShow(false);
            }}
          >
            submit
          </button>
          <button onClick={() => setShow(false)}>close</button>
        </div>
      </dialog>
    </>
  );
};
