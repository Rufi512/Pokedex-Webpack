import axios from "axios";

export const getSuggestions = async () =>{
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118').catch((err)=>{return err.response})
  if(!res && ! res.status === 200){
    console.log('error')
    return 'Error'
  }else{
    return res.data.results
  }
}

export const getListPokemon = async (page) => {
  let arrayPokemon = [];
  const res = await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${12}&offset=${page}`)
    .catch((err) => { 
      return err
    });
    
  if(!res.data){
    console.log('Información no encontrada')
    return 'Error'
  }else{
  const pokemons = res.data.results;
  for (const el of pokemons) {
    let pokemon = {
      id: null,
      name: "",
      type: [],
      sprite: "",
    };

    const details = await axios.get(el.url).catch((err) => {
      console.log(err);
    });

    for (const detail of details.data.types) {
      pokemon.type.push(detail.type.name);
    }
    pokemon.id = details.data.id;
    pokemon.name = el.name;
    pokemon.sprite = details.data.sprites.front_default;
    arrayPokemon.push(pokemon);
  }

  return arrayPokemon;
    
}

};

export const getPokemonData = async (id) => {
  let pokemon = {
    id: null,
    name: "",
    description: "",
    sprite: "",
    experience: null,
    happiness: null,
    captureRate: null,
    type: [],
    abilities: [],
    habitat: "",
    height: null,
    weight: null,
    eggs: [],
    stats_normal: [
      {
        name: "HP",
        colorStroke:'#d7443e',
        value: null,
      },
      {
        name: "Attack",
        colorStroke:'#ffc73a',
        value: null,
      },
      {
        name: "Defense",
        colorStroke:'#42a5f5',
        value: null,
      },
      {
        name: "Speed",
        colorStroke:'#58bdf5',
        value: null,
      },
    ],
    stats_special: [
      {
        name: "Attack",
        colorStroke:'#ffc73a',
        value: null,
      },
      {
        name: "Defense",
        colorStroke:'#42a5f5',
        value: null,
      },
    ],
    evolutions: [],
  };
  const res = await axios
    .get("https://pokeapi.co/api/v2/pokemon/" + id)
    .catch((err) => {
      console.log(err);
    });
  if (res) {
    const species = await axios.get(res.data.species.url).catch((err) => {
      console.log(err);
    });

    if (species) {
      const egg_groups = species.data.egg_groups;
      for (const el of egg_groups) {
        pokemon.eggs.push(el.name);
      }

      for (const description of species.data.flavor_text_entries) {
        if (description.language.name === "en") {
          pokemon.description = description.flavor_text.replace(/\f/, " ");
          break;
        }
      }

      pokemon.habitat = species.data.habitat
        ? species.data.habitat.name
        : "Not found";
      pokemon.happiness = species.data.base_happiness;
      pokemon.captureRate = species.data.capture_rate;

      const evolution = await axios
        .get(species.data.evolution_chain.url)
        .catch((e) => {
          console.log(e);
        });
      if (evolution.data) {
        const evolutions = evolution.data.chain.evolves_to;
        for (const data of evolutions) {
          const res = await axios
            .get("https://pokeapi.co/api/v2/pokemon/" + data.species.name)
            .catch((err) => {
              console.log(err);
            });
          let typesPokemonEvolution = [];
          console.log(res);
          if (res) {
            for (const typePokemon of res.data.types) {
              console.log(typePokemon);
              typesPokemonEvolution.push(typePokemon.type.name);
            }
            pokemon.evolutions.push({
              name: data.species.name,
              sprite: res.data.sprites.front_default,
              type: typesPokemonEvolution,
            });
          }
        }
      }
    }
    const abilities = res.data.abilities;
    for (const el of abilities) {
      pokemon.abilities.push(el.ability.name);
    }
    for (const types of res.data.types) {
      pokemon.type.push(types.type.name);
    }

    pokemon.id = res.data.id;
    pokemon.name = res.data.name;
    pokemon.sprite = res.data.sprites.other["official-artwork"].front_default;
    pokemon.weight = res.data.weight;
    pokemon.height = res.data.height;
    pokemon.experience = res.data.base_experience;
    pokemon.stats_normal[0].value = res.data.stats[0].base_stat;
    pokemon.stats_normal[1].value = res.data.stats[1].base_stat;
    pokemon.stats_normal[2].value = res.data.stats[2].base_stat;
    pokemon.stats_normal[3].value = res.data.stats[5].base_stat;
    pokemon.stats_special[0].value = res.data.stats[3].base_stat;
    pokemon.stats_special[1].value = res.data.stats[4].base_stat;

    return pokemon;
  }
};


export const getPokemonFavortitesData = async (id) =>{
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id).catch((err) => {
              console.log(err);
            });
   if(!res && ! res.status === 200){
    console.log(res)
    return 'Error!'
   }else{
    return({
      id:res.data.id,
      name: res.data.name,
      sprite:res.data.sprites.front_default
    })
   }
}