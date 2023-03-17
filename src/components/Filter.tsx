import { ClearIcon, SortIcon } from "../assets/icons";
import { Search, Sort } from "../types";

export const Filter = ({
  search,
  setSearch,
  sort,
  setSort
}: {
  search: Search;
  setSearch: (s: Search) => void;
  sort: Sort;
  setSort: (s: Sort) => void;
}) => (
  <div className="flex mb-8 relative">
    <input
      value={search.query || ""}
      onChange={(e) => setSearch({ ...search, query: e.target.value })}
    />
    {Object.entries(search)
      .filter(([, v]) => !!v)
      .map(([k, v]) => (
        <span
          key={k}
          role="button"
          className="topic-button flex-center ml-4"
          onClick={() => setSearch({ ...search, [k]: undefined })}
          style={{ marginBottom: 0 }}
        >
          {`${k}:${v}`}
          <ClearIcon className="ml-4" />
        </span>
      ))}
    <span
      className="flex-center link sort"
      role="button"
      onClick={() => setSort(Sort[Sort[(sort + 1) % 4] as any] as any)}
    >
      <SortIcon />
      {Sort[sort]}
    </span>
  </div>
);
