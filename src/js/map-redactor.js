

document.addEventListener("DOMContentLoaded", function(event) { 
console.log("Map editor is ready");
var brushSize = 1;
var selectedTerran = 0;

var brush1 = document.getElementById("brush1");
var brush3 = document.getElementById("brush3");
var brush5 = document.getElementById("brush5");

addTerrans();
initBrushes();


function addTerrans() {
console.log("addTerrans begin");
let xhr = new XMLHttpRequest(); 
xhr.open("GET", "/terrans");
xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else { // если всё прошло гладко, выводим результат
    console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    console.log(`Data ${xhr.response} `); 
    objectArray = JSON.parse(xhr.response);
    console.log(`objectArray parsed to ${objectArray}`);
    var myDiv = document.getElementById("terrans");
    
    for (i = 0; i < objectArray.length; i++) {
       obj = objectArray[i];
       color = (0x01000000 + obj.Color).toString(16).substr(1);
       console.log(`added button for ${obj} with name: ` + obj.Name + ` and color : ` + color);
       button = document.createElement("BUTTON");
       button.title = obj.Name;
       button.alt = obj.Name;
       button.style.background = "#" + color;
       button.id = "terran-button-" + i;
       button.classList.add("vs-button");
       button.classList.add("terran-button");
       myDiv.appendChild(button);
    }
    initTerranButtons(objectArray.length);
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    console.log(`Получено ${event.loaded} из ${event.total} байт`);
  } else {
    console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
  }

};

xhr.onerror = function() {
  console.log("Запрос не удался");
};

console.log("addTerrans end");
}

function initBrushes() {

  checkBrushes(brushSize);
  brush1.addEventListener("click", function(event) {
    checkBrushes(1);
  });
  brush3.addEventListener("click", function(event) {
    checkBrushes(3);
  });
  brush5.addEventListener("click", function(event) {
    checkBrushes(5);
  });
}

function checkBrushes(size) {
  brushSize = size;
  console.log("checkBrushes with size " + brushSize);
  switch (brushSize) {
    case 3:
     brush1.classList.remove('vs-button-pressed');
     brush3.classList.add('vs-button-pressed');
     brush5.classList.remove('vs-button-pressed');
     break;
    case 5:
     brush1.classList.remove('vs-button-pressed');
     brush3.classList.remove('vs-button-pressed');
     brush5.classList.add('vs-button-pressed');
     break;
    case 1:
    default:
     brush1.classList.add('vs-button-pressed');
     brush3.classList.remove('vs-button-pressed');
     brush5.classList.remove('vs-button-pressed');
     brushSize = 1;
  }
}

function initTerranButtons(size) {
  console.log("initTerranButtons with size " + size);
  for (i = 0; i < size; i++) {
       button  = document.getElementById("terran-button-" + i);
       const j = i;
       button.addEventListener("click", function(event) {
         checkTerrans(j, objectArray.length);
       });
  }
}

function checkTerrans(buttonId, size) {
  brushSize = size;
  for (i = 0; i < size; i++) {
    button  = document.getElementById("terran-button-" + i);
    if (typeof(button) != 'undefined' && button != null)
    {
      if (i == buttonId) {
        button.classList.add('vs-button-pressed');
      } else {
        button.classList.remove('vs-button-pressed');
      }
    } else {
      console.log("button undefined!!!");
    }
  }
}
//EOF
});


