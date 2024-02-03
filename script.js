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
]; // 26 classes
const classesImgWidth = 2370;
const classesImgHeight = 983;
const classImgWidth = 237;
const classImgHeight = 327;
let classImgPosX = 0;
let classImgPosY = 0;
// Class picture
const classesPicWidth = 100;
const classesPicHeight = 1400;
const classePicWidth = 50;
const classePicHeight = 50;
let classPicPosY = 0;

document.addEventListener("DOMContentLoaded", function () {
  const scale = 1.4;
  const container = document.getElementsByClassName("container")[0];
  const overlay = document.querySelector(".overlay");
  const btn = document.querySelector(".button-85");
  const randomizeButton = document.getElementById("randomizeButton");
  const popup = document.createElement("div");
  const result_div = document.querySelector(".result");
  popup.className = "popup";
  container.appendChild(popup);
  btn.style.display = "inline-block";

  classes.forEach((element) => {
    if (Math.abs(classImgPosX) == classesImgWidth) {
      classImgPosX = 0;
      classImgPosY -= classImgHeight;
    }
    const classDiv = document.createElement("div");
    const classImg = document.createElement("span");
    const className = document.createElement("span");
    const classPic = document.createElement("span");
    classDiv.className = "class";
    classImg.className = "class-img";
    className.className = "class-name";
    classPic.className = "class-pic";
    classDiv.id = element;
    // Background image
    classImg.style.backgroundRepeat = "no-repeat";
    classImg.style.backgroundImage = "url('classes_spr.jpeg')";
    classImg.style.width = `calc(${classImgWidth}px/${scale})`;
    classImg.style.height = `calc(${classImgHeight}px/${scale})`;
    classImg.style.backgroundPositionX = `calc(${classImgPosX}px/${scale})`;
    classImg.style.backgroundPositionY = `calc(${classImgPosY}px/${scale})`;
    classImg.style.backgroundSize = `calc(${classesImgWidth}px/${scale}) calc(${classesImgHeight}px/${scale})`;
    classDiv.appendChild(classImg);
    classImgPosX -= classImgWidth;

    // Class name
    className.textContent = element;
    classDiv.appendChild(className);
    // Class picture
    classPic.style.setProperty("--scale", `calc(50px/${scale})`);

    classPic.style.backgroundImage = "url('classes_symbol_spr.png')";
    classPic.style.width = `calc(${classePicWidth}px/${scale})`;
    classPic.style.height = `calc(${classePicHeight}px/${scale})`;
    classPic.style.backgroundSize = `calc(${classesPicWidth}px/${scale}) calc(${classesPicHeight}px/${scale})`;
    classPic.style.backgroundPositionY = `calc(${classPicPosY}px/${scale})`;
    classDiv.appendChild(classPic);
    classPicPosY -= classePicHeight;
    // Add all to container
    container.appendChild(classDiv);
  });

  //  Randomizer
  randomizeButton.addEventListener("click", function () {
    btn.style.display = "none";
    overlay.style.display = "none";

    randomizeClass();
  });

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
    // result = "Striker";
    if (result === "Striker") {
      resultText.textContent = "💩 also known as Striker";
    } else {
      resultText.textContent = result;
    }
    result_div.appendChild(resultText);
    popup.appendChild(result_div);
    const lastSelectedClass = document.getElementById(result);
    resultLastSelectedClass = lastSelectedClass.cloneNode(true);
    resultLastSelectedClass.removeChild(resultLastSelectedClass.lastChild);
    resultLastSelectedClass.removeChild(resultLastSelectedClass.lastChild);
    resultLastSelectedClass.style.width = `calc(${classImgWidth}px/${scale})`;
    resultLastSelectedClass.style.height = `calc(${classImgHeight}px/${scale})`;
    resultLastSelectedClass.style.border = `4px solid ${randomColor}`;
    resultLastSelectedClass.style.boxShadow = `0 0 20px ${randomColor}`;
    resultLastSelectedClass.style.position = "fixed";
    resultLastSelectedClass.style.margin = "20% 0 0 -12px";
    result_div.appendChild(resultLastSelectedClass);

    lastSelectedClass.style.border = `4px solid ${randomColor}`;
    lastSelectedClass.style.boxShadow = `0 0 20px ${randomColor}`;
    // lastSelectedClass.style.zIndex = 100;
    lastSelectedClass.classList.add("highlight");
    overlay.style.display = "block";
    result_div.style.display = "block";
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

    return `rgba(${adjustedR},${adjustedG},${adjustedB},0.8`;
  }
});
