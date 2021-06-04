//var canvas = document.getElementById('canvas-frame')
//var context = canvas.getContext('2d')
//var logger = document.getElementById('logger')
//let iWindow = null;

const cellSize = 33;
const mapWidth = 35;
const mapHeight = 25;

const koordBorderColor = 'rgb(200,200,200)';
const koordFillColor = 'rgb(230,230,230)';
const koordTextColor = 'rgb(0,0,0)';

    let selectedArmy = null;

initCanvas();
initUnits();
addHeadingToPage();

/*function addGrid() {
	logInfo('addGrid started');
    var width = 960;
    var height = 960;
    var x = 0;
    var y = 0;
    context.strokeStyle = 'black'
    for(i = x; i < width; i += 32) {
	    context.moveTo(i, y);
		context.lineTo(i, height);
		context.stroke();
    }
	for(i = y; i < height; i += 32) {
	    context.moveTo(x, i);
		context.lineTo(width, i);
		context.stroke();
    }
	logInfo('addGrid ended');
}
//addGrid();//*/

//not needed
function addHeadingToPage() {
    var heading = document.getElementById('heading')
    heading.innerHTML = "VS test"
}

function initUnits() {
    console.log("initUnits");
    var knight = document.getElementById('knight');

    knight.addEventListener('mousedown', e => {
        console.log("knight mousedown");
        if (selectedArmy == knight) {
           selectedArmy = null;
           knight.style.border = 'solid 0px black';
        } else {
          selectedArmy = knight;
          knight.style.border = 'solid 1px black';
        }
    });
}

function initCanvas() {
    console.log("initCanvas");
    var canvas = document.getElementById('canvas-container');
    var context = canvas.getContext('2d')
    var axisXinput = document.getElementById('axisXinput');
    var axisYinput = document.getElementById('axisYinput');

    //Set canvas size in accordance with map size and koord lines
    canvas.width = cellSize*(mapWidth+1);
    canvas.height = cellSize*(mapHeight+1);

    // Draw koords
    context.strokeStyle = koordBorderColor;
    context.font = "14px serif";
    var xshift = 12;
    var yshift = 22;
    for (x = 0, i = 0; x <= cellSize*mapWidth; x += cellSize, i++) {
      context.strokeRect(x, 0, cellSize, cellSize);
      context.fillStyle = koordFillColor;
      context.fillRect(x, 0, cellSize-1, cellSize-1);
      if (i > 0) {
        context.fillStyle = koordTextColor;
        context.fillText(i, x+xshift, yshift);
      }
    }
    for (y = cellSize+1, i = 1; y <= cellSize*mapWidth; y += cellSize, i++) {
      context.strokeRect(0, y, cellSize, cellSize);
      context.fillStyle = koordFillColor;
      context.fillRect(0, y, cellSize-1, cellSize-1);
      context.fillStyle = koordTextColor;
      context.fillStyle = koordTextColor;
      context.fillText(i, xshift, y+yshift);
    }
    //Load map image
    base_image = new Image();
    base_image.src = 'img/map.png';
    base_image.onload = function(){
      context.drawImage(base_image, cellSize+1, cellSize+1);
    }


    //MouseMove event transfers position
    canvas.addEventListener('mousemove', e => {
      //console.log("OnMousMove enter");

      var koordX = Math.ceil((e.offsetX/cellSize)-1);
      var koordY = Math.ceil((e.offsetY/cellSize)-1);

      axisXinput.value = (koordX<=0 || koordY<=0) ? "" : koordX;
      axisYinput.value = (koordX<=0 || koordY<=0) ? "" : koordY;
    });

    canvas.addEventListener('mouseout', e => {
      console.log("OnMousOut enter");
      axisXinput.value = "";
      axisYinput.value = "";
    });
      /*window.addEventListener("message", data => {
        console.log("Index message enter: " + data);
        // extract the data from the message event
        //const { data } = event;
        // display it in our textarea as formatted JSON
        //output.value = JSON.stringify(data, null, 2);
        var axisXinput = document.getElementById('axisXinput');
        var axisYinput = document.getElementById('axisYinput');
        axisXinput.value = data;
      });//*/

    /*var iframe = document.getElementById('canvas-frame');
          iframe.addEventListener("load", () => {
        console.log("canvas-frame loaded");
        iWindow = iframe.contentWindow;
        if (iWindow === null) {
          console.log('iWindow is null');
          return;
        }
        iWindow.postMessage("canvas-frame loaded");
    });//*/
}
/*    canvas.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;;
            body = eventDoc.body;//document.getElementById('canvas-container');

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        var axisXinput = document.getElementById('axisXinput');
        var axisYinput = document.getElementById('axisYinput');
        axisXinput.value = event.pageX;
        axisYinput.value = event.pageY;
    }//*/





