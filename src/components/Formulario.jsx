import { useState, useEffect } from 'react';
import styles from '../components/formulario.module.css'

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [pokemonInfo, setPokemonInfo ] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);


useEffect(() =>{
    const buscarPokemon = async () =>{
        if(nombre.trim() === ''){
            setPokemonInfo(null);
            return;
        }
        setCargando(true);
        setError(null)

        try{
            const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLocaleLowerCase()}`;
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
    
            const data = await response.json();
            setPokemonInfo(data)
            setCargando(false);
            setError(false)
    
        }
        catch(error){
            setCargando(false)
            setError('ha ocurrido un error')
        }
        
    }
    buscarPokemon();
},[nombre]);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setNombre('');
    setPokemonInfo(null);
    setError(null);
  };

    return (
        <>
          <form onSubmit={handleSubmit} className={styles.formulario} >
            <label htmlFor="buscador">Busca un pokemon:</label>
            <input
              type="text"
              id="Buscador"
              name="buscador"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            
            <button type="submit">Enviar</button>
            <button type="button" onClick={handleReset} className={styles.borrar}>Limpiar</button>

          </form>

          <div className={styles.respuesta}>
            {cargando && <p>Cargando...</p>}
            {error && <p>{error} </p>}

    
                
               { pokemonInfo && (
                    <div  key={pokemonInfo.id} className={styles.card}>
                        <h3>{pokemonInfo.name} </h3>
                        <img src={pokemonInfo.sprites.front_shiny} alt={pokemonInfo.name} />
                    </div>
                
            )}
          </div>
        </>
    );
}

export default Formulario;
