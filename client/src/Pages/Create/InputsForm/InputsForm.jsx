import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './InputsForm.module.css';

import { getAllTypes } from '../../../redux/actions';
import { CreateForm } from '../CreateForm/CreateForm';
import { UpdateForm } from '../UpdateForm/UpdateForm';
import { Validation } from '../../../Helpers/Validation';

export const InputsForm = ({ input, setInput, err, setErr }) => {
  // Para ejecutar las funciones de las actions
  const dispatch = useDispatch()

  // Me traigo los estados del reducer
  const allTypes = useSelector((state) => state.types);

  // Ejecuto en automático la action para cargar los tipos para el input 
  useEffect(() => {
    dispatch(getAllTypes())
  }, [dispatch]);

  // Actualizar el estado del input al escribir y actualizar el estado de error 
  const handleChange = (e) => {
    setInput({
        ...input, [e.target.name] : e.target.value
    })

    setErr(Validation({
        ...input, [e.target.name]: e.target.value
    }))
  };

  // Actualizar el estado de tipos de Pokemon
  const handleTypes = (e) => {
    setInput({
      ...input, types: [...input.types, e.target.value]
    })
  };

  // Importar archivos/imágenes desde el PC
  const handleChangeFile = (e) => {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function() {
      setInput({
        ...input, image: reader.result.toString()
      });
    }
  };

  // Eliminar el types seleccionado
  const handleDeleteTypes = (type) => {
    setInput({
      ...input,
      types: input.types.filter(el => el !== type)
    })
  };

  // Deshabilitar botón "Create Pokemon" si hay algún error
  const disabled = Object.keys(err).length  

  return (
    <div>
      <div className={styles.containerForm}>
        <form className="row g-3 d-flex">
          <h2 className={styles.titleCreate}>Create your own Pokemon!</h2>

          {/* Input name */}
          <div className="col-md-4">
            <label className="form-label">Name:</label>
            <input 
              type="text" 
              className={err.name || !input.name ? "form-control is-invalid" : "form-control is-valid"} 
              value={input.name} 
              name='name'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input name */}
            <div className={err.name || !input.name ? "invalid-feedback" : "valid-feedback"}>
              {err.name || !input.name ? <span> {err.name}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input image */}
          <div className="col-md-4">
            <label className="form-label">Image:</label>
            <input 
              type="file" 
              className={!input.image.length ? "form-control is-invalid" : "form-control is-valid"} 
              name='image'
              onChange={(e) => handleChangeFile(e)}
            />
            {/* Validación input image */}
            <div className={!input.image.length ? "invalid-feedback" : "valid-feedback"}>
              {!input.image.length ? <span> {err.image}</span> : <img src={input.image} width='100' height='100' alt='not found' />}
            </div>
          </div>

          {/* Input types */}
          <div className="col-md-4">
            <label className="form-label">Type(s)</label>
            <select 
              className={!input.types.length ? "form-control is-invalid" : "form-control is-valid"}  
              onChange={(e) => handleTypes(e)}  
              name='types'
            >
            {/* Añadir todos los types al input*/}
            {allTypes.map(el => {
              return (
              <option key={el.id}>{el.name}</option>
              )
            })}
            </select>
            
            {/* Validación input types */}
            <div className={err.types || !input.types.length ? "invalid-feedback" : "valid-feedback"}>
              {!input.types.length ? <span> {err.types}</span> : ''}
            </div>

            {/* Mostrar los types seleccionados */}
            { input.types.map(el => 
              <ul className='' key={el}>
                <li>
                  <p value={input.types}>{el}
                    <button 
                    className={styles.buttonX}
                    type='button'
                    onClick={() => handleDeleteTypes(el)}>x
                    </button>
                  </p>
                </li>
              </ul>
              )
            }
          </div>

          {/* Input attack */}
          <div className="col-md-4">
            <label className="form-label">Attack:</label>
            <input 
              type="number" 
              className={err.attack || !input.attack ? "form-control is-invalid" : "form-control is-valid"} 
              value={input.attack} 
              name='attack'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input attack */}
            <div className={err.attack || !input.attack ? "invalid-feedback" : "valid-feedback"}>
              {err.attack || !input.attack ? <span> {err.attack}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input defense */}
          <div className="col-md-4">
            <label className="form-label">Defense:</label>
            <input 
              type="number" 
              className={err.defense || !input.defense ? "form-control is-invalid" : "form-control is-valid"}  
              value={input.defense} 
              name='defense'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input defense */}
            <div className={err.defense || !input.defense ? "invalid-feedback" : "valid-feedback"}>
              {err.defense || !input.defense ? <span> {err.defense}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input hp */}
          <div className="col-md-4">
            <label className="form-label">Hp:</label>
            <input 
              type="number" 
              className={err.hp || !input.hp ? "form-control is-invalid" : "form-control is-valid"}  
              value={input.hp}
              name='hp'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input hp */}
            <div className={err.hp || !input.hp ? "invalid-feedback" : "valid-feedback"}>
              {err.hp || !input.hp ? <span> {err.hp}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input speed */}
          <div className="col-md-4">
            <label className="form-label">Speed:</label>
            <input 
              type="number" 
              className={err.speed || !input.speed ? "form-control is-invalid" : "form-control is-valid"} 
              value={input.speed}
              name='speed'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input speed */}
            <div className={err.speed || !input.speed ? "invalid-feedback" : "valid-feedback"}>
              {err.speed || !input.speed ? <span> {err.speed}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input height */}
          <div className="col-md-4">
            <label className="form-label">Height:</label>
            <input 
              type="number" 
              className={err.height || !input.height ? "form-control is-invalid" : "form-control is-valid"} 
              value={input.height}
              name='height'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input height */}
            <div className={err.height || !input.height ? "invalid-feedback" : "valid-feedback"}>
              {err.height || !input.height ? <span> {err.height}</span> : 'Looks good!'}
            </div>
          </div>

          {/* Input weight */}
          <div className="col-md-4">
            <label className="form-label">Weight:</label>
            <input 
              type="number" 
              className={err.weight || !input.weight ? "form-control is-invalid" : "form-control is-valid"} 
              value={input.weight} 
              name='weight'
              onChange={(e) => handleChange(e)}
            />
            {/* Validación input weight */}
            <div className={err.weight || !input.weight ? "invalid-feedback" : "valid-feedback"}>
              {err.weight || !input.weight ? <span> {err.weight}</span> : 'Looks good!'}
            </div>
          </div>

          <div className="col-12">
            <CreateForm input={input} setInput={setInput} disabled={disabled} />
            <UpdateForm input={input} setInput={setInput} disabled={disabled} />
          </div>

        </form>
      </div>
    </div>
  )
}
