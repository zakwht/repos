import { Repo, Search } from "../types";
import { LangButton } from "./Buttons";

export const RepoBox = ({
  setSearch,
  setModalRepo,
  ...r
}: {
  setSearch: (s: Search) => void;
  setModalRepo: (r: Repo) => void;
} & Repo) => (
  <li className="repo-box flex-v ">
    <div className="space-btwn">
      <span className="link bold" onClick={() => setModalRepo(r)}>
        {r.name}
      </span>
      <span className="public">Public</span>
    </div>
    <span>{r.description}</span>
    <div className="mt-auto">
      <LangButton
        {...r.languages.edges[0].node}
        onClick={() => setSearch({ lang: r.languages.edges[0].node.name })}
      />
    </div>
  </li>
);
