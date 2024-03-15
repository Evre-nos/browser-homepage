import linkData from './assets/links.json';
import { fetchWeather, init } from './helpers';
import { LinkList } from './types';

const links: LinkList = {
  bonfire: linkData.bonfire,
  work: linkData.work,
};

const date = new Date();
const currentDay = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  date.getDay()
).toLocaleDateString('en-US', {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
});

const dateSpan = document.querySelector('[data-date]') as HTMLElement;
dateSpan.innerText = currentDay;

const weather = fetchWeather(date);

weather.then((data: string) => {
  try {
    const weatherSpan =
      (document.querySelector('[data-weather]') as HTMLElement) || null;
    weatherSpan.innerText = `${data}°C`;
  } catch (err) {
    const weatherSpan =
      (document.querySelector('[data-weather]') as HTMLElement) || null;
    weatherSpan.innerText = 'Could not get weather';
  }
});

init(links);
