import { createWorkLinksEl, createBonfireLinkEl } from './components';
import { LinkList } from './types';

export function clearChildNodes(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export async function fetchWeather(date: Date): Promise<string> {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=42.293&longitude=-82.9&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1';
  const response = await fetch(url);
  const data = await response.json();
  return `${data.hourly.temperature_2m[date.getHours()]}`;
}

export function switchModes(data: LinkList): void {
  const title =
    (document.querySelector('[data-list-title]') as HTMLLIElement) || null;
  const infoBar =
    (document.querySelector('[data-info-bar]') as HTMLDivElement) || null;
  const body =
    (document.querySelector('[data-body]') as HTMLBodyElement) || null;
  const directory =
    (document.querySelector('[data-directory]') as HTMLParagraphElement) ||
    null;
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const rightContainer =
    (document.querySelector('.right-container') as HTMLElement) || null;
  const linksContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;

  if (title.dataset.listTitle == 'bonfire') {
    rightContainer.removeChild(linksContainer);
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'work');
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'work');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'work');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'work');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'work');
    directory.innerHTML = '&gt; cd ~/work/<span class="blinking">_</span>';
    rightContainer.appendChild(createWorkLinksEl(data));
  } else {
    rightContainer.removeChild(linksContainer);
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'bonfire');
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'bonfire');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'bonfire');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'bonfire');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'bonfire');
    directory.innerHTML = '&gt; cd ~/bonfire/<span class="blinking">_</span>';
    rightContainer.appendChild(createBonfireLinkEl(data));
  }
}
export function init(data: LinkList): void {
  const rightContainer =
    (document.querySelector('.right-container') as HTMLElement) || null;
  const bonfire = createBonfireLinkEl(data);

  rightContainer.appendChild(bonfire);
}