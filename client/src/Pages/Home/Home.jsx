import { Card } from '../../components/Card/Card';
import { Filters } from '../../components/Filters/Filters';
import { NavBar } from '../../components/NavBar/NavBar';
import { Paginate} from '../../components/Paginate/Paginate';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => { 
  return (
    <main id='home'>
      <NavBar />
      <Filters />
      <Card />
      <Paginate />
      <Footer />
    </main>
  )
}
