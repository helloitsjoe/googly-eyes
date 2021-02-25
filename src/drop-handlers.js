/* eslint-disable import/prefer-default-export */
const noop = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const addWindowBlockers = () => {
  // window.addEventListener('drop', dropHandler);
  window.addEventListener('dragstart', noop);
  window.addEventListener('dragover', noop);
  window.addEventListener('dragend', noop);
  return () => {
    window.removeEventListener('dragstart', noop);
    window.removeEventListener('dragover', noop);
    window.removeEventListener('dragend', noop);
  };
};
