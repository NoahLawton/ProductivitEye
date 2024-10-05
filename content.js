let tracking = false;

function startTracking() {
    tracking = true;
    
    // Request access to webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            // Start WebGazer and set up gaze listener
            webgazer.setGazeListener((data, elapsedTime) => {
                if (data) {
                    const { x, y } = data;
                    console.log(`Gaze position: X: ${x}, Y: ${y}`);
                    
                    const screenCenterX = window.innerWidth / 2;
                    const screenCenterY = window.innerHeight / 2;

                    // Check if the gaze is outside a certain region of the screen
                    if (Math.abs(x - screenCenterX) > 100 || Math.abs(y - screenCenterY) > 100) {
                        sendMessage();
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
    console.log("Tracking stopped.");
}

function sendMessage() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Attention Required',
        message: 'You stopped looking at the screen!',
        priority: 2
    });
}

startTracking(); // Start tracking when the content script is loaded
