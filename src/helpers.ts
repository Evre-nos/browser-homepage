import {
  createWorkLinksEl,
  createBonfireLinkEl,
  createTimerDialogWindow,
  createLightSwitchButton,
  createComicsDialogButton,
  createComicsDialog,
} from './components';
import { LinkList } from './types';
import onSwitch from './assets/img/on-switch.svg';
import offSwitch from './assets/img/off-switch.svg';
import timer from './assets/img/timer.svg';

export function clearChildNodes(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export function initButtons(data: LinkList): void {
  const lightSwitch =
    (document.getElementById('light-switch') as HTMLImageElement) || null;

  if (localStorage.getItem('mode') == 'bonfire') {
    lightSwitch.src = offSwitch;
  }
  if (localStorage.getItem('mode') == 'work') {
    lightSwitch.src = onSwitch;
  }
  lightSwitch.addEventListener('click', () => {
    switchModes(data);
  });
}

export async function fetchWeather(date: Date): Promise<string> {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=42.293&longitude=-82.9&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1';
  const response = await fetch(url);
  const data = await response.json();
  return `${data.hourly.temperature_2m[date.getHours()]}`;
}

export function switchToWork(data: LinkList): void {
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
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const rightContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  const linksContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;
  const lightSwitch =
    (document.getElementById('light-switch') as HTMLImageElement) || null;
  const comicsDialogLauncher =
    (document.getElementById('comics-dialog-launcher') as HTMLImageElement) ||
    null;
  comicsDialogLauncher.remove();
  localStorage.setItem('mode', 'work');
  const timerButton = document.createElement('img') as HTMLImageElement;
  const timerDialogWindow = createTimerDialogWindow();
  body.appendChild(timerDialogWindow);
  timerButton.src = timer;
  timerButton.setAttribute('id', 'timer');
  timerButton.setAttribute('data-mode', 'work');
  timerButton.addEventListener('click', () => {
    timerDialogWindow.showModal();
  });
  rightContainer.removeChild(linksContainer);
  lightSwitch.src = onSwitch;
  lightSwitch.removeAttribute('data-mode');
  lightSwitch.setAttribute('data-mode', 'work');
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
  tab.textContent = '~/work';
  infoBar.insertBefore(timerButton, infoBar.firstChild);
  rightContainer.appendChild(createWorkLinksEl(data));

  /**
   * Start Timer Button in Modal Window is recieved at the end after everything
   * else has loaded so it doesn't return null
   */
  const startTimerButton =
    (document.getElementById('start-timer-button') as HTMLButtonElement) ||
    null;
  startTimerButton.addEventListener('click', () => {
    timerDialogWindow.close();
    const minuteInput: string = (
      document.getElementById('minutes-input') as HTMLInputElement
    ).value;
    const secondsInput: string = (
      document.getElementById('seconds-input') as HTMLInputElement
    ).value;
    const minutes = Number(+minuteInput * 60000);
    const seconds = Number(+secondsInput * 1000);

    const totalTime = minutes + seconds;
    console.log(totalTime);

    lightSwitch.remove();
    setTimeout(() => {
      const lightSwitch = createLightSwitchButton();
      infoBar?.appendChild(lightSwitch);
      lightSwitch.addEventListener('click', () => {
        switchModes(data);
      });
      alert('Work is done!');
    }, totalTime);
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
  const comicsDialogButton = createComicsDialogButton();
  const directoryContainer =
    (document.getElementById('directory-container') as HTMLDivElement) || null;
  const pic = (document.getElementById('picture') as HTMLImageElement) || null;
  const rightContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  const linksContainer =
    (document.querySelector('.links-container') as HTMLElement) || null;
  localStorage.setItem('mode', 'bonfire');
  const timerButton =
    (document.getElementById('timer') as HTMLImageElement) || null;
  const timerDialog =
    (document.getElementById('timer-dialog') as HTMLDialogElement) || null;

  const comicsDialog = createComicsDialog();

  if (timerDialog) {
    timerDialog.remove();
  }
  if (timerButton) {
    timerButton.remove();
  }
  const lightSwitch = document.getElementById(
    'light-switch'
  ) as HTMLImageElement;
  lightSwitch.removeAttribute('data-mode');
  lightSwitch.setAttribute('data-mode', 'bonfire');
  lightSwitch.src = offSwitch;
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
  infoBar.insertBefore(comicsDialogButton, infoBar.firstChild);
  infoBar.appendChild(lightSwitch);
  directory.innerHTML = '&gt; cd ~/bonfire/<span class="blinking">_</span>';
  rightContainer.appendChild(createBonfireLinkEl(data));
  tab.textContent = '~/bonfire';
  body.append(comicsDialog);

  /*
   * Comics Dialog functionality
   */

  comicsDialogButton.addEventListener('click', () => {
    comicsDialog.showModal();
  });
}

export function switchModes(data: LinkList) {
  if (localStorage.getItem('mode') == 'work') {
    console.log('switch to bonfire');
    switchToBonfire(data);
  } else {
    console.log('switch to work');
    switchToWork(data);
  }
}

export function init(data: LinkList): void {
  const linkContainer =
    (document.querySelector('.link-container') as HTMLElement) || null;
  if (
    localStorage.getItem('mode') == null ||
    localStorage.getItem('mode') == 'bonfire'
  ) {
    const initStartMode = createBonfireLinkEl(data);
    linkContainer.appendChild(initStartMode);
    const lightSwitch = document.getElementById(
      'light-switch'
    ) as HTMLImageElement;
    lightSwitch.src = offSwitch;
    switchToBonfire(data);
    initButtons(data);
  } else if (localStorage.getItem('mode') == 'work') {
    const initStartMode = createWorkLinksEl(data);
    linkContainer.appendChild(initStartMode);
    const lightSwitch = document.getElementById(
      'light-switch'
    ) as HTMLImageElement;
    lightSwitch.src = onSwitch;
    switchToWork(data);
    initButtons(data);
  }
}
