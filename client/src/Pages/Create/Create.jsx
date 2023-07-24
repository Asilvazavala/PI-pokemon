import { useEffect } from 'react';
import styles from './Create.module.css';
import { useFunctions } from '../../hooks/useFunctions';
import { useCreateForm } from '../../hooks/useCreateForm';
import { resetPokemon, getAllTypes, getPokemonDetail } from '../../redux/actions';
import { NavBar } from '../../components/NavBar/NavBar';
import { Input } from '../../components/Form/Input';

export const Create = () => {
  const { dispatch, useSelector, id } = useFunctions();
  const { 
    input,
    err,
    handleChange,
    handleSubmit,
    handleTypes,
    handleChangeFile,
    handleUpdate
   } = useCreateForm();

  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    if (id) { 
      dispatch(getPokemonDetail(id)) 
    }
    dispatch(getAllTypes());
  },[id])
  
  return (
    <main className={styles.mainContainer}>
      <NavBar />
      <form className={styles.form}>
        <h2 className={styles.title}>Create your Pokemon</h2>
        <Input type='text' placeholder='(max. 30 characters)' label='Name' name='name' handleChange={handleChange} err={err.name} input={input.name} />
        <article className={styles.twoInputs}>
          <Input type='number' placeholder='(between 1-500)' label='Attack' name='attack' handleChange={handleChange} err={err.attack} input={input.attack} />
          <Input type='number' placeholder='(between 1-500)' label='Defense' name='defense' handleChange={handleChange} err={err.defense} input={input.defense} />
        </article>
        <article className={styles.twoInputs}>
          <Input type='number' placeholder='(between 1-500)' label='Hp' name='hp' handleChange={handleChange} err={err.hp} input={input.hp} />
          <Input type='number' placeholder='(between 1-100)' label='Speed' name='speed' handleChange={handleChange} err={err.speed} input={input.speed} />
        </article>
        <article className={styles.twoInputs}>
          <Input type='number' placeholder='(between 1-100)' label='Height' name='height' handleChange={handleChange} err={err.height} input={input.height} />
          <Input type='number' placeholder='(between 1-100)' label='Weight' name='weight' handleChange={handleChange} err={err.weight} input={input.weight} />
        </article>

        {/* Input types */}
        <section className={styles.inputTypes}>
          <label className={styles.label}>Types (max. 2, at least 1)</label>
          <article className={styles.allTypes}>
            {allTypes.map(el => {
              const isSelected = input.types.includes(el.name);
              const maxSelected = input.types.length >= 2;

              const spanStyle = {
                backgroundColor: isSelected ? '#300b12' : 'transparent',
                color: isSelected ? '#ff607d' : 'rgb(225, 225, 225)',
                outline: isSelected ? '.1rem solid #ff607d' : '.1rem solid rgb(225, 225, 225)',
                cursor: maxSelected && !isSelected ? 'not-allowed' : 'pointer',
              };

              return (
                <span
                  key={el.id}
                  name='types'
                  id={el.name}
                  onClick={maxSelected && !isSelected ? null : (e) => handleTypes(e)}
                  style={spanStyle}
                >
                  {el.name}
                </span>
              )
            })}
          </article>
          <div className={err.types || input.types.length === 0 ? styles.invalidFeedback : styles.validFeedback}>
          {err.types || input.types.length === 0
            ? <span>{err.types}</span> 
            : <span>Looks good!</span>}
          </div>
        </section>

        {/* Input image */}
        <section className={styles.inputImage}>
          <label className={styles.label}>Image (optional)</label>
          <label htmlFor="fileInput" className={styles.imageForm}>
            <span>Choose image</span>
          </label>
          <input 
            type="file" 
            id="fileInput"
            className={styles.fileInputImage} 
            accept="image/png, image/jpeg"
            name='image'
            onChange={(e) => handleChangeFile(e)}
          />
          <div>
            {input.image.includes('handleNullImage')
              ? <div>
                  <img src={input.image} alt={input?.name} />
                  <p>Default image</p>
                </div>
              : <img src={input.image} alt={input?.name} />
            }
          </div>
        </section>

        <section>
          <button 
            className={styles.buttonCreate} 
            type="button"
            onClick={id ? (e) => handleUpdate(e) : (e) => handleSubmit(e)}
          >{id ? 'Update Pokemon' : 'Create Pokemon'}
          </button>
        </section>

      </form>
    </main>
  )
}
