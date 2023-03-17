import { useState, useRef, useEffect } from "react";
import allRepos from "./assets/repos.json";
import { Repo, Search } from "./types";
import { RepoBox } from "./components/RepoBox";
import { Modal } from "./components/Modal";
import { SideBar } from "./components/SideBar";
import { Filter } from "./components/Filter";

export const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [modalRepo, setModalRepo] = useState<Repo>();
  const [search, setSearch] = useState<Search>(
    Object.fromEntries(new URLSearchParams(window.location.search))
  );

  useEffect(() => {
    ref.current && ref.current.scrollIntoView();
  }, [search]);

  let repos = allRepos
    .filter((r) =>
      r.languages.edges.some(
        (x) => x.node.name === (search.lang || x.node.name)
      )
    )
    .filter((r) =>
      r.repositoryTopics.nodes.some(
        (x) => x.topic.name === (search.topic || x.topic.name)
      )
    )
    .filter(
      (r) =>
        !search.query ||
        r.name.includes(search.query.toLowerCase()) ||
        r.description.toLowerCase().includes(search.query.toLowerCase())
    );

  return (
    <>
      {modalRepo && (
        <Modal
          setSearch={setSearch}
          repo={modalRepo}
          exit={() => setModalRepo(undefined)}
        />
      )}

      <SideBar search={search} setSearch={setSearch} />

      <main id="repos" ref={ref}>
        <Filter search={search} setSearch={setSearch} />
        <ul className="repos">
          {repos.map((r) => (
            <RepoBox
              {...r}
              key={r.name}
              setSearch={(s: {}) => setSearch({ ...search, ...s })}
              setModalRepo={setModalRepo}
            />
          ))}
        </ul>
      </main>
    </>
  );
};
