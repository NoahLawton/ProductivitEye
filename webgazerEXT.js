document.addEventListener("DOMContentLoaded" , function () {
    //inicialize the webgazer.js
    webgazer.setRegression("ridge")
    .setTracker('clmtrackr')
    .setGazeListener(function(data, clock) {
        // Do something with gaze data
        console.log(data);
    })
    .begin();

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {

        document.getElementById('webgazer-video').srcObject = steam;
      })
      .catch( error => {
        
        console.error('Error accessing camera: ', error);
      });

});