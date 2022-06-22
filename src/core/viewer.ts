import Swal, { SweetAlertOptions } from 'sweetalert2';
import { getBrowser, getEngine, getInfoGM, getSettings, logScript } from '../utils/tampermonkey';
import { IManga, ISite } from '../types';
import { isNothing } from '../utils/checks';
import formatPage from './format';
import { externalCSS, externalScripts } from './externals';

async function lateStart(site: ISite, begin = 1) {
  const manga = await site.run();
  logScript('LateStart');
  const options: SweetAlertOptions = {
    title: 'Starting<br>MangaOnlineViewer',
    input: 'range',
    inputAttributes: {
      min: '1',
      max: manga.pages.toString(),
      step: '1',
    },
    inputValue: begin,
    text: 'Choose the Page to start from:',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    reverseButtons: true,
    icon: 'question',
  };
  Swal.fire(options).then((result) => {
    if (result.value) {
      logScript(`Choice: ${result.value}`);
      formatPage(manga, result.value);
    } else {
      logScript(result.dismiss);
    }
  });
}
function createLateStartButton(site: ISite, beginning: number) {
  const button = document.createElement('button');
  button.innerText = 'Start MangaOnlineViewer';
  button.id = 'StartMOV';
  button.onclick = () => {
    lateStart(site, beginning);
  };
  const css = `
#StartMOV {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    padding: 10px 20px;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    background-image: linear-gradient(to right, #667eea, #764ba2, #6b8dd6, #8e37d7);
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
}

#StartMOV:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
}

#StartMOV:focus {
    outline: none;
}
`;
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  document.head.append(`${externalScripts.join('\n')}
        ${externalCSS.join('\n')}`);
}
// Organize the site adding place-holders for the manga pages
function preparePage(site: ISite, manga: IManga, begin = 0) {
  logScript(`Found ${manga.pages} pages`);
  const settings = getSettings();
  if (manga.pages > 0) {
    let beginning = begin;
    if (beginning === 0) {
      beginning = settings?.bookmarks?.find((b) => b.url === window.location.href)?.page || 0;
    }
    // window.mov = (b: number) => lateStart(site, b || beginning);
    switch (site.start || settings?.loadMode) {
      case 'never':
        createLateStartButton(site, beginning);
        break;
      case 'always':
        formatPage(manga, 0);
        break;
      case 'wait':
      default:
        Swal.fire({
          title: 'Starting<br>MangaOnlineViewer',
          html: `${
            beginning > 1 ? `Resuming reading from Page ${beginning}.<br/>` : ''
          }Please wait, 3 seconds...`,
          showCancelButton: true,
          cancelButtonColor: '#d33',
          reverseButtons: true,
          timer: 3000,
        }).then((result) => {
          if (result.value || result.dismiss === Swal.DismissReason.timer) {
            formatPage(manga, beginning);
          } else {
            createLateStartButton(site, beginning);
            logScript(result.dismiss);
          }
        });
        break;
    }
  }
}

// Script Entry point
function start(sites: ISite[]) {
  logScript(
    `Starting ${getInfoGM.script.name} ${
      getInfoGM.script.version
    } on ${getBrowser()} with ${getEngine()}`,
    // getInfoGM,
  );
  // window.InfoGM = getInfoGM;
  logScript(`${sites.length} Known Manga Sites`);
  let waitElapsed = 0;

  // Wait for something on the site to be ready before executing the script
  async function waitExec(site: ISite) {
    if (site.waitMax !== undefined) {
      if (waitElapsed >= site.waitMax) {
        preparePage(site, await site.run());
        return;
      }
    }
    if (site.waitAttr !== undefined) {
      const wait = document.querySelector(site.waitAttr[0])?.hasAttribute(site.waitAttr[1]);
      if (isNothing(wait)) {
        logScript(`Waiting for Attribute ${site.waitAttr[1]} of ${site.waitAttr[0]} = ${wait}`);
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
      logScript(`Found Attribute ${site.waitAttr[1]} of ${site.waitAttr[0]} = ${wait}`);
    }
    if (site.waitEle !== undefined) {
      const wait = document.querySelector(site.waitEle);
      if (isNothing(wait?.tagName)) {
        logScript(`Waiting for Element ${site.waitEle} = `, wait);
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
      logScript(`Found Element ${site.waitEle} = `, wait);
    }
    if (site.waitVar !== undefined) {
      const wait = window[site.waitVar as any];
      if (isNothing(wait)) {
        logScript(`Waiting for Variable ${site.waitVar} = ${wait}`);
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
      logScript(`Found Variable ${site.waitVar} = ${wait}`);
    }
    preparePage(site, await site.run());
  }

  logScript('Looking for a match...');

  function test(list: ISite[]) {
    return list.filter((site: ISite) => site.url.test(window.location.href)).map(waitExec);
  }

  test(sites);
}

export default start;
