const d = document,
$shows = d.getElementById("shows"),
$template = d.getElementById("show-template").content,
$fragment = d.createDocumentFragment();

d.addEventListener("keypress", async e =>{
if(e.target.matches("#search")){
if(e.key === "Enter"){
    try {
    $shows.innerHTML = `<img class="loader" src="assets/three-dots.svg" alt="Cargando">`;

    let query = e.target.value.toLowerCase(),
    api = `https://api.tvmaze.com/search/shows?q=${query}`,
    res = await fetch(api),
    json = await res.json();

if (!res.ok) throw{status: res.status, statusText: res.statusText}

if (json.length === 0){
$shows.innerHTML = `<h2>No existen resultados de shows para su busqueda: <mark>${query}</mark></h2>`;
}else{
json.forEach(el =>{
$template.querySelector(".show h3").textContent = el.show.name;
$template.querySelector(".show div").innerHTML= el.show.summary ? el.show.summary:"Sin Descripción";
$template.querySelector(".show img").src = el.show.image ? el.show.image.medium:"http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
$template.querySelector(".show img").alt = el.show.name;
$template.querySelector(".show img").style.maxWidth = "100%";
$template.querySelector(".show a").href = el.show.url ? el.show.url: "#";
$template.querySelector(".show a").target = el.show.url ? "_blank": "_self";
$template.querySelector(".show a").textContent = el.show.url ? "ver más...":"";

let $clone = d.importNode($template, true);

$fragment.appendChild($clone);
});

$shows.innerHTML = "";
$shows.appendChild($fragment);
}
} catch (err) {
console.log(err);
let message = err.statusText || "Ocurrio un error";
$shows.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
}
}
}
});
