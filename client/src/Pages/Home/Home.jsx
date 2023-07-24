import { useEffect } from 'react';
import { usePaginate } from '../../hooks/usePaginate';
import { useFunctions } from '../../hooks/useFunctions';
import { getAllPokemon, getAllTypes } from '../../redux/actions';

import { Card } from '../../components/Card/Card';
import { Filters } from '../../components/Filters/Filters';
import { NavBar } from '../../components/NavBar/NavBar';
import { Paginate} from '../../components/Paginate/Paginate';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => { 
  const { currentPokemon } = usePaginate();
  const { dispatch } = useFunctions();

  useEffect(() => {    
    if (currentPokemon.length === 0) {
      dispatch(getAllPokemon());

      setTimeout(() => {
        dispatch(getAllTypes());
      }, 2000)
    }
    
  },[currentPokemon, dispatch])  

  return (
    <div id='home'>
      <NavBar />
      <Filters />
      <Card />
      <Paginate />
      <Footer />
    </div>
  )
}
