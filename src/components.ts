import { LinkList, Entity } from './types';
import bonfireAppleTouch from './assets/img/bonfireFavicon/apple-touch-icon.png';
import bonfireFav32 from './assets/img/bonfireFavicon/favicon-32x32.png';
import bonfireFav16 from './assets/img/bonfireFavicon/favicon-16x16.png';
import bonfireManifest from './assets/img/bonfireFavicon/apple-touch-icon.png';
import bonfireMaskIcon from './assets/img/bonfireFavicon/apple-touch-icon.png';
import workAppleTouch from './assets/img/workFavicon/apple-touch-icon.png';
import workFav32 from './assets/img/workFavicon/favicon-32x32.png';
import workFav16 from './assets/img/workFavicon/favicon-16x16.png';
import workManifest from './assets/img/workFavicon/apple-touch-icon.png';
import workMaskIcon from './assets/img/workFavicon/apple-touch-icon.png';
import { initButtons } from './helpers';

export function createLI(dataObj: Entity): HTMLLIElement {
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

export function createTitleLI(title: string, mode: string): HTMLLIElement {
  const li = document.createElement('li');
  li.setAttribute('data-list-title', mode);
  li.classList.add('title');
  li.textContent = title;
  return li;
}

export function createBonfireLinkEl(data: LinkList): HTMLElement {
  const linkContainer = document.createElement('div');
  const groupOne = document.createElement('ul');
  const groupTwo = document.createElement('ul');
  const groupThree = document.createElement('ul');
  const groupFour = document.createElement('ul');
  groupOne.appendChild(createTitleLI('daily', 'bonfire'));
  groupOne.setAttribute('data-list', 'bonfire');
  groupTwo.appendChild(createTitleLI('social', 'bonfire'));
  groupTwo.setAttribute('data-list', 'bonfire');
  groupThree.appendChild(createTitleLI('streaming', 'bonfire'));
  groupThree.setAttribute('data-list', 'bonfire');
  groupFour.appendChild(createTitleLI('server', 'bonfire'));
  groupFour.setAttribute('data-list', 'bonfire');
  linkContainer.classList.add('links-container');
  linkContainer.setAttribute('data-mode', 'bonfire');
  createBonfireFavIcon();

  data.bonfire?.forEach((item) => {
    const linkObject = createLI(item);
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
      case '3':
        groupFour.appendChild(linkObject);
        break;
    }
    linkContainer.appendChild(groupOne);
    linkContainer.appendChild(groupTwo);
    linkContainer.appendChild(groupThree);
    linkContainer.appendChild(groupFour);
  });
  return linkContainer;
}

export function createWorkLinksEl(data: LinkList): HTMLElement {
  const linkContainer = document.createElement('div');
  const groupOne = document.createElement('ul');
  const groupTwo = document.createElement('ul');
  const groupThree = document.createElement('ul');
  groupOne.appendChild(createTitleLI('daily', 'work'));
  groupOne.setAttribute('data-list', 'work');
  groupTwo.appendChild(createTitleLI('tools', 'work'));
  groupTwo.setAttribute('data-list', 'work');
  groupThree.appendChild(createTitleLI('docs', 'work'));
  groupThree.setAttribute('data-list', 'work');
  linkContainer.classList.add('links-container');
  linkContainer.setAttribute('data-mode', 'work');
  createWorkFavIcon();

  data.work?.forEach((item) => {
    const linkObject = createLI(item);
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
    linkContainer.appendChild(groupOne);
    linkContainer.appendChild(groupTwo);
    linkContainer.appendChild(groupThree);
  });
  return linkContainer;
}

export function createBonfireFavIcon(): void {
  const appleTouch = document.getElementById('appleTouch') as HTMLLinkElement;
  const icon32 = document.getElementById('icon32') as HTMLLinkElement;
  const icon16 = document.getElementById('icon16') as HTMLLinkElement;
  const mainifest = document.getElementById('manifest') as HTMLLinkElement;
  const maskIcon = document.getElementById('maskIcon') as HTMLLinkElement;

  appleTouch.href = bonfireAppleTouch;
  icon32.href = bonfireFav32;
  icon16.href = bonfireFav16;
  mainifest.href = bonfireManifest;
  maskIcon.href = bonfireMaskIcon;
}

