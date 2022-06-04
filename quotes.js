const url = "https://type.fit/api/quotes";
let default_message = "Thanks for stopping by!";
let body = document.body;

function createDomElement(data) {
  console.log(data);
  let section = document.createElement("section");
  section.className = "bg-dark p-3 text-light d-flex";
  section.id = "quote";
  body.appendChild(section);
  let quote = document.createElement("h6");
  quote.className = "m-auto";
  quote.id = "quote-header";
  quote.textContent = data;
  section.appendChild(quote);
}
const fetchData = async function (url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    console.log("length", data.length);
    let rand = Math.floor(Math.random() * data.length);
    console.log("rand", rand);
    let text = data[rand].text + " - " + data[rand].author;
    createDomElement(text);
  } catch (error) {
    createDomElement(default_message);
  } finally {
  }
};

fetchData(url);
