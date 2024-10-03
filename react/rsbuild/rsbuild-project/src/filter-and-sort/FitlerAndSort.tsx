import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function usersData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_limit=10`
      );
      return await res.json();
    },
  });

  const [shownUser, setShownUser] = useState<any[]>(data);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortKey, setSortKey] = useState<"" | "name" | "age">("");
  const [sortDir, setSortDir] = useState<"ascn" | "dscn">("ascn");

  const changeSortDir = (dir: "ascn" | "dscn") => {
    setSortDir(dir);
  };

  const filterUser = (name: string) => {
    setFilterTerm(name);

    if (name) {
      setShownUser((prev) =>
        prev.filter((user) =>
          user.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else {
      setShownUser(data);
      sortUser(sortKey);
    }
  };

  const sortUser = (key: "name" | "age" | "") => {
    setSortKey(key);

    if (!sortKey) {
      setShownUser((prev) => prev.sort((a, b) => a.name - b.name));
      return;
    }

    if (sortKey === "name") {
      const copied = [...shownUser];
      //   copied.sort((a, b) => {
      //     if (a.name < b.name) {
      //       return sortDir === "ascn" ? -1 : 1;
      //     }
      //     if (a.name > b.name) {
      //       return sortDir === "ascn" ? 1 : -1;
      //     }
      //     return 0;
      //   });
      copied.sort((a, b) => a.name.localeCompare(b.name));

      setShownUser(copied);
    } else if (sortKey === "age") {
      const copied = [...shownUser];
      copied.sort((a, b) => a.name.length - b.name.length);
      setShownUser(copied);
    }
  };

  useEffect(() => {
    if (isPending || error || !data) return;

    setShownUser(data);

    if (filterTerm) {
      filterUser(filterTerm);
    }
    if (sortKey) {
      sortUser(sortKey);
    }
  }, [isPending, error, data, filterTerm, sortKey, sortDir]);

  console.log("data: ", shownUser);

  return {
    isPending,
    error,
    data: shownUser,
    filterUser,
    sortUser,
    changeSortDir,
  };
}

export const FilterAndSort = () => {
  const { isPending, error, data, filterUser, sortUser, changeSortDir } =
    usersData();
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data!</div>;

  return (
    <div>
      <div>
        <h3>Filter And Sort</h3>
        <div>
          <div>Filter</div>
          <input type="text" onChange={(e) => filterUser(e.target.value)} />
          <div>Sort</div>
          <div>sort dir</div>
          <select
            onChange={(e) => changeSortDir(e.target.value as "ascn" | "dscn")}
          >
            <option value="ascn">ascn</option>
            <option value="dscn">dscn</option>
          </select>
          <div>sort key</div>
          <select
            onChange={(e) => sortUser(e.target.value as "name" | "age" | "")}
          >
            <option value="">none</option>
            <option value="name">name</option>
            <option value="age">age</option>
          </select>
        </div>
      </div>

      <div>
        {data.map((d: any) => (
          <div key={d.id}>{d.name}</div>
        ))}
      </div>
    </div>
  );
};
