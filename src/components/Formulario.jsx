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
              const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
              const response = await fetch(url);
      
              if (!response.ok) {
                  setError('Pokemon no encontrado');
                  setPokemonInfo(null)
              }
      
              const data = await response.json();
              setPokemonInfo(data); 
              setCargando(false);
              setError(false)
      
          }
          catch(error){
              setCargando(false)
              setError('Ha ocurrido un error al conectar con la API', error)
          }
      }
      buscarPokemon();
  },[nombre]);


  const handleChange = (e) => {
    setNombre(e.target.value)
  };

  const handleReset = () => {
    setNombre('');
    setPokemonInfo(null);
    setError(null);
  };

  return (
      <>
        <form  className={styles.formulario} >
          <label htmlFor="buscador">Busca un pokemon:</label>
          <input
            type="text"
            id="Buscador"
            name="buscador"
            value={nombre}
            onChange={handleChange}
          />
          
          <button type="button" onClick={handleReset} className={styles.borrar}>Limpiar</button>

        </form>

        <div className={styles.respuesta}>
          {error && <p>{error} </p>}    
          {(pokemonInfo && !cargando) ?
              <div  key={pokemonInfo.id} className={styles.card}>
                  <h3>{pokemonInfo.name} </h3>
                  <img src={pokemonInfo.sprites.other['official-artwork'].front_default} alt={pokemonInfo.name} />
              </div>
              : 
              <p>Cargando...</p>
          }
        </div>
      </>
  );
}

export default Formulario;
