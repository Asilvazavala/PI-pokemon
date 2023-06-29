import styles from './Audio.module.css';
import pokemonSong from '../../assets/Audio/Pokémon - Atrápalos Ya (Latino).mp3';

export const Audio = () => {
  return (
    <div>
      {/* Pokemon song */}
      <audio className={styles.audio} src={pokemonSong} controls></audio> 
    </div>
  )
}
