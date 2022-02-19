class EventEmitter {
  constructor() {
    this.events = {}; // hash of array of function
  }

  on(name, fn) {
    if (this.events[name]) this.events[name].push(fn);
    else this.events[name] = [fn];
  }
  emit(name, ...data) {
    if (this.events[name]) {
      this.events[name].forEach((element) => {
        element(...data);
      });
    }
  }
}

function showModal(msg) {
  modal.classList.remove("none");
  modal.classList.add("block");
  document.querySelector("#modal > p").innerText = msg;
}

const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

overlay.addEventListener("click", () => {
  overlay.classList.remove("block");
  overlay.classList.add("none");
  modal.classList.remove("block");
  modal.classList.add("none");
});

document.addEventListener("DOMContentLoaded", () => {
  // 1 завдання - Поміняйте місцями тексти, позначені «1» та «6»

  class ChangePlaceText {
    constructor(text1, text2) {
      this.text1 = text1;
      this.text2 = text2;
    }

    changePlace() {
      [this.text1.innerText, this.text2.innerText] = [
        this.text2.innerText,
        this.text1.innerText,
      ];
    }
  }

  const text1 = document.querySelector("header>p");
  const text2 = document.querySelector(".info>aside>p");
  const change = new ChangePlaceText(text1, text2);

  change.changePlace();

  /* 2 завдання - Напишіть функцію, яка обчислює площу кола, 
    беручи необхідні значення із відповідних змінних у 
    скрипті, і виводить отриманий результат в кінці 
    контенту в блоці «5». */

  class AreaCircle {
    constructor(val) {
      this.val = val;
      this.radius = 20;
      this.pi = Math.PI;
    }

    areaCompute() {
      return Math.round(this.pi * Math.pow(this.radius, 2));
    }

    showResult() {
      this.val.querySelector("p").innerText = `Radius: ${this.radius}`;
      this.val.querySelector("h3").innerText = `Area: ${this.areaCompute()}`;
    }
  }

  const circleValues = document.querySelector(".circle-info");

  const area = new AreaCircle(circleValues);

  area.showResult();

  /* 3 завдання - Напишіть скрипт, який знаходить мінімальну
    цифру у заданому натуральному числі, беручи це 
    число із відповідної форми в блоці «5», а отриманий 
    результат виводить за допомогою діалогового вікна 
    і зберігає в куках */

  class FindMinNumber {
    constructor(num) {
      this.num = num;
    }

    deleteCookie() {
      document.cookie = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      location.reload();
    }

    clearForm() {
      const html = `
                <p>Some funny text<p>
            `;
      document.querySelector(".left>form").innerHTML = html;
    }

    checkCookie() {
      if (document.cookie) {
        this.clearForm();

        const saveOrNot = confirm(document.cookie + " - save cookie?");

        if (!saveOrNot) {
          this.deleteCookie();
        } else {
          alert("Reload page, please");
        }
      }
    }

    findNum() {
      const arrNum = this.num.value.split("");
      let res = arrNum[0];

      arrNum.forEach((elem) => {
        if (elem <= res) {
          res = elem;
        }
      });

      document.cookie = res;

      return res;
    }
  }

  const num = document.querySelector(".con-form>input");
  const subBut = document.querySelector(".con-form>button");
  num.value = "";

  const find = new FindMinNumber(num);

  find.checkCookie();

  subBut.addEventListener("click", (event) => {
    event.preventDefault();
    alert(find.findNum());
  });

  /*4 завдання - Напишіть скрипт, який при настанні події select змінює колір тексту блоку «6» на 
    вказаний користувачем і зберігає відповідне значення кольору в локальному 
    сховищі броузера так, щоб при наступному відкриванні сторінки значення 
    кольору тексту блоку «6» встановлювалось із збереженого значення в 
    локальному сховищі. */

  class ChangeColor {
    constructor(block) {
      this.block = block;
    }

    saveToLocalStore(color) {
      try {
        localStorage.setItem("colorBlock", color);
        return;
      } catch (err) {
        throw new Error(`Error save to localstorage -> ${err}`);
      }
    }

    change(color) {
      this.block.style.backgroundColor = color;
      this.saveToLocalStore(color);
    }
  }

  const block = document.querySelector(".info>aside");
  const colors = document.querySelectorAll(".info>aside>ul>li>p");

  const changeCol = new ChangeColor(block);

  const ee = new EventEmitter();

  block.style.backgroundColor = localStorage.getItem("colorBlock");

  ee.on("changeColor", (data) => {
    changeCol.change(data);
  });

  colors.forEach((elem) => {
    try {
      elem.addEventListener("click", function (event) {
        if (event.target.innerText === "Light") {
          ee.emit("changeColor", "#E4C580");
        } else {
          ee.emit("changeColor", event.target.innerText);
        }
      });
    } catch (err) {
      showModal(err);
    }
  });
});
