let seconds = 0;

function timer() {
  console.log(`Time: ${seconds} seconds`);
  seconds++;
}

setInterval(timer, 1000); // execute timer function every 1000ms (1 second)