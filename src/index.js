import requestPermission from './device-orientation';
import './drop-handlers';
import './user-media';

// TODO: Get photo from phone
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

requestPermission();

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
