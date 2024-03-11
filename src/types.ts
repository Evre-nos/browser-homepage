export type Temperature = {
  temp: number;
};

export type Comic = {
  seriesName: string;
  rssUrl: string;
};

export type LinkList = {
  work?: Entity[] | null;
  bonfire?: Entity[] | null;
};
export type Entity = {
  name: string;
  group: string;
  mode: string;
  url: string;
};
