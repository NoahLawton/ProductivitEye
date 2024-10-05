// Initialize WebGazer.js and start eye tracking
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    console.log(data); // Eye tracking data
}).begin();

// Optionally, save and load settings
webgazer.showPredictionPoints(true);  // Show prediction points on the screen