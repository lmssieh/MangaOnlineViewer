export interface IMangaBase {
  begin?: number;
  title: string | null | undefined;
  series: string | null | undefined;
  pages: number;
  prev: string | null | undefined;
  next: string | null | undefined;
  lazy?: boolean;
  timer?: number;
  before?(): void;
  after?(): void;
}

export interface IMangaPages extends IMangaBase {
  listPages: string[];
  img: string;
  lazyAttr?: string;
}

export interface IMangaImages extends IMangaBase {
  listImages: string[];
}

export interface IMangaForce extends IMangaBase {
  bruteForce(obj: object): string;
  img?: string;
  lazyAttr?: string;
}

export type IManga = IMangaPages | IMangaImages | IMangaForce;

export function isImagesManga(manga: IManga): manga is IMangaImages {
  return 'listImages' in manga;
}
export function isPagesManga(manga: IManga): manga is IMangaPages {
  return 'listPages' in manga;
}
export function isBruteforceManga(manga: IManga): manga is IMangaForce {
  return 'bruteForce' in manga;
}
