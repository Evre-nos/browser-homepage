export type Temperature = {
  temp: number;
};

export type ComicInfo = {
  seriesName: string;
  rssUrl: string;
};

export type ComicStrip = {
  seriesName: string;
  stripURL: string;
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
