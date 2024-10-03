import { useReusableModalContext } from "./ReusableModal";

export const CompUsingReusableModal = () => {
  const { setOpen, setInfo } = useReusableModalContext();
  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
          setInfo({
            type: "success",
            content: "it's success modal!",
          });
        }}
      >
        open modal
      </button>
    </div>
  );
};
