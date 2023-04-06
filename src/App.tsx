import { useState, useRef, useEffect } from "react";
import allRepos from "./assets/repos.json";
import { Repo, Search, Sort } from "./types";
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
  const [sort, setSort] = useState<Sort>(Sort.Updated);

  useEffect(() => {
    ref.current && ref.current.scrollIntoView();
  }, [search]);

  let repos = (allRepos.data.user.repositories.nodes as Repo[])
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
        r.description?.toLowerCase().includes(search.query.toLowerCase())
    )
    .sort(
      // eslint-disable-next-line
      (a, b) => {
        switch (sort) {
          // @ts-ignore
          case Sort.Updated: return new Date(b.pushedAt) - new Date(a.pushedAt);
          case Sort.Size: return b.diskUsage - a.diskUsage;
          // @ts-ignore
          case Sort.Age: return new Date(b.createdAt) - new Date(a.createdAt);
          case Sort.Name: return a.name.localeCompare(b.name);
        }
      }
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
        <Filter {...{ search, setSearch, sort, setSort }} />
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
