import { useFilter } from "../../hooks/useFilter";
import { Filter } from "../../types/Filter.types";

const filters: { text: string; filter: Filter }[] = [
  { text: "전체", filter: "ALL" },
  { text: "완료", filter: "DONE" },
  { text: "미완료", filter: "UNDONE" },
];

function TodoFilters() {
  const [filter, applyFilter] = useFilter();

  return (
    <div>
      <b>필터: </b>
      {filters.map((f) => (
        <button
          key={f.filter}
          onClick={() => applyFilter(f.filter)}
          disabled={filter === f.filter}
        >
          {f.text}
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;
