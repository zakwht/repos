export type Search = Partial<{
  lang: string;
  query: string;
  topic: string;
}>;

export type Repo = {
  name: string;
  url: string;
  description: string;
  createdAt: string;
  stargazerCount: number;
  forkCount: number;
  object: {
    history: {
      totalCount: number;
    };
  };
  licenseInfo: {
    name: string;
  } | null;
  languages: {
    edges: {
      size: number;
      node: {
        name: string;
        color: string;
      };
    }[];
  };
  repositoryTopics: {
    nodes: {
      topic: {
        name: string;
      };
    }[];
  };
};
