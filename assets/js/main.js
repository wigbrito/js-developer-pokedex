const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}


function loadPokemonDetails(pokemonId) {
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const pokemonName = document.getElementById('pokemonName');
        const pokemonType = document.getElementById('pokemonType');
        const pokemonImage = document.querySelector('.pokemon-image img');

        // Preencha os elementos HTML com os detalhes do Pokémon
        pokemonName.textContent = pokemon.name;
        pokemonType.textContent = pokemon.type;
        pokemonImage.src = pokemon.photo;
    });
}
function loadPokemonDetails(pokemonId) {
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const pokemonDetail = document.getElementById('pokemon-detail');
        const newHtml = `
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <h3>${pokemon.name}</h3>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        `;
        pokemonDetail.innerHTML = newHtml;
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

