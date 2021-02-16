import requestPermission from './request-permission';

window.addEventListener('drop', e => {
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
  };
});

window.addEventListener('dragstart', e => {
  e.preventDefault();
  e.stopPropagation();
});

window.addEventListener('dragover', e => {
  e.preventDefault();
  e.stopPropagation();
});

window.addEventListener('dragend', e => {
  e.preventDefault();
  e.stopPropagation();
});