import links from './assets/links.json';

const date = new Date();
let currentDay = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate()
).toLocaleDateString('en-US', {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
});

const dateSpan = document.querySelector('[data-date]') as HTMLElement;
dateSpan.innerText = currentDay;
