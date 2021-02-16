const orientation = document.getElementById('orientation');
const motion = document.getElementById('motion');

export default function requestPermission() {
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
}
