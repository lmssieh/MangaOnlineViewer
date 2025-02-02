import sequence from '../../utils/sequence';
import {
  IconArrowAutofitHeight,
  IconArrowAutofitWidth,
  IconBookmark,
  IconBookmarkOff,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconZoomCancel,
  IconZoomIn,
  IconZoomOut,
} from './icons';

const listPages = (times: number, begin: number) =>
  sequence(times, begin).map(
    (index) => `
<div id='Page${index}' class='MangaPage'>
  <div class='PageFunctions'>
    <button class='Bookmark ControlButton' title='Bookmark'>
      ${IconBookmark}
      ${IconBookmarkOff}
    </button>
    <button class='ZoomIn ControlButton' title='Zoom In'>
      ${IconZoomIn}
    </button>
    <button class='ZoomRestore ControlButton' title='Zoom Restore'>
      ${IconZoomCancel}
    </button>
    <button class='ZoomOut ControlButton' title='Zoom Out'>
      ${IconZoomOut}
    </button>
    <button class='ZoomWidth ControlButton' title='Zoom to Width'>
      ${IconArrowAutofitWidth}
    </button>
    <button class='ZoomHeight ControlButton' title='Zoom to Height'>
      ${IconArrowAutofitHeight}
    </button>
    <button class='Hide ControlButton' title='Hide'>
      ${IconEye}
      ${IconEyeOff}
    </button>
    <button class='Reload ControlButton' title='Reload'>
      ${IconRefresh}
    </button>
    <span class='PageIndex'>${index}</span>
  </div>
  <div class='PageContent'>
    <img id='PageImg${index}' alt='' class='PageImg' />
  </div>
</div>`,
  );
export default listPages;
