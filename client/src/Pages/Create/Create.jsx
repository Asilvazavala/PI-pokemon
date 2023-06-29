import { useState } from 'react';
import styles from './Create.module.css';

import { NavBar } from '../../components/NavBar/NavBar';
import { InputsForm } from './InputsForm/InputsForm';

export const Create = () => {
  // Estado para guardar los errores del form
  const [err, setErr]= useState({});

  // Estado para actualizar los inputs del form
  const[input, setInput]= useState({
    name: '',
    image: '',
    types: [],
    hp:'',
    attack: '',
    defense: '',
    speed:'',
    height: '',
    weight: '',
  });

  return (
    <div className={styles.containerCreate}>
      <NavBar />
      <InputsForm input={input} setInput={setInput} err={err} setErr={setErr} />
    </div>
  )
}
