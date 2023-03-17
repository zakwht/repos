import {
  HistoryIcon,
  CommitIcon,
  StarIcon,
  ForkIcon,
  LicenseIcon
} from "../assets/icons";
import { Repo, Search } from "../types";
import { LangButton, TopicButton } from "./Buttons";

export const Modal = ({
  repo,
  exit,
  setSearch
}: {
  repo: Repo;
  exit: () => void;
  setSearch: (x: Search) => void;
}) => {
  const topics = repo.repositoryTopics.nodes.filter(
    ({ topic }) =>
      !repo.languages.edges.some(
        (lang) => lang.node.name.toLowerCase() === topic.name.toLowerCase()
      )
  );

  return (
    <>
      <div className="modal-blur" onClick={exit} />
      <article className="modal">
        <h4>
          <a href={repo.url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </h4>

        <span>{repo.description}</span>

        <div className="space-btwn">
          <ul>
            {repo.languages.edges.map(({ node }) => (
              <li className="lang" key={node.name}>
                <LangButton
                  {...node}
                  onClick={() => {
                    setSearch({ lang: node.name });
                    exit();
                  }}
                />
              </li>
            ))}
          </ul>
          <ul>
            {topics.map(({ topic }) => (
              <li className="topic" key={topic.name}>
                <TopicButton
                  {...topic}
                  onClick={() => {
                    setSearch({ topic: topic.name });
                    exit();
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <ul className="modal-footer">
          <li>
            <HistoryIcon />
            <span>{repo.createdAt.slice(0, 4)}</span>
          </li>
          <li>
            <CommitIcon />
            <span>{repo.object.history.totalCount} commits</span>
          </li>
          {repo.stargazerCount > 0 && (
            <li>
              <StarIcon />
              <span>{repo.stargazerCount} stars</span>
            </li>
          )}
          {repo.forkCount > 0 && (
            <li>
              <ForkIcon />
              <span>{repo.forkCount} forks</span>
            </li>
          )}
          {repo.licenseInfo && (
            <li>
              <LicenseIcon />
              <span>{repo.licenseInfo.name}</span>
            </li>
          )}
        </ul>
      </article>
    </>
  );
};
