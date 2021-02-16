const dropZone = document.getElementById('drop-zone-contents');

export default function requestPermission() {
  if (typeof DeviceOrientationEvent !== 'undefined') {
    dropZone.textContent = `DeviceOrientation: ${Object.keys(
      DeviceOrientationEvent
    )}`;
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState !== 'granted') {
          dropZone.textContent = 'Permission denied';
          return;
        }

        window.addEventListener('deviceorientation', e => {
          const orientation = document.createElement('pre');
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
          dropZone.appendChild(orientation);
        });

        window.addEventListener('devicemotion', e => {
          const motion = document.createElement('pre');
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
          dropZone.appendChild(motion);
        });
      })
      .catch(console.error);
  } else {
    dropZone.textContent = 'DeviceOrientationEvent is undefined';
  }
}
