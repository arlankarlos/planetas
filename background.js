const images = [
  "img/background-1.png",
  "img/background-2.png",
  "img/background-3.png",
  "img/background-4.png",
];

const body = document.body;

function changeBackground() {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  body.style.backgroundImage = `url(${randomImage})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

changeBackground();
setInterval(changeBackground, 15000);
