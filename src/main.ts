import linkData from './assets/links.json';
import { switchModes } from './helpers';
import { LinkList } from './types';

const links: LinkList = {
  bonfire: linkData.bonfire,
  work: linkData.bonfire,
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

async function fetchWeather(): Promise<string> {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=42.293&longitude=-82.9&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1';
  const response = await fetch(url);
  const data = await response.json();
  return `${data.hourly.temperature_2m[date.getHours()]}`;
}

console.log(links.bonfire);

const weather = fetchWeather();

weather.then((data: string) => {
  try {
    const weatherSpan =
      (document.querySelector('[data-weather]') as HTMLElement) || null;
    weatherSpan.innerText = `${data}°C`;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchModes(links);
  }
});
