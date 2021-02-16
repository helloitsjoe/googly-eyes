import requestPermission from './device-orientation';
import { addDragHandlers } from './drag-handlers';

const noop = e => {
  e.preventDefault();
  e.stopPropagation();
  console.log(`Noop`, e.x);
};

const dropHandler = e => {
  e.preventDefault();
  requestPermission();

  console.log(e.dataTransfer.files[0]);
  const reader = new FileReader();
  const [file] = e.dataTransfer.files;
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const img = document.getElementById('main-img');
    const dropZone = document.getElementById('drop-zone');
    img.src = reader.result;
    img.style.display = 'flex';
    dropZone.style.display = 'none';

    // Allow dragging after image loads
    window.removeEventListener('drop', dropHandler);
    window.removeEventListener('dragstart', noop);
    window.removeEventListener('dragover', noop);
    window.removeEventListener('dragend', noop);

    // addDragHandlers(document.getElementById('container'));
    addDragHandlers(window);
  };
};

window.addEventListener('drop', dropHandler);
window.addEventListener('dragstart', noop);
window.addEventListener('dragover', noop);
window.addEventListener('dragend', noop);
