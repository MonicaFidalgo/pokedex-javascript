const pokedex = document.getElementById("pokedex");

const getColorByType = (type) => {
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };

  return colors[type] || "#A8A77A"; // Default color
};

const getPokemon = async () => {
  const pokemon = [];

  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("data", data);

    pokemon.push({
      id: data.id,
      name: data.name,
      image:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
      type: data.types[0].type.name,
    });
  }

  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  const pokemonString = pokemon
    .map((singlePokemon) => {
      console.log(singlePokemon);
      // Format the ID with leading zeros
      const formattedId =
        singlePokemon.id < 10
          ? `00${singlePokemon.id}`
          : singlePokemon.id < 100
          ? `0${singlePokemon.id}`
          : singlePokemon.id;

      return `
            <li index="${singlePokemon.id}">
                <a href="https://www.pokemon.com/us/pokedex/${
                  singlePokemon.name
                }" target="_blank">
                    <div class="img-wrapper">
                        <img src="${singlePokemon.image}" />
                    </div>
                    <h4>${singlePokemon.name}</h4>
                    <p>${formattedId}</p>
                      <span class="pokemon-type" style="background-color: ${getColorByType(
                        singlePokemon.type
                      )}">${singlePokemon.type}</span>
                </a>
            </li>`;
    })
    .join("");

  pokedex.innerHTML = pokemonString;
};

getPokemon();
