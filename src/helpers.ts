import {
  createWorkLinksEl,
  createBonfireLinkEl,
  createTimerButton,
  createSwitchBonfireButton,
  createSwitchWorkButton,
  createOpenComicsDialogButton,
} from './components';
import { LinkList } from './types';

export function clearChildNodes(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export function appendButtons(): void {
  const buttonContainer =
    (document.querySelector('.button-container') as HTMLElement) || null;
  buttonContainer.appendChild(createSwitchBonfireButton());
  buttonContainer.appendChild(createSwitchWorkButton());
  buttonContainer.appendChild(createOpenComicsDialogButton());
}

export async function fetchWeather(date: Date): Promise<string> {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=42.293&longitude=-82.9&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1';
  const response = await fetch(url);
  const data = await response.json();
  return `${data.hourly.temperature_2m[date.getHours()]}`;
}

export function createBonfireFavIcon(): void {
  const appleTouch = document.getElementById('appleTouch') as HTMLLinkElement;
  const icon32 = document.getElementById('icon32') as HTMLLinkElement;
  const icon16 = document.getElementById('icon16') as HTMLLinkElement;
  const mainifest = document.getElementById('manifest') as HTMLLinkElement;
  const maskIcon = document.getElementById('maskIcon') as HTMLLinkElement;

  appleTouch.href = '/src/assets/img/bonfireFavicon/apple-touch-icon.png';
  icon32.href = '/src/assets/img/bonfireFavicon/favicon-32x32.png';
  icon16.href = '/src/assets/img/bonfireFavicon/favicon-16x16.png';
  mainifest.href = '/src/assets/img/bonfireFavicon/site.manifest';
  maskIcon.href = '/src/assets/img/bonfireFavicon/safari-pinned-tab.svg';
}

export function createWorkFavIcon(): void {
  const appleTouch = document.getElementById('appleTouch') as HTMLLinkElement;
  const icon32 = document.getElementById('icon32') as HTMLLinkElement;
  const icon16 = document.getElementById('icon16') as HTMLLinkElement;
  const mainifest = document.getElementById('manifest') as HTMLLinkElement;
  const maskIcon = document.getElementById('maskIcon') as HTMLLinkElement;

  appleTouch.href = '/src/assets/img/workFavicon/apple-touch-icon.png';
  icon32.href = '/src/assets/img/workFavicon/favicon-32x32.png';
  icon16.href = '/src/assets/img/workFavicon/favicon-16x16.png';
  mainifest.href = '/src/assets/img/workFavicon/site.manifest';
  maskIcon.href = '/src/assets/img/workFavicon/safari-pinned-tab.svg';
}

export function switchToWork(data: LinkList): void {
  const tab = (document.querySelector('title') as HTMLTitleElement) || null;
  const title =
    (document.querySelector('[data-list-title]') as HTMLLIElement) || null;
  const infoBar =
    (document.querySelector('[data-info-bar]') as HTMLDivElement) || null;
  const body =
    (document.querySelector('[data-body]') as HTMLBodyElement) || null;
  const directoryContainer =
    (document.getElementById('directory-container') as HTMLDivElement) || null;
  const directory =
    (document.querySelector('[data-directory]') as HTMLParagraphElement) ||
    null;
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const rightContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  const linksContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;
  localStorage.setItem('mode', 'work');
  const timerButton = createTimerButton();
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
  directoryContainer.appendChild(timerButton);
  tab.textContent = '~/work';
  rightContainer.appendChild(createWorkLinksEl(data));
  timerButton.addEventListener('click', () => {
    const minutes = prompt('How many minutes is the break?');
    if (minutes != null) {
      window.removeEventListener('keydown', (e) => {
        if (e.key == 'w') {
          switchModes(data);
        }
      });
    }
  });
}

export function switchToBonfire(data: LinkList): void {
  const tab = (document.querySelector('title') as HTMLTitleElement) || null;
  const title =
    (document.querySelector('[data-list-title]') as HTMLLIElement) || null;
  const infoBar =
    (document.querySelector('[data-info-bar]') as HTMLDivElement) || null;
  const body =
    (document.querySelector('[data-body]') as HTMLBodyElement) || null;
  const directory =
    (document.querySelector('[data-directory]') as HTMLParagraphElement) ||
    null;
  const directoryContainer =
    (document.getElementById('directory-container') as HTMLDivElement) || null;
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const rightContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  const linksContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;
  localStorage.setItem('mode', 'bonfire');
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
  directoryContainer.removeChild(directoryContainer.lastElementChild as Node);
  directoryContainer.appendChild(directory);
  directory.innerHTML = '&gt; cd ~/bonfire/<span class="blinking">_</span>';
  rightContainer.appendChild(createBonfireLinkEl(data));
  tab.textContent = '~/bonfire';
}

export function switchModes(data: LinkList) {
  const title =
    (document.querySelector('[data-list-title]') as HTMLLIElement) || null;
  if (title.dataset.listTitle == 'work') {
    switchToBonfire(data);
  } else {
    switchToWork(data);
  }
}

export function init(data: LinkList): void {
  appendButtons();
  const linkContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  if (
    localStorage.getItem('mode') == null ||
    localStorage.getItem('mode') == 'bonfire'
  ) {
    const initStartMode = createBonfireLinkEl(data);
    linkContainer.appendChild(initStartMode);
    switchToBonfire(data);
  } else if (localStorage.getItem('mode') == 'work') {
    const initStartMode = createWorkLinksEl(data);
    linkContainer.appendChild(initStartMode);
    switchToWork(data);
    const timerButton = document.querySelector(
      '#timer-button'
    ) as HTMLButtonElement;
    timerButton.addEventListener('click', () => {
      const minutes = prompt('How many minutes to disable bonfire mode?');
      if (minutes != null) {
        window.removeEventListener('keydown', (e) => {
          if (e.key == 'w') {
            switchModes(data);
          }
        });
      }
    });
  }
}

export function addSwitchModeEventListener(data: LinkList): void {
  window.addEventListener('keydown', (e) => {
    if (e.key == 'w') {
      switchModes(data);
    }
  });
}

// export function workTimer(): EventListener {}
