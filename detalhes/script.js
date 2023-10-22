document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function gerarDetalhesPokemonHTML(data) {
      const tipos = data.types.map((tipo) => tipo.type.name);
      const habilidades = data.abilities.map((habilidade) => habilidade.ability.name);
      const estatisticas = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);

      const html = `
          <h1>Detalhes do Pokémon</h1>
          <ul id="basic-info">
              <li><strong>Nome:</strong> ${data.name}</li>
              <li><strong>ID:</strong> ${data.id}</li>
              <li><strong>Tipos:</strong> ${tipos.join(', ')}</li>
          </ul>
          <h2>Habilidades</h2>
          <ul>${habilidades.map((habilidade, index) => `<li data-key=${index}>Habilidade ${index + 1}: ${habilidade}</li>`).join('')}</ul>
          <h2>Estatísticas</h2>
          <ul>${estatisticas.map((stat, index) => `<li data-key=${index}>${stat}</li>`).join('')}</ul>
      `;

      return html;
  }

  async function exibirDetalhesPokemon(nomePokemon) {
      const url = `${apiUrl}${nomePokemon.toLowerCase()}`;
      const pokemonDetailsElement = document.getElementById('pokemon-details');

      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Não foi possível encontrar o Pokémon ${nomePokemon}`);
          }

          const data = await response.json();
          const html = gerarDetalhesPokemonHTML(data);
          pokemonDetailsElement.innerHTML = html;
      } catch (error) {
          console.error(error);
      }
  }

  const showPokemonButton = document.getElementById('showPokemonButton');
  showPokemonButton.addEventListener('click', function () {
      const pokemonName = document.getElementById('pokemonName').value;
      exibirDetalhesPokemon(pokemonName);
  });
});
