import { Children, ReactNode } from "react";

export const SafelyRenderChildren = ({ children }: { children: ReactNode }) => {
  const count = Children.count(children);
  if (count > 5000) {
    return <span>You're attempting to render too many children</span>;
  }

  return <>{children}</>;
};
