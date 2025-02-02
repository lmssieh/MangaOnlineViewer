import { IManga } from '../types/IManga';
import head from './reader';
import body from './components/App';
import { logScript, setValueGM } from '../utils/tampermonkey';
import events from './events';
import { loadManga } from './page';
import { isNothing } from '../utils/checks';
import { useSettings } from './settings';

export default function display(manga: IManga, begin: number) {
  window.stop();
  if (manga.before !== undefined) {
    manga.before();
  }
  document.head.innerHTML = head(manga);
  document.body.innerHTML = body(manga, begin);
  document.body.className = '';
  document.body.removeAttribute('style');
  logScript('Rebuilding Site');
  setTimeout(() => {
    try {
      events();
      setTimeout(() => {
        window.scrollTo(0, 0);
        loadManga(manga, begin);
      }, 50);
      // Clear used Bookmarks
      if (!isNothing(useSettings().bookmarks.filter((el) => el.url === window.location.href))) {
        logScript(`Bookmark Removed ${window.location.href}`);
        useSettings().bookmarks = useSettings().bookmarks.filter(
          (el) => el.url !== window.location.href,
        );
        setValueGM('Bookmarks', JSON.stringify(useSettings().bookmarks));
      }
    } catch (e) {
      logScript(e);
    }
  }, 50);
  if (manga.after !== undefined) {
    manga.after();
  }
}
