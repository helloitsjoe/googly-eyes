// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
export function requestPermission() {
  if (
    typeof DeviceOrientationEvent === 'undefined' ||
    typeof DeviceOrientationEvent.requestPermission !== 'function'
  ) {
    return Promise.reject(
      new Error('DeviceOrientation will not work on this device')
    );
  }
  return DeviceOrientationEvent.requestPermission().then(permissionState => {
    if (permissionState !== 'granted') {
      throw new Error('You did not grant permission for DeviceOrientation');
    }
  });
}

export const getDeviceOrientation = e => ({
  absolute: Math.round(e.absolute),
  alpha: Math.round(e.alpha),
  beta: Math.round(e.beta),
  gamma: Math.round(e.gamma),
});

export const getDeviceMotion = e => ({
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
});

export default requestPermission;
