console.log("We are connecting...")

let fetchKantoPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
        .then(response => response.json())
        .then(allPokemon => {
            //  console.log(allPokemon.results);
            allPokemon.results.forEach(pokemon => {
                fetchKantoPokemonData(pokemon); 
            });   
        })
}

let fetchKantoPokemonData = (pokemon) => {
    let url = pokemon.url;

    fetch(url)
        .then(response => response.json())
        .then(pokeData => {
            //console.log(pokeData);
            renderPokemon(pokeData);
        })
}

let renderPokemon = (pokeData) => {
    let container = document.getElementById('pokemonWrapper');
    
    let thisContainer = document.createElement('div');

    createPokeImage(pokeData.id, thisContainer);

    // create element to display Pokemon name
    let pokeName = document.createElement('h2');
    pokeName.innerText = pokeData.name;

    // create element to display Pokemon ID
    let pokeDexNumber = document.createElement('p');
    pokeDexNumber.innerText = '#' + pokeData.id;

    // create a list of Pokemon types
    let pokeTypes = document.createElement('ul');
    createTypes(pokeData.types, pokeTypes);

    // append it to the DOM 
    thisContainer.append(pokeName, pokeDexNumber, pokeTypes);
    container.appendChild(thisContainer);
}


let createTypes = (types, ul) => {
    types.forEach(type => {
        let typeLi = document.createElement('li')
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi);

        // ul.append(document.createElement('li').innerText = type['type']['name']);
    })
}

let createPokeImage = (pokeID, containerDiv) => {
    let pokeImageContainer = document.createElement('div');
    pokeImageContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

    pokeImageContainer.append(pokeImage);
    containerDiv.append(pokeImageContainer);
}

fetchKantoPokemon();

