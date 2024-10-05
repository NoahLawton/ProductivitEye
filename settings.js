document.addEventListener('DOMContentLoaded', function () {
    const eyeTrackingCheckbox = document.getElementById('eyeTracking');
    const saveBtn = document.getElementById('saveBtn');
    const calibrateBtn = document.getElementById('calibrateBtn');

    // Load saved settings from Chrome storage
    chrome.storage.sync.get('eyeTrackingEnabled', function (data) {
        eyeTrackingCheckbox.checked = data.eyeTrackingEnabled || false;
    });

    // Save settings when "Save Settings" button is clicked
    saveBtn.addEventListener('click', function () {
        const eyeTrackingEnabled = eyeTrackingCheckbox.checked;
        chrome.storage.sync.set({ eyeTrackingEnabled }, function () {
            alert('Settings saved!');
        });
    });
    
});
