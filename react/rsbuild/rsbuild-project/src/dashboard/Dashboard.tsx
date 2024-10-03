// Infinite scroll using Intersection Observer API
// react-query
// jsonplaceholder

import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

export function useUserData() {
  const [page, setPage] = useState(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["userData", page],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=3`
      );
      return await res.json();
    },
  });

  const [shownUserData, setShownUserData] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  const debounceedFilter = useCallback(
    _.debounce((filter: string) => {
      setFilter(filter.toLowerCase());
    }, 300),
    []
  );

  const handleFilter = (filter: string) => {
    debounceedFilter(filter);
  };

  useEffect(() => {
    if (data) {
      setShownUserData((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (!filter) return;

    setShownUserData((prev: any[]) => {
      return prev.filter((data) => {
        const name = data.name.toLowerCase();
        const email = data.email.toLowerCase();

        return name.includes(filter) || email.includes(filter);
      });
    });
  }, [filter]);

  return {
    loading: isPending,
    error,
    shownUserData,
    onSearch: handleFilter,
    setPage,
  };
}

export const Dashboard = () => {
  const { loading, error, shownUserData, onSearch, setPage } = useUserData();
  const [searchTerm, setSearchTerm] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollAreaREf = useRef<HTMLDivElement | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollAreaREf.current,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [shownUserData]);

  if (loading || !shownUserData) return "Loading...";
  if (error) return `An error has occured: ${error.message}`;

  return (
    <div>
      <div>
        <div>filter</div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <button
          onClick={() => {
            onSearch(searchTerm);
            setSearchTerm("");
          }}
        >
          Search
        </button>
      </div>
      <div ref={scrollAreaREf} style={{ height: "100px", overflowY: "scroll" }}>
        {shownUserData.map((user: any, index: number) => {
          const isLastElement = index === shownUserData.length - 1;

          return (
            <div
              key={user.id + index}
              style={{ margin: "12px 0", borderBottom: "1px solid black" }}
              ref={isLastElement ? lastElementRef : null}
            >
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.address.city}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
