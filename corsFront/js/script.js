const getCharacter = document.getElementById('getCharacter');
const getAllCharacters = document.getElementById('getAllCharacters');
const characterInfo = document.getElementById('characterInfo');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const nextprevbuttons = document.getElementById('nextprevbuttons');

const urlBase = 'http://localhost:3000/characters';
let next, previous, actualUrl;


const printCharacters = (charactersData) =>{
    characterInfo.innerHTML = '';
    charactersData.forEach(character => {
        const{name, status, species, gender, origin, image} = character;
        characterInfo.innerHTML += `
            <div class="card">
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <div class="container">
                <p><span>Status:</span> ${status}</p>
                <p><span>Species:</span> ${species}</p>
                <p><span>Gender:</span> ${gender}</p>
                <p><span>Origin:</span> ${origin.name}</p>
            </div>
            </div>                
        `                
    });  
}

const fetchCharacters = async(url)=>{  
    if(url == null){
        url = urlBase;
    }  
    try {
        const response = await fetch(url)
        if (!response.ok){
            throw new Error ('La solicitud no se ha podido completar.')
        }
        const data = await response.json();
        const{info, results} = data;
        printCharacters(results)
        next = info.next;
        previous = info.prev;
        actualUrl = url;      
        nextprevbuttons.classList.remove('hidden');


    } catch (error) {
        console.error(error);
        characterInfo.innerHTML = `<p>ha ocurrido un error de solicitud</p>`
    }
}

getAllCharacters.addEventListener('click', ()=>{
    fetchCharacters(urlBase)
    
})

getCharacter.addEventListener('click', ()=>{
    const characterNameIntput = document.getElementById('characterName');
    const characterName = characterNameIntput.value.toLocaleLowerCase();
    fetchCharacters(urlBase+'/'+characterName);    
})

prevButton.addEventListener('click', ()=>{
    if (previous == null){
        fetchCharacters(actualUrl)
    } else{
        fetchCharacters(previous);
    }
})

nextButton.addEventListener('click', ()=>{
    if (next == null){
        fetchCharacters(actualUrl)
    } else{
        fetchCharacters(next);
    }
})

