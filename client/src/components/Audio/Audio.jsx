import { useState, useEffect } from 'react';
import pokemonSong from '../../assets/Audio/Pokémon - Atrápalos Ya (Latino).mp3';
import { useFunctions } from '../../hooks/useFunctions'
import { usePaginate } from '../../hooks/usePaginate'

export const Audio = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const { currentPokemon } = usePaginate();
  const { dispatch, getAllPokemon } = useFunctions();

  const handlePlayPause = () => {
    const audio = document.getElementById('audioElement');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (currentPokemon.length === 0) {
      dispatch(getAllPokemon());
    }
  }, []);
  
  return (
    <div style={{ position: 'relative' }}>
      <audio
        id="audioElement"
        src={pokemonSong}
        loop
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 9999, 
        }}
      />
      <span
        title={isPlaying ? 'Pause' : 'Play'}
        onClick={handlePlayPause}
        style={{
          position: 'fixed',
          bottom: '.3rem',
          right: '.3rem',
          zIndex: 10000, 
          fontSize: '2.5rem',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        {isPlaying 
          ? <i className='bx bx-pause-circle'></i> 
          : <i className='bx bx-play-circle'></i>}
      </span>
    </div>
  )
}
