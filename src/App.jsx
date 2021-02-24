import React, { cloneElement } from 'react';
import {
  getDeviceMotion,
  getDeviceOrientation,
  requestPermission,
} from './device-orientation';
import { readFile } from './user-media';

export const App = () => {
  return (
    <div id="container">
      <DropZone />
    </div>
  );
};

const DropZone = () => {
  const [src, setSrc] = React.useState('');
  const [error, setError] = React.useState('');
  const [alpha, setAlpha] = React.useState(0);
  const [beta, setBeta] = React.useState(0);
  const [gamma, setGamma] = React.useState(0);
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    // requestPermission()
    //   .then(() => setAllowed(true))
    //   .catch(err => setError(err.message));

    window.addEventListener('deviceorientation', e => {
      const { alpha: a, beta: b, gamma: g } = getDeviceOrientation(e);
      setAlpha(a);
      setBeta(b);
      setGamma(g);
    });
    window.addEventListener('devicemotion', getDeviceMotion);

    return () => {
      window.removeEventListener('deviceorientation', getDeviceOrientation);
      window.removeEventListener('devicemotion', getDeviceMotion);
    };
  }, [allowed]);

  return (
    <>
      {src ? (
        <ImageContainer src={src} />
      ) : (
        <div id="drop-zone">
          {/* <div id="drop-zone-contents">DROP HERE</div> */}
          <label htmlFor="file-input" className="file-input">
            Tap to upload a photo
            {allowed ? (
              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={e => {
                  readFile(e.target.files[0])
                    .then(setSrc)
                    .catch(err => setError(err.message));
                }}
              />
            ) : (
              <button
                type="button"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'transparent',
                  position: 'absolute',
                  width: '100%',
                  height: '100vh',
                }}
                onClick={() => {
                  requestPermission()
                    .then(() => setAllowed(true))
                    .catch(err => setError(err.message));
                }}
              >
                click
              </button>
            )}
          </label>
        </div>
      )}
      <Debug {...{ alpha, beta, gamma, allowed: allowed.toString(), error }} />
    </>
  );
};

const ImageContainer = ({ src }) => {
  return (
    <div id="img-container">
      <img id="main-img" alt="main" src={src} />
      <div className="ball hidden">
        <div className="pupil" />
      </div>
    </div>
  );
};

const Debug = ({ allowed, error, alpha, beta, gamma }) => {
  return (
    <>
      {error && <pre>Error: {error}</pre>}
      {!allowed && <pre>Permission not granted!</pre>}
      <pre>Alpha: {alpha}</pre>
      <pre>Beta: {beta}</pre>
      <pre>Gamma: {gamma}</pre>
    </>
  );
};

export default App;
