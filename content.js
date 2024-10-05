let tracking = false;
let looking = true;

function startTracking() {
    console.log("Eye Tracking Started")
    tracking = true;
    
    // Request access to webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            // Start WebGazer and set up gaze listener
            webgazer.setGazeListener((data) => {
                webgazer.showFaceOverlay(true);   // Show face overlay for better tracking
                webgazer.showPredictionPoints(true);  // Enable prediction point display
                if (!data) {
                    console.log("No data yet")
                }
                if (data.x && data.y) {
                    console.log("X position guess: " + data.x)
                    console.log("Y position guess: " + data.y)
                }
                else {
                    alert ("Get back to work!")
                }
                if (data) {
                    const confidence = data.confidence;
                    if (confidence < 0.5) { // Threshold can be adjusted
                        looking = false
                        if (!looking) {
                            console.log("User is not looking at the screen.");
                            looking = false; // Change looking state
                        }
                    } else {
                        looking = true
                        if (looking) {
                            console.log("User looking at screen");
                            looking = true; // Change looking state
                        }
                    }
                }
            }).begin();

            console.log("WebGazer is ready!");
        })
        .catch(err => {
            console.error("Error accessing webcam:", err);
        });
}

function stopTracking() {
    tracking = false;
    webgazer.pause();
    console.log("Eye Tracking Stopped.");
}

function sendMessage() {
    alert("Hey, you stopped looking! Get back to work!")
    // chrome.notifications.create({
    //     type: 'basic',
    //     iconUrl: 'icon.png',
    //     title: 'Attention Required',
    //     message: 'You stopped looking at the screen!',
    //     priority: 2
    // });
}

function checkTrackingState() {
    chrome.storage.sync.get('eyeTrackingEnabled', function (data) {
        if (data.eyeTrackingEnabled) {
            startTracking();
        } else {
            stopTracking();
        }
    });
}

// Check the state when the content script is loaded
checkTrackingState();

// Optional: Check periodically (e.g., every 1 second) to see if the state changes
// setInterval(checkTrackingState, 1000);


// startTracking();