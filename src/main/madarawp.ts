// == Madara WordPress Plugin ======================================================================
// https://themeforest.net/item/madara-wordpress-theme-for-manga/20849828
export default {
  name: [
    'Madara WordPress Plugin',
    'MangaHaus',
    'Isekai Scan',
    'Comic Kiba',
    'Zinmanga',
    'mangatx',
    'Toonily',
    'Mngazuki',
    'JaiminisBox',
    'DisasterScans',
    'ManhuaPlus',
  ],
  url: /https?:\/\/.+\/(manga|series)\/.+\/.+/,
  homepage: [
    '#',
    'https://manhuaus.com',
    'https://isekaiscan.com/',
    'https://comickiba.com/',
    'https://zinmanga.com/',
    'https://mangatx.com/',
    'https://toonily.net/',
    'https://mangazuki.me/',
    'https://jaiminisbox.net',
    'https://disasterscans.com/',
    'https://manhuaplus.com/',
  ],
  language: ['English'],
  obs: 'Any Site that uses Madara Wordpress Plugin',
  category: 'manga',
  run() {
    const images = [
      ...document.querySelectorAll(
        '.wp-manga-chapter-img, .blocks-gallery-item img, .reading-content img',
      ),
    ];
    return {
      title: document.querySelector('#chapter-heading')?.textContent?.trim(),
      series: (
        document.querySelector('.breadcrumb li:nth-child(3) a') ||
        document.querySelector('.breadcrumb li:nth-child(2) a')
      )?.getAttribute('href'),
      pages: images.length,
      prev: document.querySelector('.prev_page')?.getAttribute('href'),
      next: document.querySelector('.next_page')?.getAttribute('href'),
      listImages: images.map(
        (img) =>
          img.getAttribute('src') ||
          img.getAttribute('data-src') ||
          img.getAttribute('data-full-url'),
      ),
    };
  },
};
