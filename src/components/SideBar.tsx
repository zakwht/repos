import stats from "../assets/stats.json";

import {
  CodeIcon,
  CommitIcon,
  StarIcon,
  PeopleIcon,
  RepoIcon,
  PackageIcon
} from "../assets/icons";
import { byteFormat } from "../util";
import { LangButton, TopicButton } from "./Buttons";
import { Search } from "../types";

let topLanguages = Object.entries(stats.languages.nodes).slice(0, 12);
let topTopics = Object.entries(stats.topics.nodes)
  .filter(
    ([t]) => !topLanguages.some((l) => l[0].toLowerCase() === t.toLowerCase())
  )
  .slice(0, 8);

export const SideBar = ({
  search,
  setSearch
}: {
  search: Search;
  setSearch: (s: Search) => void;
}) => (
  <div className="sidebar flex-v space-btwn">
    <div className="flex-v summary">
      <span>
        <CodeIcon />
        {stats.languages.totalCount} Languages
      </span>
      <span>
        <CommitIcon />
        {stats.totals.contributions} Commits
      </span>
      <span>
        <StarIcon />
        {stats.totals.stars} Stars
      </span>
      <span>
        <PeopleIcon />
        {stats.totals.followers} Followers
      </span>
      <span>
        <RepoIcon />
        {stats.totals.repositories + stats.totals.gists} Repositories
      </span>
      <span>
        <PackageIcon />
        {stats.totals.packages} Packages
      </span>
    </div>
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
            <span className="ml-4">{byteFormat(size)}</span>
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
            <span className="ml-4">{count}</span>
          </li>
        ))}
      </ul>
    </div>
    <footer>
      <a href="https://github.com/zakwht" target="_blank" rel="noreferrer">
        &copy; {new Date().getFullYear()} github.com/zakwht
      </a>
    </footer>
  </div>
);
