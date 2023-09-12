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
        div.id = i
        div.addEventListener('mouseenter',()=>{
            const moreInfo = document.createElement('div')
            moreInfo.id = "moreInfo"
            document.getElementById('main').appendChild(moreInfo)
            const language = document.createElement('h4')
            language.innerHTML = `Language(s): ${Object.values(json[div.id].languages)}`
            const polishName = document.createElement('h4')
            polishName.innerHTML = `Polish Name: ${Object.values(json[div.id].translations.pol)}`
            const subRegion = document.createElement('h4')
            subRegion.innerHTML = `Subregion: ${json[div.id].subregion}`
            console.log(Object.values(json[div.id].languages))
            console.log(div.id)
            moreInfo.appendChild(subRegion)
            moreInfo.appendChild(polishName)
            moreInfo.appendChild(language)
        })
        div.addEventListener('mouseleave',()=>{
            document.getElementById("moreInfo").remove()
        })
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
    if(document.getElementById(id).checked == true){
        licznik++
        tab.push(id)
        console.log(id)
    }
    else{
        tab = tab.filter(function(el){
            return el !=id
        })
        licznik--
    }
    for(var i=0;i<=json.length-1;i++){
        var isIt = false
        for(var j=0;j<=licznik;j++){
            
            if(tab[j]==json[i].region){
                isIt=true
            }
        }
        console.log(isIt)
        if(isIt!=true && licznik !=0){
            document.getElementsByClassName('divs')[i].style.display = "none"
        }
        else{
            document.getElementsByClassName('divs')[i].style.display = "grid"
        }
    }
    console.log(licznik)
    search()
}
var inputText
function search(){
    inputText = document.getElementById('search').value
    console.log(inputText)
    for(var i=0;i<=json.length-1;i++){
        if(inputText.length==0 && licznik==0){
            document.getElementsByClassName('divs')[i].style.display = "grid"
        }
        else if(inputText.length!=0 && licznik==0){
            if(json[i].name.common.toLowerCase().includes(inputText.toLowerCase())){
                document.getElementsByClassName('divs')[i].style.display = "grid"
            }
            else{
                document.getElementsByClassName('divs')[i].style.display = "none"
            }
        }
        else{
            var isthat = false
            for(var j=0;j<=tab.length;j++){
                
                if(json[i].name.common.toLowerCase().includes(inputText.toLowerCase())&& json[i].region==tab[j]){
                    isthat = true
                }
                
            }
            if(isthat==false){
                document.getElementsByClassName('divs')[i].style.display = "none"
            }
            else{
                document.getElementsByClassName('divs')[i].style.display = "grid"
            }
        }
        
    }
}