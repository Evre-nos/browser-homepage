import { createWorkLinksEl, createBonfireLinkEl } from './components';
import { LinkList } from './types';
export function clearChildNodes(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
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

  if (title.dataset.listTitle == 'bonfire') {
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
    createBonfireLinkEl(data);
  } else {
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
    createWorkLinksEl(data);
  }
}
