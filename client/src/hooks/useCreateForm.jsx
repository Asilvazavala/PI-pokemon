import { useState } from 'react';
import { useFunctions } from './useFunctions';
import { useNotification } from './useNotification';
import { Validation } from '../Helpers/Validation';
import handleNullImage from '../images/handleNullImage.png';
import { postPokemon, updatePokemon, getAllPokemon } from '../redux/actions';

export const useCreateForm = () => {
  const { dispatch, history, useSelector, id } = useFunctions();
  const { notificationSuccess, notificationWarning } = useNotification();
  const detail = useSelector((state) => state.detail);  

  const [err, setErr]= useState({});
  
  const[input, setInput]= useState({
    name: '',
    image: handleNullImage,
    types: [],
    hp:'',
    attack: '',
    defense: '',
    speed:'',
    height: '',
    weight: '',
  });

  function handleSubmit(e) {
    e.preventDefault(); 
    if (Object.keys(err).length || !input.name) return notificationWarning('Complete all fields please'); 

    dispatch(postPokemon(input));
    notificationSuccess('Pokemon created succesfully!!'); 
    setInput({
      name: '',
      image: handleNullImage,
      types: [],
      hp:'',
      attack: '',
      defense: '',
      speed:'',
      height: '',
      weight: '',
    })

    dispatch(getAllPokemon());
    setTimeout(() => {
      history('/home');
    },2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setErr(Validation({ 
      ...input, 
      [name]: value 
    }))
  };

  const handleTypes = (e) => {
    const selectedType = e.target.id;
    const updatedTypes = input.types.includes(selectedType)
    ? input.types.filter((type) => type !== selectedType)
    : [...input.types, selectedType];

    setInput((prevInput) => ({
      ...prevInput,
      types: updatedTypes,
    }));

    setErr((prevErr) => ({
      ...prevErr,
      types: updatedTypes.length === 0 ? 'Select a valid type' : '',
    }));
  };

  const handleChangeFile = (e) => {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function() {
      setInput({ ...input, image: reader.result.toString() });
    }
  };

  const updateInputs = () => {
    if(detail.length > 0) { 
      const { name, img, image, types, attack, defense, hp, speed, height, weight } = detail[0];
      setInput({
        name: name,
        image: img ? img : image,
        types: types.map(el => el.name),
        attack: attack,
        defense: defense,
        hp: hp,
        speed: speed,
        height: height,
        weight: weight,
      })
      detail.length = 0;
    }  
  };

  setTimeout(() => {
    if(id) updateInputs();
  }, "0010") 

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePokemon(id, input));
    notificationSuccess('Pokemon modified sucessfully!!')
    setInput({
      name: '',
      image: handleNullImage,
      types: [],
      hp:'',
      attack: '',
      defense: '',
      speed:'',
      height: '',
      weight: '',
    })

    dispatch(getAllPokemon());
    setTimeout(() => {
      history('/home');
    },2000)
  };

  return {
    input,
    setInput,
    err,
    handleSubmit,
    handleChange,
    handleUpdate,
    handleTypes,
    handleChangeFile,
  }
}
