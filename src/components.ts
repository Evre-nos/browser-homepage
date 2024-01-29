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
