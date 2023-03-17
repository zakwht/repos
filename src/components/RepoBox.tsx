import { ForkIcon, StarIcon } from "../assets/icons";
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
    <span className="text-muted">{r.description}</span>
    <div className="mt-auto flex-center text-muted">
      <LangButton
        {...r.languages.edges[0].node}
        onClick={() => setSearch({ lang: r.languages.edges[0].node.name })}
      />
      {r.stargazerCount > 0 && (
        <span className="ml-16 flex-center">
          <StarIcon />
          {r.stargazerCount}
        </span>
      )}
      {r.forkCount > 0 && (
        <span className="ml-16 flex-center">
          <ForkIcon />
          {r.forkCount}
        </span>
      )}
    </div>
  </li>
);
