export const Validation = (input) => {
  // Debe iniciar con mayúscula, puede llevar espacios
  const nameRegExp = /^[A-Z\s].*/
  // El valor debe estar entre 1 y 500
  const numRegExp = /^([1-9]|[0-9][0-9]|[1-4][0-9][0-9]|500)$/; 
  // El valor debe estar entre 1 y 100
  const valRegExp = /^([1-9]|[0-9][0-9]|100)$/; 
  
  // Url imagen
  const urlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/;
  // El año solo puede estar entre 1900 y 2023
  const yearRegExp = /^(19[0-9][0-9]|20[0-2][0-3])$/; 
  // Debe iniciar con mayúscula o número
  const stringRegExp = /^[A-Z0-9].*/; 
  // Solo 750$ o 1500$ o 3000$
  const volRegExp = /^(750|1500|3000)$/;
  // Solo precios entre 3,001,000$ y 10,000,100,000,900,000$
  const priceRegExp = /^([3-9][0-9]{2}|[1-9][0-9]{3}|[1-9][0-9]{4}|[1-8][0-9]{5}|9[0]{5})$/;
  // La URL debe ser http://www.example.subdomain?.com o https://www. o http:// o https://
  const bodegaRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.)?$/

  let err = {};

  // Validation Input Name
  if (!input.name) {
    err.name = 'Type a valid name';
  } else if (!nameRegExp.test(input.name)) {
    err.name = 'Name must start with capital letter';
    }

  // Validation Input Image
  if (!input.image.length) {
    err.image = 'Select a valid image';
  } 

  // Validation Input Types
  if (!input.types.length) {
    err.types = 'Select a valid type';
  } 

  // Validation Input attack 
  if (!input.attack) {
      err.attack = 'Type a valid number';
  } else if (!numRegExp.test(input.attack)) {
      err.attack = 'Value must be between 1-500';
    }
    
  // Validation Input defense 
  if (!input.defense) {
      err.defense = 'Type a valid number';
  } else if (!numRegExp.test(input.defense)) {
      err.defense = 'Value must be between 1-500';
    }
    
  // Validation Input hp 
  if (!input.hp) {
      err.hp = 'Type a valid number';
  } else if (!numRegExp.test(input.hp)) {
      err.hp = 'Value must be between 1-500';
    }

  // Validation Input speed 
  if (!input.speed) {
      err.speed = 'Type a valid number';
  } else if (!valRegExp.test(input.speed)) {
      err.speed = 'Value must be between 1-100';
    }

  // Validation Input weight 
  if (!input.weight) {
      err.weight = 'Type a valid number';
  } else if (!valRegExp.test(input.weight)) {
      err.weight = 'Value must be between 1-100';
    }

  // Validation Input height 
  if (!input.height) {
      err.height = 'Type a valid number';
  } else if (!valRegExp.test(input.height)) {
      err.height = 'Value must be between 1-100';
    }


  return err;
};