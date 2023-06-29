import {useMemo} from 'react';
import styles from './MarkedItem.module.css';

export const MarkedItem = ({ item, search, onClick }) => {

  // Encontrar las posiciones de las letras a marcar
  const getMarkedPositions = (item, search) => {
    const index = item.name.toLowerCase().indexOf(search);
    const left = item.name.slice(0, index);
    const right = item.name.slice(index + search.length);
    const center = item.name.slice(index, index + search.length);
    const image = item.image;

    return { left, center, right, image }
  };

  // Actualizar las letras marcadas
  const {left, center, right, image} = useMemo(
    () => getMarkedPositions(item, search),
    [item, search]);

  // Pasar por props el item clickeado
  const hanldeClick = () => {
    onClick(item.name);
  };


  return (
    <main>
      <button className={styles.styledItem} onClick={hanldeClick}>
        <img src={image} width={40} height={40} alt="" />
        {left}
        <span className={styles.styledMarked}>{center}</span> 
        {right}
      </button>
    </main>
  )
}
