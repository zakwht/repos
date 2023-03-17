import { ClearIcon } from "../assets/icons";
import { Search } from "../types";

export const Filter = ({
  search,
  setSearch
}: {
  search: Search;
  setSearch: (s: Search) => void;
}) => (
  <div className="flex mb-8">
    <input
      value={search.query || ""}
      onChange={(e) => setSearch({ ...search, query: e.target.value })}
    />
    {Object.entries(search)
      .filter(([, v]) => !!v)
      .map(([k, v]) => (
        <span
          role="button"
          className="topic-button flex-center ml-4"
          onClick={() => setSearch({ ...search, [k]: undefined })}
          style={{ marginBottom: 0 }}
        >
          {`${k}:${v}`}
          <ClearIcon className="ml-4" />
        </span>
      ))}
  </div>
);
