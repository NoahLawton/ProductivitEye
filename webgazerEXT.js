document.addEventListener("DOMContentLoaded", function () {
    // initialize the webgazer.js
    webgazer.setRegression("ridge")
    .setTracker('clmtrackr')
    .setGazeListener(function(data, clock) {
        // Do something with gaze data
        console.log(data);
    })


    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(stream => {

            document.getElementById('webgazer-video').srcObject = steam;
        })
        .catch( error => {

            console.error('Error accessing camera: ', error);
        });

}).begin();

document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id },
            function: startTracking
        });
    });
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: stopTracking
        });
    });
});