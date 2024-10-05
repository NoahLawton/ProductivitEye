document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-webgazer');
    const sensitivitySlider = document.getElementById('sensitivity');
    const sensitivityValue = document.getElementById('sensitivity-value');
  
    let trackingEnabled = false;
  
    // Handle the Start/Stop button
    toggleButton.addEventListener('click', function () {
      if (!trackingEnabled) {
        // Start WebGazer
        startWebGazer();
        toggleButton.textContent = 'Stop Tracking';
      } else {
        // Stop WebGazer
        stopWebGazer();
        toggleButton.textContent = 'Start Tracking';
      }
      trackingEnabled = !trackingEnabled;
    });
  
    // Update sensitivity value display
    sensitivitySlider.addEventListener('input', function () {
      sensitivityValue.textContent = sensitivitySlider.value;
      // Implement sensitivity adjustment for WebGazer if needed
    });
  
    function startWebGazer() {
      webgazer.begin();
    }
  
    function stopWebGazer() {
      webgazer.end();
    }
  });
  