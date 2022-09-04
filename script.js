function APOD(apod) {
  html = '  <img src="'+apod.url+'" alt="'+apod.title+'"></img>\n'+
'  <main>\n'+
'    <h1>'+apod.title+'</h1>\n'+
'    <article>\n'+
'      '+apod.explanation+'\n'+
'    </article>\n'+
'    <br><br>\n'+
'    <input id="timestamp" type="date" min="1995-06-16" max="'+new Date().toISOString().split('T')[0]+' value="'+apod.date+'">\n'+
'    <input id="search" type="search" placeholder="Search" list="searchlist">\n'+
'    <a href="https://apod.nasa.gov/apod/astropix.html"><address id="credits">'+(apod.copyright ? ('© ' + apod.copyright) : ('⨀ ' + 'Public domain'))+'</address></a>\n'+
'  </main>\n'
console.log(html)
  if(apod.media_type != 'image')  {
    html.replace('img', 'iframe')
  }
  return html
}
function displayAPOD(apod) {
  document.documentElement.innerHTML = '    <head>\n'+
'      <meta charset="utf-8" title="'+apod.title+'">\n'+
'      <title>'+apod.title+'</title>\n'+
'      <meta name="viewport" content="width=device-width, initial-scale=1">\n'+
'      <meta name="description" content="'+apod.explanation+'">\n'+
'      <meta name="author" content="'+(apod.copyright || 'Public domain')+'">\n'+
'\n'+
'      <meta property="og:title" content="'+apod.title+'">\n'+
'      <meta property="og:type" content="article">\n'+
'      <meta property="og:url" content="https://apod.nasa.gov/apod/astropix.html">\n'+
'      <meta property="og:locale" content="en">\n'+
'      <meta property="og:description" content="'+apod.explanation+'">\n'+
'      <meta property="og:image" content="'+apod.url+'">\n'+
'      <meta property="og:image:secure_url" content="'+apod.url+'">\n'+
'      <meta property="og:image:type" content="image/jpeg">\n'+
'      <meta http-equiv="SameSite" content="Strict">\n'+
'\n'+
'      <meta name="color-scheme" content="dark">\n'+
'      <link rel="stylesheet" href="style.css">\n'+
'      <link rel="icon" href="https://apod.nasa.gov/apod/calendar/today.jpg">\n'+
'    </head>\n'+
'    <body>\n'+
        APOD(apod)+'\n'+
'    </body>\n'+
'\n'
}

timestamp.onchange = function() {
  if (timestamp.value >= timestamp.min && (timestamp.value <= timestamp.max || true)) {
    with (new XMLHttpRequest()) {
      open("GET", 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date='+timestamp.value)
      onload = function() { displayAPOD(JSON.parse(this.responseText)) }
      send()
    }
  }
}
