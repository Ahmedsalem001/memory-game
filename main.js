let duration = 1000;
let blocksContainer = document.querySelector(".blocks-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
let countDownDiv = document.querySelector(".countdown");

document.querySelector(".control-buttons span").onclick = () => {
  let yourName = prompt("Whats Your Name?");
  if (yourName !== "" || yourName == null){
    document.querySelector(".name span").innerHTML = yourName;
  } else {
    document.querySelector(".name span").innerHTML = "Unknown";
  }
  document.querySelector(".control-buttons").remove()
  countDown(120);
}
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index]
  block.addEventListener("click", function() {
    flipBlock(block)
  })
})
function flipBlock(selectedBlock) {
  selectedBlock.classList.add('flipped');
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('flipped'))
  if (allFlippedBlocks.length == 2) {
    stopClick();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    win();
  }
}
function win() {
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('matched'));
  if (allFlippedBlocks.length === blocks.length) {
    document.getElementById("win").play();
    clearTimeout(countDown)
  }
}
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries .num");
  if (firstBlock.dataset.game === secondBlock.dataset.game) {
    firstBlock.classList.remove('flipped');
    secondBlock.classList.remove('flipped');
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
    document.getElementById("nice").play()
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
    firstBlock.classList.remove('flipped');
    secondBlock.classList.remove('flipped');
    }, duration);
    document.getElementById("bad").play()
  }
}
function stopClick() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  },duration)
}
function shuffle(arr) {
  let current = arr.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr;
}
function countDown(duration) {
    let min, sec;
    countDownInterval = setInterval(() => {
      min = parseInt(duration / 60);
      sec = parseInt(duration % 60);
      min = min < 10 ? `0${min}` : min;
      sec = sec < 10 ? `0${sec}` : sec;
      countDownDiv.innerHTML = `${min}:${sec}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        document.getElementById("lose").play();
        window.alert(`Try Again`)
        blocksContainer.classList.add("no-clicking");
        setTimeout(() => {
        location.reload()
        },5000)
      }
    }, 1000)
}