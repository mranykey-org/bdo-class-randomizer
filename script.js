const classes = [
  "Warrior",
  "Ranger",
  "Sorceress",
  "Berserker",
  "Tamer",
  "Musa",
  "Maehwa",
  "Valkyrie",
  "Kunoichi",
  "Ninja",
  "Wizard",
  "Witch",
  "Dark Knight",
  "Striker",
  "Mystic",
  "Lahn",
  "Archer",
  "Shai",
  "Guardian",
  "Hashashin",
  "Nova",
  "Sage",
  "Corsair",
  "Drakania",
  "Woosa",
  "Maegu",
  "Scholar",
];

const classesImgWidth = 2370;
const classesImgHeight = 983;
const classImgWidth = 237;
const classImgHeight = 327;
const classesPicWidth = 100;
const classesPicHeight = 1400;
const classePicWidth = 50;
const classePicHeight = 50;
const scale = 1.4;

const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".button-85");
const randomizeButton = document.getElementById("randomizeButton");
const popup = document.createElement("div");
const resultDiv = document.querySelector(".result");

popup.className = "popup";
container.appendChild(popup);
btn.style.display = "inline-block";

let classImgPosX = 0;
let classImgPosY = 0;
let classPicPosY = 0;

document.addEventListener("DOMContentLoaded", function () {
  renderClasses();
  randomizeButton.addEventListener("click", function () {
    btn.style.display = "none";
    overlay.style.display = "none";
    randomizeClass();
  });
});

function renderClasses() {
  classes.forEach((element) => {
    if (Math.abs(classImgPosX) == classesImgWidth) {
      classImgPosX = 0;
      classImgPosY -= classImgHeight;
    }

    const classDiv = createClassDiv(element);
    const classImg = createClassImg();
    const className = createClassName(element);
    const classPic = createClassPic();

    setClassImgProperties(classImg);
    setClassNameProperties(className, element);
    setClassPicProperties(classPic);

    classDiv.appendChild(classImg);
    classDiv.appendChild(className);
    classDiv.appendChild(classPic);

    container.appendChild(classDiv);
  });
}

function createClassDiv(element) {
  const classDiv = document.createElement("div");
  classDiv.className = "class";
  classDiv.id = element;
  return classDiv;
}

function createClassImg() {
  const classImg = document.createElement("span");
  classImg.className = "class-img";
  return classImg;
}

function createClassName(element) {
  const className = document.createElement("span");
  className.className = "class-name";
  className.textContent = element;
  return className;
}

function createClassPic() {
  const classPic = document.createElement("span");
  classPic.className = "class-pic";
  return classPic;
}

function setClassImgProperties(classImg) {
  classImg.style.cssText = `
    background-repeat: no-repeat;
    background-image: url('classes_spr.jpeg');
    width: calc(${classImgWidth}px/${scale});
    height: calc(${classImgHeight}px/${scale});
    background-position-x: calc(${classImgPosX}px/${scale});
    background-position-y: calc(${classImgPosY}px/${scale});
    background-size: calc(${classesImgWidth}px/${scale}) calc(${classesImgHeight}px/${scale});
  `;

  classImgPosX -= classImgWidth;
}

function setClassNameProperties(className, element) {
  className.textContent = element;
}

function setClassPicProperties(classPic) {
  classPic.style.cssText = `
    --scale: calc(50px/${scale});
    background-image: url('classes_symbol_spr.png');
    width: calc(${classePicWidth}px/${scale});
    height: calc(${classePicHeight}px/${scale});
    background-size: calc(${classesPicWidth}px/${scale}) calc(${classesPicHeight}px/${scale});
    background-position-y: calc(${classPicPosY}px/${scale});
  `;

  classPicPosY -= classePicHeight;
}

function randomizeClass() {
  const iterations = 100;
  popup.innerHTML = "";

  for (let i = 0; i < iterations; i++) {
    setTimeout(function () {
      const randomIndex = Math.floor(Math.random() * classes.length);
      highlightClass(randomIndex);
    }, i * 100);
  }

  setTimeout(function () {
    const randomIndex = Math.floor(Math.random() * classes.length);
    displayResult(classes[randomIndex]);
  }, iterations * 100);
}

function highlightClass(index) {
  const classDiv = document.getElementById(classes[index]);
  const randomColor = getRandomColor();
  classDiv.style.border = `4px solid ${randomColor}`;
  classDiv.style.boxShadow = `0 0 20px ${randomColor}`;
  classDiv.classList.add("highlight");
  setTimeout(function () {
    classDiv.style.border = "";
    classDiv.style.boxShadow = "";
    classDiv.classList.remove("highlight");
  }, 200);
}

function displayResult(result) {
  const randomColor = getRandomColor();
  const resultText = document.createElement("p");

  if (result === "Striker") {
    resultText.textContent = "💩 also knowns as Striker";
  } else {
    resultText.textContent = result;
  }

  resultDiv.appendChild(resultText);
  popup.appendChild(resultDiv);

  const lastSelectedClass = document.getElementById(result);
  resultLastSelectedClass = lastSelectedClass.cloneNode(true);
  resultLastSelectedClass.removeChild(resultLastSelectedClass.lastChild);
  resultLastSelectedClass.removeChild(resultLastSelectedClass.lastChild);
  resultLastSelectedClass.style.cssText = `
    width: calc(${classImgWidth}px/${scale});
    height: calc(${classImgHeight}px/${scale});
    border: 4px solid ${randomColor};
    box-shadow: 0 0 20px ${randomColor};
    position: fixed;
    margin: 20% 0 0 -12px;
    border-radius: 20px;
  `;

  resultDiv.appendChild(resultLastSelectedClass);

  lastSelectedClass.style.cssText = `
    border: 4px solid ${randomColor};
    box-shadow: 0 0 20px ${randomColor};
  `;

  lastSelectedClass.classList.add("highlight");
  overlay.style.display = "block";
  resultDiv.style.display = "block";
  popup.style.display = "block";
}

function getRandomColor() {
  const minBrightness = 70;
  const maxBrightness = 100;
  const minColorValue = 100;
  const maxColorValue = 255;

  const r = Math.floor(
    Math.random() * (maxColorValue - minColorValue + 1) + minColorValue
  );
  const g = Math.floor(
    Math.random() * (maxColorValue - minColorValue + 1) + minColorValue
  );
  const b = Math.floor(
    Math.random() * (maxColorValue - minColorValue + 1) + minColorValue
  );
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const adjustedBrightness = Math.max(
    minBrightness / 100,
    Math.min(maxBrightness / 100, brightness)
  );
  const adjustedR = Math.round(r * (adjustedBrightness / brightness));
  const adjustedG = Math.round(g * (adjustedBrightness / brightness));
  const adjustedB = Math.round(b * (adjustedBrightness / brightness));

  return `rgba(${adjustedR},${adjustedG},${adjustedB},0.8)`;
}