export function createWorkFavIcon(): void {
  const appleTouch = document.getElementById('appleTouch') as HTMLLinkElement;
  const icon32 = document.getElementById('icon32') as HTMLLinkElement;
  const icon16 = document.getElementById('icon16') as HTMLLinkElement;
  const mainifest = document.getElementById('manifest') as HTMLLinkElement;
  const maskIcon = document.getElementById('maskIcon') as HTMLLinkElement;

  appleTouch.href = workAppleTouch;
  icon32.href = workFav32;
  icon16.href = workFav16;
  mainifest.href = workManifest;
  maskIcon.href = workMaskIcon;
}

export function createTimerButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.setAttribute('id', 'timer-button');
  button.setAttribute('data-button', 'work');
  button.textContent = 'Timer';
  return button;
}

export function createSwitchModesButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.setAttribute('id', 'switch-modes-button');
  button.setAttribute('data-button', 'bonfire');
  button.textContent = 'Switch Modes';
  return button;
}

export function createOpenComicsDialogButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.setAttribute('id', 'open-comics-dialog-button');
  button.textContent = 'Comic Strips';
  return button;
}

export function createTimerDialogWindow(data: LinkList): HTMLDialogElement {
  const dialogHeader = document.createElement('h2');
  const dialogWindow = document.createElement('dialog');
  const inputContainer = document.createElement('div');
  const minutesDiv = document.createElement('div');
  const secondsDiv = document.createElement('div');
  const minuteHeader = document.createElement('h3');
  const secondsHeader = document.createElement('h3');
  const minutesInput = document.createElement('input');
  const secondsInput = document.createElement('input');
  const startButton = document.createElement('button');

  dialogHeader.textContent = 'Time to Work';
  minuteHeader.textContent = 'Minutes: ';
  secondsHeader.textContent = 'Seconds: ';
  startButton.textContent = 'Start Timer';

  inputContainer.setAttribute('id', 'timer-input-container');
  dialogWindow.setAttribute('id', 'timer-dialog');
  startButton.setAttribute('id', 'start-timer-button');

  startButton.addEventListener('click', () => {
    const lightSwitch =
      (document.getElementById('light-switch') as HTMLImageElement) || null;
    const minutes = parseInt(minutesInput.value) * 60000;
    const seconds = parseInt(secondsInput.value) * 1000;
    const time = minutes + seconds;
    lightSwitch.remove();
    setTimeout(function () {
      const lightSwitch = createLightSwitchButton();
      const directoryContainer =
        (document.getElementById('directory-container') as HTMLDivElement) ||
        null;
      directoryContainer.appendChild(lightSwitch);
      initButtons(data);
      console.log(`Timer: ${time}`);
    }, time);
  });

  minutesInput.type = 'number';
  minutesInput.min = '1';
  minutesInput.max = '60';
  minutesInput.setAttribute('id', 'minutes-input');

  secondsInput.min = '1';
  secondsInput.max = '60';
  secondsInput.type = 'number';
  secondsInput.setAttribute('id', 'seconds-input');

  minutesDiv.setAttribute('id', 'minutes-div');
  minutesDiv.appendChild(minuteHeader);
  minutesDiv.appendChild(minutesInput);

  secondsDiv.setAttribute('id', 'seconds-div');
  secondsDiv.appendChild(secondsHeader);
  secondsDiv.appendChild(secondsInput);

  inputContainer.appendChild(minutesDiv);
  inputContainer.appendChild(secondsDiv);

  dialogWindow.appendChild(dialogHeader);
  dialogWindow.appendChild(inputContainer);
  dialogWindow.appendChild(startButton);

  return dialogWindow;
}

export function createLightSwitchButton(): HTMLImageElement {
  const img = document.createElement('img');
  img.alt = 'light-switch';
  img.id = 'light-switch';
  img.setAttribute('data-mode', 'bonfire');
  return img;
}

export function createComicsDialog(): HTMLDialogElement {
  const dialogWindow = document.createElement('dialog');
  return dialogWindow;
}
