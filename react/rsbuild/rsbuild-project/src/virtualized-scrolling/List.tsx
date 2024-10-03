import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
}

export const List = ({ items }: { items: any[] }) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [start, setStart] = useState(0);
  const [shownItem, setShownItem] = useState<any>([]);

  useEffect(() => {
    if (!observerRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          const nextStart = start + 20;
          if (nextStart < items.length) {
            setStart(nextStart);
          }
        }
      },
      {
        root: scrollElementRef.current,
        threshold: 1,
      }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [start, shownItem]);

  useEffect(() => {
    setShownItem((prev: any) => [...prev, ...items.slice(start, start + 20)]);
  }, [start, items]);

  return (
    <ScrollWrapper ref={scrollElementRef}>
      <ListWrapper>
        {/**
         * Note: `SafelyRenderChildren` should NOT be removed while solving
         * this interview. This prevents rendering too many list items and
         * potentially crashing the web page. This also enforces an artificial
         * limit (5,000) to the amount of children that can be rendered at one
         * time during virtualization.
         */}
        <SafelyRenderChildren>
          {shownItem.map((word: string, index: number) => {
            const isLastElement = index === shownItem.length - 1;
            if (isLastElement) {
              console.log("isLastElement: ", isLastElement, word);
            }
            return (
              <div
                key={`${word}${index}`}
                ref={isLastElement ? lastElementRef : undefined}
              >
                <Item>{word}</Item>
              </div>
            );
          })}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
