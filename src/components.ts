import { LinkList, Entity, ComicInfo } from './types';
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
import onSwtich from './assets/img/on-switch.svg';
import offSwitch from './assets/img/off-switch.svg';
import aaugh from './assets/img/aaugh.svg';
import { clearChildNodes, fetchComic } from './helpers';

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
  groupThree.appendChild(createTitleLI('media', 'bonfire'));
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

export function createLightSwitchButton(): HTMLImageElement {
  const img = document.createElement('img');
  img.alt = 'light-switch';
  img.id = 'light-switch';
  if (localStorage.getItem('mode') == 'work') {
    img.src = onSwtich;
    img.dataset.mode = 'work';
  } else {
    img.src = offSwitch;
    img.dataset.mode = 'bonfire';
  }
  return img;
}

export function createComicsDialogButton(): HTMLImageElement {
  const img = document.createElement('img');
  img.alt = 'comics-dialog-launcher';
  img.id = 'comics-dialog-launcher';
  img.dataset.mode = 'bonfire';
  img.src = aaugh;
  return img;
}

// TODO: This function does too many things
export function createComicsSeriesButton(
  seriesName: string,
  rssUrl: string
): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = seriesName;
  button.classList.add('comic-series-button');
  button.dataset.rssUrl = rssUrl;
  button.dataset.button = 'bonfire';

  button.addEventListener('click', async () => {
    const oldLeftNav = document.getElementById('comic-left-nav-button');
    const oldRightNav = document.getElementById('comic-right-nav-button');
    if (oldLeftNav) {
      oldLeftNav.remove();
    }

    if (oldRightNav) {
      oldRightNav.remove();
    }

    /**
     * Comics Strips are fetched from Newest to Oldest, reversing the array
     * will put them in the order they were released where the first comic in
     * the array is the oldest instead of the newest
     */
    let rssData = await fetchComic(rssUrl);
    rssData = rssData.reverse();
    let comicStripIndex = 25;

    const comicTitleDiv =
      (document.getElementById('comic-title-div') as HTMLDivElement) || null;
    const leftNavButton = createComicNavigationLeftButton();
    const rightNavButton = createComicNavigationRightButton();
    const comicStripDiv =
      (document.getElementById('comic-strips-div') as HTMLDivElement) || null;
    comicTitleDiv.insertBefore(leftNavButton, comicTitleDiv.firstChild);

    clearChildNodes(comicStripDiv);

    comicStripDiv.appendChild(
      createComicStripElement(
        rssData[comicStripIndex].seriesName,
        rssData[comicStripIndex].stripURL
      )
    );
    comicTitleDiv.appendChild(rightNavButton);

    leftNavButton.addEventListener('click', () => {
      clearChildNodes(comicStripDiv);
      if (comicStripIndex < 1) {
        comicStripIndex = rssData.length;
      }
      comicStripIndex--;
      comicStripDiv.appendChild(
        createComicStripElement(
          rssData[comicStripIndex].seriesName,
          rssData[comicStripIndex].stripURL
        )
      );
      console.log(comicStripIndex);
    });

    rightNavButton.addEventListener('click', () => {
      clearChildNodes(comicStripDiv);
      comicStripIndex = (comicStripIndex + 1) % rssData.length;
      comicStripDiv.appendChild(
        createComicStripElement(
          rssData[comicStripIndex].seriesName,
          rssData[comicStripIndex].stripURL
        )
      );
      console.log(comicStripIndex);
    });
  });

  return button;
}

export function createComicNavigationRightButton(): HTMLButtonElement {
  const rightButton = document.createElement('button');
  const textNode = document.createTextNode('\u2192');
  rightButton.textContent = textNode.textContent;
  rightButton.classList.add('comic-nav-button');
  rightButton.dataset.mode = 'bonfire';
  rightButton.setAttribute('id', 'comic-right-nav-button');
  return rightButton;
}

export function createComicNavigationLeftButton(): HTMLButtonElement {
  const leftButton = document.createElement('button');
  const textNode = document.createTextNode('\u2190');
  leftButton.textContent = textNode.textContent;
  leftButton.classList.add('comic-nav-button');
  leftButton.dataset.mode = 'bonfire';
  leftButton.setAttribute('id', 'comic-left-nav-button');
  return leftButton;
}

export function createComicStripElement(
  title: string,
  imageURL: string
): HTMLElement {
  const comic = document.createElement('div');
  const comicTitle = document.createElement('h2');
  const comicImage = document.createElement('img');
  comicTitle.classList.add('comic-strip-title-date');
  comicTitle.textContent = title;
  comicImage.classList.add('comic-strip');
  comicImage.src = imageURL;
  comic.appendChild(comicTitle);
  comic.appendChild(comicImage);
  comic.setAttribute('id', 'comic-strip');
  return comic;
}

export function createComicsDialog(): HTMLDialogElement {
  const dialog = document.createElement('dialog');
  dialog.id = 'comics-dialog';

  const titleDiv = document.createElement('div');

  // Dialog Header
  const title = document.createElement('h1');
  title.textContent = 'Daily Comics Strips';
  title.id = 'comic-strips-header';
  title.dataset.mode = 'bonfire';

  titleDiv.setAttribute('id', 'comic-title-div');
  titleDiv.append(title);

  // Div to hold series buttons
  const comicSeriesButtonDiv = document.createElement('div');
  comicSeriesButtonDiv.id = 'comic-series-button-div';
  comicSeriesButtonDiv.dataset.mode = 'bonfire';

  // Div to hold the rss content
  const comicStripsDiv = document.createElement('div');
  comicStripsDiv.id = 'comic-strips-div';

  const comicTitleArray: Array<ComicInfo> = [
    {
      seriesName: 'Nancy',
      rssUrl: 'https://www.comicsrss.com/rss/nancy-classics.rss',
    },
    {
      seriesName: 'Peanuts',
      rssUrl: 'https://www.comicsrss.com/rss/peanuts.rss',
    },
    {
      seriesName: 'Zippy',
      rssUrl: 'https://www.comicsrss.com/rss/zippy-the-pinhead.rss',
    },
    {
      seriesName: 'Calvin & Hobbs',
      rssUrl: 'https://www.comicsrss.com/rss/calvinandhobbes.rss',
    },
  ];

  dialog.appendChild(titleDiv);
  dialog.appendChild(comicSeriesButtonDiv);
  dialog.appendChild(comicStripsDiv);

  comicTitleArray.forEach((comic) => {
    comicSeriesButtonDiv.appendChild(
      createComicsSeriesButton(comic.seriesName, comic.rssUrl)
    );
  });

  return dialog;
}
