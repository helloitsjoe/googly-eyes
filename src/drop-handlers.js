/* eslint-disable import/prefer-default-export */
// import requestPermission from './device-orientation';
// import { addDragHandlers } from './drag-handlers';
// import { readFile } from './user-media';

const noop = e => {
  e.preventDefault();
  e.stopPropagation();
  // console.log(`Noop`, e.x);
};

// dropHandler is only used for desktop, no device orientation involved
// const dropHandler = e => {
//   e.preventDefault();

//   readFile(e.dataTransfer.files[0]).then(src => {
//     // const img = document.getElementById('main-img');
//     // const dropZone = document.getElementById('drop-zone');
//     // img.src = src;
//     // img.style.display = 'flex';
//     // dropZone.style.display = 'none';

//     // Allow dragging after image loads
//     // window.removeEventListener('drop', dropHandler);
//     // window.removeEventListener('dragstart', noop);
//     // window.removeEventListener('dragover', noop);
//     // window.removeEventListener('dragend', noop);

//     // addDragHandlers(document.getElementById('container'));
//     addDragHandlers(window);
//   });
// };

export const addDropHandlers = () => {
  // window.addEventListener('drop', dropHandler);
  window.addEventListener('dragstart', noop);
  window.addEventListener('dragover', noop);
  window.addEventListener('dragend', noop);
  return () => {
    window.removeEventListener('dragstart', noop);
    window.removeEventListener('dragover', noop);
    window.removeEventListener('dragend', noop);
  };
};
