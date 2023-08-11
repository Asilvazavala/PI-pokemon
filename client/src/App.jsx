import { useEffect } from 'react';
import { useFunctions } from './hooks/useFunctions';
import { getAllTypes } from './redux/actions';

import { Route, Routes } from 'react-router-dom';
import { Landing } from './Pages/Landing/Landing';
import { Home } from './Pages/Home/Home';
import { Create } from './Pages/Create/Create';
import { Details } from './Pages/Details/Details';
import { Audio } from './components/Audio/Audio';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const { dispatch } = useFunctions();

  useEffect(() => {    
    dispatch(getAllTypes()); 
  },[]);  

  return (
    <main>
      <Audio />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create/:id' element={<Create />} />
        <Route path='/create' element={<Create />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;