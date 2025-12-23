const images = [
  "bird.jpg",
  "deer.jpg",
  "cat.jpg",
  "hortensie.jpg",
  "lilie.jpg",
  "mountain.jpg",
  "polarbear.jpg",
];

let pairs = [];
let previousRevealed = "";
let previousImage = "";
let points = 0;
let pairAmount = 0;

function setUp() {
  resetPlayField();

  pairAmount = Number(document.getElementById("cardAmount").value);

  // Select random images from the pool and double them
  shuffle(images);
  pairs = images.slice(0, pairAmount);
  pairs = pairs.concat(pairs);
  shuffle(pairs);

  // Create the playing field
  createField();
}

// Knuth-Shuffle
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

// Create field with cover image
function createField() {
  const playingField = document.getElementById("playingField");
  playingField.classList.add("playingField");
  const entries = pairs.entries();

  for (let x of entries) {
    const id = x[0];

    const div = document.createElement("div");
    div.classList.add("singleCard");

    const img = document.createElement("img");
    img.classList.add("img");
    img.src = "img/cover.jpg";
    img.setAttribute("id", id);
    img.setAttribute("onclick", `revealImage(${id})`);

    div.appendChild(img);

    playingField.appendChild(div);
  }
}

// Open a single card when clicked
function revealImage(id) {
  let clickedImage = document.getElementById(id);
  let pointCount = document.getElementById("points");
  let winBanner = document.getElementById("won");

  clickedImage.src = `/img/${pairs[id]}`;

  let currentRevealed = pairs[id];

  if (previousRevealed === "") {
    previousRevealed = currentRevealed;

    previousImage = clickedImage;
    previousImage.classList.add("clicked");
  } else if (previousRevealed === currentRevealed) {
    clickedImage.classList.add("clicked");
    resetCards();

    points++;
    pointCount.innerHTML = new String(points);
  } else {
    previousImage.src = "img/cover.jpg";
    previousImage.classList.remove("clicked");

    clickedImage.src = "img/cover.jpg";
    clickedImage.classList.remove("clicked");

    resetCards();
  }
  console.log(pairAmount);
  if (points === pairAmount) {
    winBanner.innerHTML = "Alle aufgedeckt!";
  }
}

function resetPlayField() {
  points = 0;
  document.getElementById("points").innerHTML = "0";
  document.getElementById("playingField").innerHTML = "";
  document.getElementById("won").innerHTML = "";
}

function resetCards() {
  previousRevealed = "";
  currentRevealed = "";

  clickedImage = null;
  previousImage = null;
}
