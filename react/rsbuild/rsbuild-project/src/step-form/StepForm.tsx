import { createContext, ReactNode, useContext, useState } from "react";

type StepForm = {
  name: string;
  address: string;
  contact: string;
};

const INITIAL_STEPFORM = {
  name: "",
  address: "",
  contact: "",
};

export const StepFormContext = createContext<{
  form: StepForm;
  currentStep: number;
  validationStatus: "request" | "pass" | "reject" | "none";
  changeForm: (key: "name" | "address" | "contact", value: string) => void;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  changeValidationStatus: (
    status: "request" | "pass" | "reject" | "none"
  ) => void;
}>({
  form: INITIAL_STEPFORM,
  currentStep: 1,
  validationStatus: "none",
  changeForm: () => null,
  resetForm: () => null,
  nextStep: () => null,
  prevStep: () => null,
  changeValidationStatus: () => null,
});

export const useStepFormContext = () => useContext(StepFormContext);

export function useStepForm() {
  const [stepForm, setStepForm] = useState(INITIAL_STEPFORM);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationStatus, setValidationStatus] = useState<
    "request" | "pass" | "reject" | "none"
  >("none");

  const handleChangeForm = (
    key: "name" | "address" | "contact",
    value: string
  ) => {
    setStepForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateCurrentStep = () => {
    if (currentStep === 1 && !stepForm.name) {
      return false;
    }
    if (currentStep === 2 && !stepForm.address) {
      return false;
    }
    if (currentStep === 3 && !stepForm.contact) {
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      setValidationStatus("reject");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setStepForm(INITIAL_STEPFORM), setCurrentStep(1);
  };

  return {
    form: stepForm,
    currentStep,
    validationStatus,
    changeForm: handleChangeForm,
    resetForm,
    nextStep,
    prevStep,
    changeValidationStatus: (status: "request" | "pass" | "reject" | "none") =>
      setValidationStatus(status),
  };
}

export const StepFormProvider = ({ children }: { children: ReactNode }) => {
  const {
    form,
    currentStep,
    validationStatus,
    changeForm,
    resetForm,
    nextStep,
    prevStep,
    changeValidationStatus,
  } = useStepForm();

  return (
    <StepFormContext.Provider
      value={{
        form,
        currentStep,
        validationStatus,
        changeForm,
        resetForm,
        nextStep,
        prevStep,
        changeValidationStatus,
      }}
    >
      {children}
    </StepFormContext.Provider>
  );
};

export const StepForm = () => {
  const {
    form,
    currentStep,
    validationStatus,
    changeForm,
    resetForm,
    nextStep,
    prevStep,
    changeValidationStatus,
  } = useStepFormContext();

  return (
    <>
      <h3>Multi-step Form - Step {currentStep}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        {currentStep === 1 && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => changeForm("name", e.target.value)}
          />
        )}
        {currentStep === 2 && (
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={(e) => changeForm("address", e.target.value)}
          />
        )}
        {currentStep === 3 && (
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={(e) => changeForm("contact", e.target.value)}
          />
        )}
      </form>
      <button onClick={prevStep} disabled={currentStep === 1}>
        Previous
      </button>
      <button onClick={nextStep} disabled={currentStep === 3}>
        Next
      </button>
      <button
        disabled={currentStep !== 3}
        onClick={() => {
          changeValidationStatus("request");
        }}
      >
        Submit
      </button>
      <button onClick={resetForm}>reset</button>
    </>
  );
};
