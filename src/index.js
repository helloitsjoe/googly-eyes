const orientation = document.getElementById('orientation');
const motion = document.getElementById('motion');
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
    orientation.textContent = `DeviceOrientation: ${Object.keys(
      DeviceOrientationEvent
    )}`;
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState !== 'granted') {
          orientation.textContent = 'Permission denied';
          return;
        }

        window.addEventListener('deviceorientation', e => {
          orientation.textContent = JSON.stringify(
            {
              absolute: Math.round(e.absolute),
              alpha: Math.round(e.alpha),
              beta: Math.round(e.beta),
              gamma: Math.round(e.gamma),
            },
            null,
            2
          );
        });

        window.addEventListener('devicemotion', e => {
          motion.textContent = JSON.stringify(
            {
              acceleration: {
                x: Math.round(e.acceleration.x),
                y: Math.round(e.acceleration.y),
                z: Math.round(e.acceleration.z),
              },
              accelerationIncludingGravity: {
                x: Math.round(e.accelerationIncludingGravity.x),
                y: Math.round(e.accelerationIncludingGravity.y),
                z: Math.round(e.accelerationIncludingGravity.z),
              },
              rotationRate: {
                alpha: Math.round(e.rotationRate.alpha),
                beta: Math.round(e.rotationRate.beta),
                gamma: Math.round(e.rotationRate.gamma),
              },
              // 0.016
              // interval: Math.round(e.interval),
            },
            null,
            2
          );
        });
      })
      .catch(console.error);
  } else {
    orientation.textContent = 'DeviceOrientationEvent is undefined';
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
