var today = new Date();
var today_date = today.toISOString().split("T")[0];
var api_req = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
// DEMO KEY XD

function getAPOD(date) {
  if (!document.cookie.split("apod=")[1]) {
    var Http = new XMLHttpRequest();
    Http.open("GET", api_req, false);
    Http.send();

    document.cookie = "apod=" + Http.response;
  }
  if (date != today_date) {
    Http = new XMLHttpRequest();
    Http.open("GET", api_req + "&date=" + date, false);
    Http.send();
    return JSON.parse(Http.response);
  }
  return JSON.parse(document.cookie.split("apod=")[1]);
}

var apod = getAPOD(today_date);
function getAPODFormattedDate(date) {
  return new Date(date).toISOString().split("T")[0].replaceAll("-", "").slice(2);
}

function displayAPOD(apod) {
  try {
    image.src = apod.hdurl || apod.url;
    image.alt = apod.title;
    document.title = apod.title;
    title.innerText = apod.title;
    if (apod.media_type != "image"){ //to account for occasional Youtube videos
      image.outerHTML = image.outerHTML.replace("img", "iframe");
    } else {
      image.outerHTML = image.outerHTML.replace("iframe", "img");
      image.onclick = function(){
        window.location.href = image.src;
      }
    }
    desc.innerText = apod.explanation;
    timestamp.value = apod.date;
    timestamp.max = today_date;
    if(apod.copyright) {
      credits.innerText = "© " + apod.copyright;
    } else {
      credits.innerText ="";
    }
    view_original.href = "https://apod.nasa.gov/apod/ap" + getAPODFormattedDate(apod.date)  + ".html";
  } catch (Error) {
    image.outerHTML = image.outerHTML.replace("iframe", "img");
    image.src = "error.jpg";
    image.alt = "Error";
  }
}

displayAPOD(apod);
timestamp.oninput = function(){
  if (timestamp.value >= timestamp.min && timestamp.value <= timestamp.max) {
    displayAPOD(getAPOD(timestamp.value));
  }
};
