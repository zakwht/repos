import React from 'react';
import allRepos from "./assets/repos.json"

import {ReactComponent as HistoryIcon} from "./assets/icons/history.svg"
import {ReactComponent as CommitIcon} from "./assets/icons/commit.svg"
import {ReactComponent as ForkIcon} from "./assets/icons/fork.svg"
import {ReactComponent as StarIcon} from "./assets/icons/star.svg"
import {ReactComponent as LicenseIcon} from "./assets/icons/license.svg"
import {ReactComponent as ClearIcon} from "./assets/icons/clear.svg"



type Repo = {
  name: string;
  url: string;
  description: string;
  createdAt: string;
  stargazerCount: number;
  forkCount: number;
  object: {
    history: {
      totalCount: number;
    }
  }
  licenseInfo: {
    name: string;
  } | null;
  languages: {
    edges: {
      size: number;
      node: {
        name: string;
        color: string;
      }
    }[]
  }
  repositoryTopics: {
    nodes: {
      topic: {
        name: string;
      }
    }[]
  }

}

const Modal = ({repo, exit, setSearch}: {
  repo: Repo, exit: () => void,
  setSearch: (x: {}) => void
}) => {

  const topics = repo.repositoryTopics.nodes.filter(({ topic }) => !repo.languages.edges.some(lang => lang.node.name.toLowerCase() === topic.name.toLowerCase()))

  return (
    <>
    <div 
      className="modal-blur"
      onClick={exit}
    />
    <article className="modal">
      <h4>
        <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
      </h4>
 
      
      <span>{(repo.description + ". ").repeat(3)}</span>

      <div className="modal-lists">
        <ul>
          {repo.languages.edges.map(({ node }) => (
            <li className="lang">
              <span
                role="button"
                onClick={() => {
                  setSearch({lang: node.name})
                  exit()
                }}
                className="flex-center link"
              >
                <div 
                  style={{backgroundColor: node.color}}
                />
                <span>{node.name}</span>
              </span>
            </li>
          ))}
        </ul>
        <ul>
          {topics.map(({ topic }) => (
            <li className="topic">
              <span 
                role="button" 
                onClick={() => {
                  setSearch({topic: topic.name})
                  exit()
                }}
              >{topic.name}</span>
            </li>
          ))}
        </ul>
      </div>


      <ul className="modal-footer">
        <li>
          <HistoryIcon />
          <span>{repo.createdAt.slice(0,4)}</span>
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
  )
}

export const App: React.FC = () => {

  const [modalRepo, setModalRepo] = React.useState<Repo>()
  const [search, setSearch] = React.useState<{
    lang?: string; topic?: string; name?: string;
  }>(
    Object.fromEntries(new URLSearchParams(window.location.search))
  )

  let repos = allRepos.filter(r => r.languages.edges.some(x => x.node.name === (
    search.lang || x.node.name
  ))).filter(r => r.repositoryTopics.nodes.some(x => x.topic.name === (
    search.topic || x.topic.name
  ))).filter(r => r.name === (
    search.name || r.name
  ))

  return (
    <>
    {modalRepo && <Modal setSearch={setSearch} repo={modalRepo} exit={() => setModalRepo(undefined)} />}
    {Object.keys(search).length > 0 && (
      <span 
        role="button"
        className="topic-button flex-center"
        onClick={() => setSearch({})}
      >
        {Object.entries(search).slice(0,1).map(([k,v]) => `${k}:${v}`)}
        <ClearIcon className="ml-4" />
      </span>
    )}
    <ul>
      {repos.map(repo => (
        <li onClick={() => setModalRepo(repo)}>
          <div>{repo.name}</div>
          <span>{repo.description}</span>
        </li>
      ))}
    </ul>
    </>
  );
}
