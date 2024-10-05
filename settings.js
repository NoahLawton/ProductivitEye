document.addEventListener('DOMContentLoaded', function () {
    const eyeTrackingCheckbox = document.getElementById('eyeTracking');
    const saveBtn = document.getElementById('saveBtn');

    // Load saved settings from Chrome storage
    chrome.storage.sync.get('eyeTrackingEnabled', function (data) {
        eyeTrackingCheckbox.checked = data.eyeTrackingEnabled || false;
    });

    // Save settings when the checkbox is clicked
    eyeTrackingCheckbox.addEventListener('change', function () {
        const eyeTrackingEnabled = eyeTrackingCheckbox.checked;
        chrome.storage.sync.set({ eyeTrackingEnabled }, function () {
            alert('Settings saved!');
        });
    });


    // Save settings when "Save Settings" button is clicked
    saveBtn.addEventListener('click', function () {
        const eyeTrackingEnabled = eyeTrackingCheckbox.checked;
        chrome.storage.sync.set({ eyeTrackingEnabled }, function () {
            console.log("Settings saved!")
            alert('Settings saved!');

            // Notify content.js to start or stop tracking based on the checkbox state
            if (eyeTrackingEnabled) {
                console.log("startTracking called")
                alert("startTracking called")
                startTracking();
            } else {
                stopTracking(); // Stop tracking if the checkbox is unchecked
            }
        });
    });

    // Function to send a message to content.js to start tracking
    function startTracking() {
        chrome.runtime.sendMessage({ action: 'startTracking' });
    }

    // Function to send a message to content.js to stop tracking
    function stopTracking() {
        chrome.runtime.sendMessage({ action: 'stopTracking' });
    }

    // Listen for messages from content.js (optional, for feedback or changes)
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'trackingStarted') {
            console.log('Tracking has started.');
        } else if (request.action === 'trackingStopped') {
            console.log('Tracking has stopped.');
        }
    });
});
