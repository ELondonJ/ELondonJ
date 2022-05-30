const text = document.querySelector("#anima_sm");
const strText = text.textContent;
const split = strText.split("");
text.textContent = "";
console.log(split);

for (let i = 0; i < split.length; i++) {
  text.innerHTML += "<span>" + split[i] + "</span>";
}
let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
  const span = text.querySelectorAll("span")[char];
  span.classList.add("fadin");
  char++;
  if (char === split.length) {
    clearInterval(timer);
    timer = null;
    return;
  }
}
