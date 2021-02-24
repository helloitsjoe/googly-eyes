const ball = document.querySelector('.ball');

const downHandler = (e, el) => {
  e.preventDefault();
  ball.classList.remove('hidden');
  ball.style.transform = `translate(${e.x - 15}px, ${e.y - 15}px)`;
  el.addEventListener('mousemove', moveHandler);
  // const container = document.getElementById('img-container');
  // container.appendChild(ball);
};

const moveHandler = e => {
  e.preventDefault();
  console.log(`e.x:`, e.x);
  ball.style.transform = `translate(${e.x - 15}px, ${e.y - 15}px)`;
};

const upHandler = (e, el) => {
  e.preventDefault();
  el.removeEventListener('mousemove', moveHandler);
};

export const addDragHandlers = el => {
  el.addEventListener('touchstart', downHandler);
  el.addEventListener('touchend', upHandler);
  el.addEventListener('mousedown', e => downHandler(e, el));
  // el.addEventListener('mousemove', moveHandler);
  el.addEventListener('mouseup', e => upHandler(e, el));
};
