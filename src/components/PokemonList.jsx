import React, { useEffect, useState } from 'react'
/**
 * @typedef Pokemon
 * @property {string} name
 */
/**
 * @typedef Results
 * @property {Array.<Pokemon>} results
 * @property {string} next
 * @property {string} previous
 */

function PokemonList() {
    /**
     * @type {[Results, React.Dispatch<Results>]}
     */
    const [currentList, setCurrentList] = useState(null)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");

    const handleAnterior = () => {
        setUrl(previous);
    }

    const handleSiguiente = () => {
        setUrl(next);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
            const data = await response.json()
            setTimeout(() => setCurrentList(data), 50)
            setNext(data.next)
            setPrevious(data.previous)

        }
        fetchData().catch(console.error)
        // fetch(url)
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         setTimeout(() => setCurrentList(data), 50)
        //         setNext(data.next)
                // setPrevious(data.previous)
            // })
    }, [url])

    if (!currentList) {
        return
    }

    return (
        <>

            {currentList.results.map((pokemon) => {
                return (
                    <div key={pokemon.name}>
                        <h2>{pokemon.name}</h2>
                    </div>
                )
            })}
            <button onClick={handleAnterior}>Anterior</button>
            <button onClick={handleSiguiente}>Siguiente</button>

        </>
    )
}



export default PokemonList