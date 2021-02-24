/* eslint-disable import/prefer-default-export */

export const readFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onloadend = () => {
      resolve(reader.result);
    };
    // Allow dragging after image loads
    // window.removeEventListener('drop', dropHandler);
    // window.removeEventListener('dragstart', noop);
    // window.removeEventListener('dragover', noop);
    // window.removeEventListener('dragend', noop);

    // addDragHandlers(document.getElementById('container'));
    // addDragHandlers(window);
  });
};

// Get access to camera
// export const getMedia = () => {
//   if (
//     !navigator.mediaDevices ||
//     typeof navigator.mediaDevices.getUserMedia !== 'function'
//   ) {
//     return Promise.resolve(null);
//   }

//   return navigator.mediaDevices.getUserMedia({ video: true });
// };

// const media = document.getElementById('media');
// media.addEventListener('click', e => {
//   getMedia()
//     .then(stream => {
//       media.textContent = stream;
//     })
//     .catch(err => {
//       media.textContent = err;
//     });
// });

// const getUserMedia = navigator;
// document.getElementById('media').textContent = `getUserMedia: ${getUserMedia}`;
// if (getUserMedia) {
//   console.log(`getUserMedia:`, getUserMedia);
//   getUserMedia({ photo: true }).then(stream => {
//     console.log(stream);
//     document.getElementById('media').textContent = stream;
//   });
// } else {
//   console.log('getUserMedia is not defined');
// }
