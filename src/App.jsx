/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  getDeviceMotion,
  getDeviceOrientation,
  requestPermission,
} from './device-orientation';
import { addWindowBlockers } from './drop-handlers';
import { readFile } from './user-media';

const RADIUS = 30;

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
    requestPermission()
      .then(() => {
        setAllowed(true);
        setError('');
      })
      .catch(err => setError(err.message));

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

  React.useEffect(() => {
    const removeWindowBlockers = addWindowBlockers();
    const dropHandler = e => {
      e.preventDefault();
      readFile(e.dataTransfer.files[0])
        .then(imageSrc => setSrc(imageSrc))
        .catch(err => setError(err.message));
    };
    window.addEventListener('drop', dropHandler);
    return () => {
      window.removeEventListener('drop', dropHandler);
      removeWindowBlockers();
    };
  }, []);

  if (src) {
    return <ImageContainer src={src} pitch={beta} roll={gamma} />;
  }

  return (
    <>
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
                  .then(() => {
                    setAllowed(true);
                    setError('');
                  })
                  .catch(err => setError(err.message));
              }}
            >
              click
            </button>
          )}
        </label>
      </div>
      <Debug {...{ alpha, beta, gamma, allowed: allowed.toString(), error }} />
    </>
  );
};

const ImageContainer = ({ src, pitch, roll }) => {
  const [eyesOnScreen, setEyesOnScreen] = React.useState(0);
  const [{ x, y }, setStartPosition] = React.useState({});

  const addEye = e => {
    if (eyesOnScreen === 2) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    setStartPosition({ x: clientX, y: clientY });
    setEyesOnScreen(prev => prev + 1);
  };

  return (
    <div id="img-container" onClick={addEye} style={{ touchAction: 'none' }}>
      <img className="main-img" alt="main" src={src} />
      {eyesOnScreen > 0 && (
        <Eye startPosition={{ x, y }} pitch={pitch} roll={roll} />
      )}
      {eyesOnScreen > 1 && (
        <Eye startPosition={{ x, y }} pitch={pitch} roll={roll} />
      )}
    </div>
  );
};

const Eye = ({ startPosition: start, pitch, roll }) => {
  const [{ x, y }, setPos] = React.useState({ x: start.x, y: start.y });
  const [dragging, setDragging] = React.useState(false);

  const rotation = !pitch && !roll ? Math.random() * 360 : (roll / pitch) * 360;

  return (
    <div
      className="ball"
      style={{
        transform: `translate(${x - RADIUS}px, ${y - RADIUS}px)`,
        width: `${RADIUS * 2}px`,
        height: `${RADIUS * 2}px`,
      }}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={e => {
        if (!dragging) return;
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
      onTouchMove={e => {
        const { clientX, clientY } = e.touches[0];
        setPos({ x: clientX, y: clientY });
      }}
    >
      {/* <div
        style={{
          zIndex: 10,
          width: `${RADIUS / 2}px`,
          height: `${RADIUS / 2}px`,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'white',
          transform: `translate(70%, 20%)`,
          opacity: '0.3',
        }}
      /> */}
      <div
        style={{
          width: `${RADIUS * 2}px`,
          height: `${RADIUS * 2}px`,
          // backgroundColor: 'blue',
          borderRadius: '50%',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div
          className="pupil"
          style={{
            width: `${RADIUS * 1.5}px`,
            height: `${RADIUS * 1.5}px`,
            transform: `translate(5%, 5%)`,
          }}
        />
      </div>
    </div>
  );
};

const Debug = ({ allowed, error, alpha, beta, gamma }) => {
  return (
    <>
      {!allowed && <pre>Permission not granted!</pre>}
      {error ? (
        <pre>Error: {error}</pre>
      ) : (
        <>
          <pre>Yaw: {alpha}</pre>
          <pre>Pitch: {beta}</pre>
          <pre>Roll: {gamma}</pre>
        </>
      )}
    </>
  );
};

export default App;
