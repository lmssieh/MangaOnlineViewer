// == MangaBuddy ===================================================================================
export default {
  name: 'MangaBuddy',
  url: /https?:\/\/(www.)?mangabuddy.com\/.+\/chapter.+/,
  homepage: 'https://mangabuddy.com/',
  language: ['English'],
  category: 'manga',
  run() {
    const images = [...document.querySelectorAll('#chapter-images img')];
    return {
      title: document.querySelector('.chapter-info')?.textContent?.trim(),
      series: document
        .querySelector('#breadcrumbs-container div:nth-child(2) a')
        ?.getAttribute('href'),
      pages: images.length,
      prev: document.querySelector('a.prev')?.getAttribute('href'),
      next: document.querySelector('a.next')?.getAttribute('href'),
      listImages: images.map((img) => img.getAttribute('src')),
    };
  },
};
