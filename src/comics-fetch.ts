import Parser from 'rss-parser';

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ['foo'],
    item: ['bar'],
  },
});

(async () => {
  const feed = await parser.parseURL(
    'https://www.comicsrss.com/rss/nancy-classics.rss'
  );
  console.log(feed.title); // feed will have a `foo` property, type as a string

  let i = 0;
  feed.items.forEach((item) => {
    if (i < 2) {
      console.log(feed);
      console.log(item.title + ':' + item.link); // item will have a `bar` property type as a number
    }
    i++;
  });
})();
