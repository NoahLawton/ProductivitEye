/*
// TODO
    Implement text notifications
*/

let tracking = false;
let looking = true;

function startTracking() {
    console.log("Eye Tracking Started")
    tracking = true;

    // Request access to webcame
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
            //Start WebGazer and set up gaze listener
            wegbgazer.setGazeListener((data) => {
                webgazer.showVideoPreview(false); // Hides teh camera preview
                webgazer.showFaceOverlay(flase); // HIdes face overlay
                webgazer.showPreditionPoints(false); // Hides prediction point display
                if (!data) {
                    console.log("No data yet")
                }
                if (data && data.x !== null && data.y !== null) {
                    console.log("X position guesss: " + data.x)
                    console.log("Y position guess: " +  data.y)
                }
                else { // No gaze data found
                    console.log("Get back to work")
                    alert("Get back to work!")
                    throw new Error("Invalid gaze data")
                }
                if (data) {
                    const confidence = data.confidence;
                    if (confidence < 0.5) { // This doesn't work. Confidence is always undefined
                        looking = false
                        if (!looking) {
                            console.log("User is not looking at the screen.");
                            looking = false; // Change looking state
                        }
                    } else {
                        looking = true
                        if (looking) {
                            console.log("User looking at screen")
                            looking = true; // Change looking state
                        }
                    }
                }
            }).begin();

            console.log("WebGazer is ready!");
        })
        .catch(err => {
            console.error("Error accessing webcame:", err);
        });
}

function stopTracking() {
    tracking = false;
    webgazer.pause();
    console.log("Eye Tracking Stoppeed.");
}

function sendMessage() {
    alert("Hey, you stopped looking! Get back to work!")
    // chrome.notifications.create ({
    //      type: 'basic', 
    //      iconURL: 'icon.png'
    //      title: 'Atgtention Required',
    //      message: 'You stopped looking at teh screen!',
    //      priority: 2
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