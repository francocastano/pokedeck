import React, { useEffect, useState } from 'react'

function Pokemon() {

  const [pokemon, setPokemon] = useState({});
  console.log(pokemon)
  const [id,setId] = useState(9);

  const handleAnterior = () => {
    id > 1 && setId(id - 1)
  }

  const handleSiguiente = () => {
    setId(id + 1)
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => setPokemon(data))
  }, [id])


  return (
    <>{ 
        pokemon && 
        <div>
            <h2>{pokemon.name}</h2>
            <p>ID:{pokemon.id}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <br />
            {id > 1 ? <button onClick={handleAnterior}>Anterior</button> :<button disabled>Anterior</button> }
            <button onClick={handleSiguiente}>Siguiente</button>
        </div>
    }
    </>
  )
}

export default Pokemon