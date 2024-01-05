import { LinkList, Entity } from './types';
import { clearChildNodes } from './helpers';

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
  clearChildNodes(linkContainer);
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
    linkContainer.appendChild(groupOne);
    linkContainer.appendChild(groupTwo);
    linkContainer.appendChild(groupThree);
  });
  return linkContainer;
}

export function createWorkLinksEl(data: LinkList): HTMLElement {
  const linkContainer = document.createElement('div');
  const groupOne = document.createElement('ul');
  const groupTwo = document.createElement('ul');
  const groupThree = document.createElement('ul');
  clearChildNodes(linkContainer);
  data.work?.forEach((item) => {
    const linkObject = createLI(item);
    groupOne.appendChild(createTitleLI('daily', 'work'));
    groupOne.setAttribute('data-list', 'bonfire');
    groupTwo.appendChild(createTitleLI('tools', 'work'));
    groupTwo.setAttribute('data-list', 'bonfire');
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
    linkContainer.appendChild(groupOne);
    linkContainer.appendChild(groupTwo);
    linkContainer.appendChild(groupThree);
  });
  return linkContainer;
}
