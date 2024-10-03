import { createContext, ReactNode, useState } from "react";

export const CountContext = createContext<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>({
  count: 0,
  increment: () => null,
  decrement: () => null,
});

function useCount(initialCount?: number) {
  const [count, setCount] = useState(initialCount ?? 0);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, increment, decrement };
}

export function CountContainer({ children }: { children: ReactNode }) {
  const { count, increment, decrement } = useCount();

  return (
    <>
      <h1>Count</h1>
      <CountContext.Provider value={{ count, increment, decrement }}>
        {children}
      </CountContext.Provider>
    </>
  );
}

export function Count() {
  //   const { count, increment, decrement } = useContext(CountContext);
  const { count, increment, decrement } = useCount();
  return (
    <>
      <div onClick={decrement}>-</div>
      <div>Count: {count}</div>
      <div onClick={increment}>+</div>
    </>
  );
}
