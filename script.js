// var today = new Date().toISOString().split("T")[0];
// var api_key="DEMO_KEY";
// var api_req = "https://api.nasa.gov/planetary/apod?api_key="+api_key;
// // DEMO KEY XD
// var archive_api_req = "https://api.nasa.gov/planetary/apod?api_key="+api_key+"&start_date="+new Date().getUTCFullYear()+"-01-01";
// function curl(url,onload) {
//   Http= new XMLHttpRequest();
//   Http.open("GET",url);
//   Http.onloadend =onload;
//   Http.send();
//   return Http;
// }
//
// function displayAPOD(date) {
//   function display(pic){
//     image.src = pic.hdurl || pic.url;
//     image.alt = pic.title;
//     document.title = pic.title;
//     title.innerText = pic.title;
//     if (pic.media_type != "image"){ //to account for occasional Youtube videos
//       image.outerHTML = image.outerHTML.replace("img", "iframe");
//     } else {
//       image.outerHTML = image.outerHTML.replace("iframe", "img");
//       image.onclick = function(){
//         window.location.href = image.src;
//       }
//     }
//     desc.innerText = pic.explanation;
//     timestamp.value = pic.date;
//     timestamp.max = today;
//     if(pic.copyright) {
//       credits.innerText = "© " + pic.copyright;
//     } else {
//       credits.innerText ="";
//     }
//     credits.href = "https://apod.nasa.gov/apod/ap" + getAPODFormattedDate(pic.date)  + ".html";
//   }
//
//   if (!document.cookie.split(date+"=")[1]) {
//     curl(api_req+"&date="+date, function(){
//       document.cookie = date+"=" + this.response;
//       display(JSON.parse(document.cookie.split(date+"=")[1]));
//     });
//   } else {
//     display(JSON.parse(document.cookie.split(date+"=")[1].split("; ")[0]));
//   }
//   getAllOpts();
// }
//
// // TODO: stop reliance on 4 digit years (i.e. start splitting by 2 from the end)
// function getAPODFormattedDate(date) {
//   return new Date(date).toISOString().split("T")[0].replaceAll("-", "").slice(2);
// }
//
// function getAllInCookies(){
//   return document.cookie.split("; ")
//   .map(
//     function(sCookie){ return sCookie.split("=")[1] }
//   ).map(
//     function(sJson){ return JSON.parse(sJson) });
// }
// function showInOptions(apod) {
//   opt= document.createElement("option");
//   opt.setAttribute('datetime', apod.date);
//   opt.value= apod.title;
//   searchlist.appendChild(opt);
// }
// function getAllOpts(){
//   curl(archive_api_req, function(){
//     console.log(new Date().getUTCFullYear() +" APOD list")
//     console.table(JSON.parse(this.responseText))
//     JSON.parse(this.responseText).forEach(
//       function(apod){
//         showInOptions(apod);
//       }
//     );
//   });
// }
//
// displayAPOD(today);
// timestamp.onchange = function(){
//   if (timestamp.value >= timestamp.min && timestamp.value <= timestamp.max) {
//     displayAPOD(timestamp.value);
//   }
// };
// search.onchange= function() {
//   selection= Array.prototype.filter.call(searchlist.options,
//     function(option){ return option.value == search.value; })[0];
//   date= selection.getAttribute("datetime");
//   timestamp.value= date;
//   displayAPOD(date);
// }
