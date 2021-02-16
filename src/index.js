import requestPermission from './device-orientation';
import './drop-handlers';

// TODO: Get photo from phone
// const media = document.getElementById('media');

// Does this cache permission after the first time?
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
