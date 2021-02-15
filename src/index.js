const stats = document.getElementById('stats');
const media = document.getElementById('media');

window.addEventListener('drop', e => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  const reader = new FileReader();
  const [file] = e.dataTransfer.files;
  reader.readAsDataURL(file);
  reader.onloadend = e => {
    const img = document.getElementById('main-img');
    const dropZone = document.getElementById('drop-zone');
    img.src = reader.result;
    img.style.display = 'flex';
    dropZone.style.display = 'none';
  };
});

window.addEventListener('dragstart', e => {
  e.preventDefault();
});

window.addEventListener('dragover', e => {
  e.preventDefault();
});

window.requestPermission = () => {
  if (typeof DeviceOrientationEvent !== 'undefined') {
    stats.textContent = `DeviceOrientation: ${Object.keys(
      DeviceOrientationEvent
    )}`;
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        stats.textContent = `permission: ${permissionState}`;
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', e => {
            stats.textContent = `orientation: ${e}`;
            const { absolute, alpha, beta, gamma } = e;
            console.log(`absolute:`, absolute);
            console.log(`alpha:`, alpha);
            console.log(`beta:`, beta);
            console.log(`gamma:`, gamma);
            stats.textContent = JSON.stringify(
              { absolute, alpha, beta, gamma },
              null,
              2
            );
          });

          window.addEventListener('devicemotion', e => {
            stats.textContent = `motion: ${e}`;
            const { absolute, alpha, beta, gamma } = e;
            console.log(`absolute:`, absolute);
            console.log(`alpha:`, alpha);
            console.log(`beta:`, beta);
            console.log(`gamma:`, gamma);
            stats.textContent = JSON.stringify(
              { absolute, alpha, beta, gamma },
              null,
              2
            );
          });
        }
      })
      .catch(console.error);
  } else {
    stats.textContent = 'DeviceOrientationEvent is undefined';
  }
};
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
