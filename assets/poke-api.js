const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.species = pokeDetail.species.name;

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonByNumber = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => console.error(error))
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}