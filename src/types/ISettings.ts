import { IBookmark } from './IBookmark';

export interface ITheme {
  primaryShade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  colorScheme: 'dark' | 'light';
  primaryColor: string;
  other?: {
    variant: 'filled' | 'outline' | 'light';
  };
}
export type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ViewMode = 'WebComic' | 'FluidLTR' | 'FluidRTL' | 'Vertical';
export type LoadMode = 'wait' | 'always' | 'never';
export type ColorScheme = 'dark' | 'light';
export type Header = 'hover' | 'scroll' | 'click' | 'fixed';

export interface ISettings {
  colorScheme: ColorScheme;
  theme: string;
  customTheme: string;
  themeShade: Shade;
  viewMode: ViewMode;
  bookmarks: IBookmark[];
  loadMode: LoadMode;
  fitWidthIfOversize?: boolean;
  showThumbnails?: boolean;
  downloadZip?: boolean;
  throttlePageLoad: number;
  zoom: number;
  zoomStep: number;
  minZoom: number;
  lazyLoadImages: boolean;
  lazyStart: number;
  hidePageControls: boolean;
  header: Header;
  maxReload: number;
}
