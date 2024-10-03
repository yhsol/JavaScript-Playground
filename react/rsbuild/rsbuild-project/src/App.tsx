import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { List } from "./virtualized-scrolling/List";
import { useDictionary } from "./virtualized-scrolling/useDictionary";

const queryClient = new QueryClient();

const App = () => {
  const items = useDictionary();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <StepFormProvider>
        <StepForm />
        <CheckStepForm />
      </StepFormProvider> */}
      {/* <ReusableModalProvider>
        <ReusableModal />
        <CompUsingReusableModal />
      </ReusableModalProvider> */}
      <List items={items} />
    </QueryClientProvider>
  );
};

export default App;
