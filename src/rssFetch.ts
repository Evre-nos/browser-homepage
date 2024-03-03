import Parser from 'rss-parser';

export async function fetchNancy(): Promise<void> {
  const parser: Parser = new Parser();
  const feed = await parser.parseURL(
    'https://www.comicsrss.com/rss/nancy-classics.rss'
  );
  console.log(feed.title);

  feed.items.forEach((item) => {
    console.log(item.title + ':' + item.link);
  });
}
