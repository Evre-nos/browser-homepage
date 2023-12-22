import json from './assets/links.json';
import { LinkList, Entity } from './types';

const links = json;

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

function switchPicture(): void {
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  if (pic.dataset.picture == 'bonfire') {
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'work');
  } else {
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'bonfire');
  }
}

function createTitleLI(title: string, mode: string): HTMLLIElement {
  const li = document.createElement('li');
  li.setAttribute('data-list-title', mode);
  li.classList.add('title');
  li.textContent = title;
  return li;
}

function createLinkGroups(data: LinkList): void {
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const linkContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;
  const groupOne = (document.createElement('ul') as HTMLElement) || null;
  const groupTwo = (document.createElement('ul') as HTMLElement) || null;
  const groupThree = (document.createElement('ul') as HTMLElement) || null;

  clearChildNodes(linkContainer);
  if (pic.dataset.picture == 'bonfire') {
    data.bonfire?.forEach((item) => {
      const linkObject = createLI(item);
      groupOne.appendChild(createTitleLI('daily', 'bonfire'));
      groupOne.setAttribute('data-list', 'bonfire');
      groupTwo.appendChild(createTitleLI('social', 'bonfire'));
      groupTwo.setAttribute('data-list', 'bonfire');
      groupThree.appendChild(createTitleLI('streaming', 'bonfire'));
      groupThree.setAttribute('data-list', 'bonfire');

      switch (item.group) {
        case '0':
          groupOne.appendChild(linkObject);
          break;
        case '1':
          groupTwo.appendChild(linkObject);
          break;
        case '2':
          groupThree.appendChild(linkObject);
          break;
      }
    });
  }

  if (pic.dataset.picture == 'work') {
    data.work?.forEach((item) => {
      const linkObject = createLI(item);
      groupOne.appendChild(createTitleLI('daily', 'work'));
      groupOne.setAttribute('data-list', 'work');
      groupTwo.appendChild(createTitleLI('tools', 'work'));
      groupTwo.setAttribute('data-list', 'work');
      groupThree.appendChild(createTitleLI('docs', 'work'));
      groupThree.setAttribute('data-list', 'bonfire');

      switch (item.group) {
        case '0':
          groupOne.appendChild(linkObject);
          break;
        case '1':
          groupTwo.appendChild(linkObject);
          break;
        case '2':
          groupThree.appendChild(linkObject);
          break;
      }
    });
  }
}

function createLI(dataObj: Entity): HTMLLIElement {
  const li = document.createElement('li');
  const a = document.createElement('a');
  if (dataObj.mode == 'work') {
    li.setAttribute('data-list-item', 'work');
    a.setAttribute('data-list-item', 'work');
  } else {
    li.setAttribute('data-list-item', 'bonfire');
    a.setAttribute('data-list-item', 'bonfire');
  }

  a.setAttribute('href', dataObj.url);
  a.setAttribute('target', '_blank');
  a.innerText = dataObj.name;
  li.appendChild(a);
  return li;
}

function switchModes(): void {
  const title =
    (document.querySelector('[data-list-title]') as HTMLLIElement) || null;
  const infoBar =
    (document.querySelector('[data-info-bar]') as HTMLDivElement) || null;
  const body =
    (document.querySelector('[data-body]') as HTMLBodyElement) || null;
  const directory =
    (document.querySelector('[data-directory]') as HTMLParagraphElement) ||
    null;

  if (title.dataset.listTitle == 'bonfire') {
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'work');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'work');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'work');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'work');
    directory.innerHTML = '&gt; cd ~/work/<span class="blinking">_</span>';
  } else {
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'bonfire');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'bonfire');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'bonfire');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'bonfire');
    directory.innerHTML = '&gt; cd ~/bonfire/<span class="blinking">_</span>';
  }
}

function clearChildNodes(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

createLinkGroups(links);
// console.log(links);

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchPicture();
    switchModes();
    createLinkGroups(links);
  }
});
