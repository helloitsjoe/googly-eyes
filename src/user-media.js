// Get access to camera
export const getMedia = () => {
  if (
    !navigator.mediaDevices ||
    typeof navigator.mediaDevices.getUserMedia !== 'function'
  ) {
    return Promise.resolve(null);
  }

  return navigator.mediaDevices.getUserMedia({ video: true });
};

const input = document.getElementById('file-input');

input.onchange = e => {
  const reader = new FileReader();
  const [file] = input.files;
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const img = document.getElementById('main-img');
    const dropZone = document.getElementById('drop-zone');
    img.src = reader.result;
    img.style.display = 'flex';
    dropZone.style.display = 'none';

    // Allow dragging after image loads
    // window.removeEventListener('drop', dropHandler);
    // window.removeEventListener('dragstart', noop);
    // window.removeEventListener('dragover', noop);
    // window.removeEventListener('dragend', noop);

    // addDragHandlers(document.getElementById('container'));
    // addDragHandlers(window);
  };
};

// input.addEventListener('change', e => {
//   console.log('e', e);
// });
