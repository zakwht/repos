import React from 'react';
import allRepos from "./assets/repos.json"
import stats from "./assets/stats.json"

import {ReactComponent as HistoryIcon} from "./assets/icons/history.svg"
import {ReactComponent as CommitIcon} from "./assets/icons/commit.svg"
import {ReactComponent as ForkIcon} from "./assets/icons/fork.svg"
import {ReactComponent as StarIcon} from "./assets/icons/star.svg"
import {ReactComponent as LicenseIcon} from "./assets/icons/license.svg"
import {ReactComponent as ClearIcon} from "./assets/icons/clear.svg"

// util
const byteFormat = (b: number): string => (
  b > 2000 ?
    `${(b/1000).toFixed(2)} kB` :
    `${b} B`
)

const RepoBox = ({setSearch, setModalRepo, ...r}: {setSearch: (s: {}) => void, setModalRepo: (r: Repo) => void} & Repo) => (
  <li className="repo-box flex-v ">
    <div className="space-btwn">
      <span className="link bold" onClick={() => setModalRepo(r)}>{r.name}</span>
      <span className="public">Public</span>
    </div>
    <span>{r.description}</span>
    <div className="mt-auto">
      <LangButton {...r.languages.edges[0].node} onClick={() => setSearch({lang: r.languages.edges[0].node.name})} />
    </div>
  </li>
)

const TopicButton = ({ name, onClick }: {name: React.ReactNode, onClick: () => void}) => (
  <span 
    role="button" 
    onClick={onClick}
    className="topic-button"
  >{name}</span>
)

const LangButton = ({name, color, onClick}: {
  name: string, color: string, onClick: () => void
}) => (
  <span
    role="button"
    onClick={onClick}
    className="lang-button flex-center link"
  >
    <div style={{backgroundColor: color}} />
    <span>{name}</span>
  </span>
)


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
 
      <span>{repo.description}</span>

      <div className="space-btwn">
        <ul>
          {repo.languages.edges.map(({ node }) => (
            <li className="lang" key={node.name}>
              <LangButton
                {...node}
                onClick={() => {
                  setSearch({lang: node.name})
                  exit()
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
                  setSearch({topic: topic.name})
                  exit()
                }}
              />
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

  const ref = React.useRef<HTMLDivElement>(null)
  const [modalRepo, setModalRepo] = React.useState<Repo>()
  const [search, setSearch] = React.useState<{
    lang?: string; topic?: string; name?: string; query?: string
  }>(
    Object.fromEntries(new URLSearchParams(window.location.search))
  )

  React.useEffect(() => {
    ref.current && ref.current.scrollIntoView()
  }, [search])


  let repos = allRepos.filter(r => r.languages.edges.some(x => x.node.name === (
    search.lang || x.node.name
  ))).filter(r => r.repositoryTopics.nodes.some(x => x.topic.name === (
    search.topic || x.topic.name
  ))).filter(r => r.name === (
    search.name || r.name
  )).filter(r => !search.query || (
    r.name.includes(search.query.toLowerCase()) ||
    r.description.toLowerCase().includes(search.query.toLowerCase()) 
  ))

  let topLanguages = Object.entries(stats.languages.nodes).slice(0,16)
  let topTopics = Object.entries(stats.topics.nodes).filter(([t]) => !topLanguages.some(l => l[0].toLowerCase() === t.toLowerCase())).slice(0,9)

  return (
    <>
    {modalRepo && <Modal setSearch={setSearch} repo={modalRepo} exit={() => setModalRepo(undefined)} />}
    
    <div className="sidebar flex-v space-btwn">
      <div>
        <h3 className="mb-4">Top Languages</h3>
        <ul>
          {topLanguages.map(([lang, { size, color }]) => (
            <li className="flex-center w-240 space-btwn" key={lang}>
              <LangButton
                color={color}
                name={lang}
                onClick={() => setSearch({ ...search, lang })}
              />
              <span className="ml-4">
                {byteFormat(size)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
       <h3 className="mb-4">Top Topics</h3>
        <ul>
          {topTopics.map(([topic, count]) => (
            <li className="flex-center w-240 space-btwn" key={topic}>
              <TopicButton 
                name={topic}
                onClick={() => setSearch({ ...search, topic })}
                />
              <span className="ml-4">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <main id="repos" ref={ref}>
      {/* <div
        id="repos" 
        ref={ref} 
        aria-hidden="true"
      /> */}
      <div className="flex mb-8">
        <input
          value={search.query || ''}
          onChange={e => 
            setSearch({...search, query: e.target.value})
          }
        />
        {Object.entries(search).filter(([,v]) => !!v).map(([k,v]) => (
            <span 
            role="button"
            className="topic-button flex-center ml-4"
            onClick={() => setSearch({...search, [k]: undefined})}
            style={{marginBottom: 0}}
          >
            {`${k}:${v}`}
            <ClearIcon className="ml-4" />
          </span>
        ))}
        {/* {Object.keys(search).length > 0 && (
          <span 
            role="button"
            className="topic-button flex-center ml-4"
            onClick={() => setSearch({})}
            style={{marginBottom: 0}}
          >
            {Object.entries(search).slice(0,1).map(([k,v]) => `${k}:${v}`)}
            <ClearIcon className="ml-4" />
          </span>
        )} */}
      </div>
      <ul className="repos">
        {repos.map(r => (
          <RepoBox {...r} key={r.name} setSearch={(s: {}) => setSearch({...search, ...s})} setModalRepo={setModalRepo} />
        ))}
        {/* {repos.map(repo => (
          <li className="link" onClick={() => setModalRepo(repo)} key={repo.name}>
            <div className="bold">{repo.name}</div>
            <span>{repo.description}</span>
          </li>
        ))} */}
      </ul>
    </main>
    </>
  );
}
