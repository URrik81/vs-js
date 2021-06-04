

(function() {

    let parent = null;
    console.log("Start canvas function");
    var canvas = document.getElementById('canvas-container');
    canvas.addEventListener('mousemove', e => {
      console.log("OnMousMove enter");
      //check parent 
      if (parent === null) {
          console.log("Parent is null");
          return;
      }
      parent.postMessage("X:" + e.offsetX + " Y: " + e.offsetY);
    });

      // add an event listener to run when a message is received
      window.addEventListener("message", ({ data, source }) => {
        console.log("message enter " + data);
        // if we don't have a reference to the parent window yet, set it now
        if (parent === null) {
          parent = source;
        }
        // now we can do whatever we want with the message data.
        // in this case, displaying it, and then sending it back
        // wrapped in an object
        //output.textContent = JSON.stringify(data);
        //const response = {
        //  success: true,
        //  request: { data },
        //};
        //parent.postMessage(response);
      });
    console.log("End canvas function");
})();