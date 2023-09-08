var json;
async function getData()
{
    const data = await fetch("https://restcountries.com/v3.1/all")
    json = await data.json()
    console.log(json)
    displayNames(json)
}
getData()
function displayNames(json){
    for(var i=0;i<=json.length-1;i++){
        //div
        const div = document.createElement('div')
        div.classList.add('divs')
        div.style.display = "grid"
        div.style.gridTemplateColumns = "33% 33% 34%"
        div.style.gridTemplateAreas = `"flaga nazwa nazwa" "flaga populacja stolica"`
        div.style.width = "400px"
        div.style.height = "100px"
        document.getElementById("main").appendChild(div)
        //flaga
        const flag = document.createElement('img')
        flag.style.width = "100px"
        flag.style.height = "100px"
        flag.src = json[i].flags.png
        flag.style.gridArea = "flaga"
        div.appendChild(flag)
        //nazwa 
        
        const nazwa = document.createElement('h2')
        nazwa.style.textAlign = "center"
        nazwa.innerHTML = json[i].name.common
        nazwa.style.gridArea = "nazwa"
        div.appendChild(nazwa)
        //populacja
        const populacja = document.createElement('h2')
        populacja.style.textAlign = "center"
        populacja.innerHTML = json[i].population
        populacja.style.gridArea = "populacja"
        div.appendChild(populacja)
        //stolica
        const stolica = document.createElement('h2')
        stolica.style.textAlign = "center"
        stolica.innerHTML = json[i].capital
        stolica.style.gridArea = "stolica"
        div.appendChild(stolica)
        
    }
}
var licznik = 0
var tab = []
function check(id){
    var af
    var eu
    var as
    var am
    var oc
    if(document.getElementById(id).checked == true){
        licznik++
        tab.push(id)
        console.log(id)
    }
    else{
        licznik--
    }
    if(document.getElementById("Africa").checked == true){
        af = true
    }
    if(document.getElementById("Europe").checked == true){
        eu = true
    }
    if(document.getElementById("Americas").checked == true){
        am = true
    }
    if(document.getElementById("Asia").checked == true){
        as = true
    }
    if(document.getElementById("Oceania").checked == true){
        oc = true
    }
    for(var i=0;i<=json.length-1;i++){
        var isIt = false
        for(var j=0;j<=licznik;j++){
            
            if(tab[j]==json[i].region){
                isIt=true
            }
        }
        console.log(isIt)
        if(isIt==true){
            document.getElementsByClassName('divs')[i].setAttribute('hidden','hidden')
        }
    }
    console.log(licznik)
}