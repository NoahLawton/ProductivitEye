let lastGaze = {x: 0, y: 0};
let lookingAwayTime = 0;
const smoothingFactor = 0.8;

function smoothGaze(data) {
    if (data.x !== null && data.y !== null){
        lastGaze.x = lastGaze.x * smoothingFactor + data.x * (1 - smoothingFactor)
        lastGaze.y = lastGaze.y * smoothingFactor + data.y * (1 - smoothingFactor)
        return lastGaze;
    }
    return null;
}

webgazer.setGazeListener((data) => {
    if (!data) {
        console.log("No data yet")
        return;
    }

    console.log("gaze data:", data);
    const smoothedData = smooothGaze(data);

    if (smoothedData {
        console.log("Smoother X position guess: " + smoothedData.x)
        console.log("Smoothed Y position guess: " + smoothedData.y)

        const confidence = data.confidence || 1;
        if (confidence < 0.5) {
            lookingAwayTime += 100;
        } else {
            lookingAwaytime = 0; // Reset if looking back
        }

        if (lookingAwayTime > 2000) { // 2 seconds threshold
            console.log("user has been looking away for too long.")
            sendMessage();
            lookingAwayTime = 0; // Reset after sending message
        } else {
            console.log("User is looking at the screen")
        }
    }
}).begin();