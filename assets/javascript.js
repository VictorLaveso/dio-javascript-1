const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detalhesContainer = document.getElementById('detalhesContainer')
const limit = 5
let offset = 0;

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
                 <button class="botao ${pokemon.type}" data-pokemon-id="${pokemon.number}">DETALHES</button>
            </li> 
        `).join('')
        pokemonList.innerHTML += newHtml

        const detailButtons = document.querySelectorAll('.botao')
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const pokemonNumber = event.target.getAttribute('data-pokemon-id')
                loadPokemonDetalhes(pokemonNumber)
            })
        })
    })
}

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

loadPokemonItens(offset, limit);

function loadPokemonDetalhes(pokemonNumber) {
    pokeApi.getPokemonByNumber(pokemonNumber).then(pokemon => {
        const detalhesHtml = `
            <div class="pokemon ${pokemon.type}">
                <div class="modalDivNumber">
                    <p class="modalNumber">#${pokemon.number}</p>
                </div>
                <div class="modalHeader">
                    <h2 style="color: white;">${pokemon.name}</h2>
                    <ol class="modalTypes">
                        ${pokemon.types.map((type) => `<li class="modalType ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="modalBody">
                    <div class="sobre">
                        <ol class="modalTypes">
                            <li class="modalType>Species</li>
                            <li class="modalType>Height</li>
                            <li class="modalType>Weight</li>
                            <li class="modalType>Abilities</li>
                        </ol>
                    </div>
                </div>
                
            </div>
        `;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = detalhesHtml;

        const modal = document.getElementById('pokemonModal');
        modal.style.display = 'block';
    }).catch(error => {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
    });
}

function closeModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
}

const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemonModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

