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

    // Handle eye tracking calibration (dummy functionality)
    calibrateBtn.addEventListener('click', function () {
        alert('Calibration started. (This would start webGazer calibration in the future)');
        // In the future, you would start webGazer's calibration here.
    });

    // Alert box for browser popup
    window.alert("Lock in!!! Your daydreams can wait until the weekend!")
});
