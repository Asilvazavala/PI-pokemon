import styles from './Input.module.css';

export const Input = ({ label, name, type, placeholder, handleChange, err, input }) => {
  return (
    <main>
      <section className={styles.input}>
        <label className={styles.label}>{label}</label>

        <input 
          type={type} 
          className={err || !input ? styles.invalidInput : styles.validInput} 
          value={input} 
          name={name}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
        />

        <article className={err || !input ? styles.invalidFeedback : styles.validFeedback}>
          {err || !input 
            ? <span>{err}</span> 
            : <span>Looks good!</span>}
        </article>
      </section>
    </main>
  )
}
