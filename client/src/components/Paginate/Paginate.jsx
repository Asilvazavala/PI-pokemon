import React, {useState} from 'react';
import styles from './Paginate.module.css';
import { usePaginate } from '../../hooks/usePaginate';

export const Paginate = () => {
  const { allPokemon, currentPage, setCurrentPage, pokemonPerPage, currentPokemon } = usePaginate();
  // Agregar el número de páginas de acuerdo a los pokemon que hay en la DB
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(allPokemon.length/pokemonPerPage); i++) {
    pageNumber.push(i)
  }

  // Cambiar la página actual
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className={currentPokemon.length > 0 ? styles.containerPaginate : styles.hidePaginate}>
      <nav className="d-flex justify-content-center" aria-label="...">
        <ul className="pagination flex-wrap  mt-4">

          {/* Botón Previous */}
          <li className= {currentPage  === 1 ? "page-item disabled" : "page-item"}>
            <button className="page-link" onClick={() => paginado(currentPage - 1)} >Previous</button>
          </li> 

          {/* Numeración del paginado */}
          {
            pageNumber &&  
            pageNumber.map(el => {
              return (
                <li 
                  key={el} 
                  className= {currentPage  === el ? "page-item active" : "page-item"}> 
                  <button 
                    onClick={() => paginado(el)} 
                    className = "page-link"
                    aria-current="page"
                  >{el}
                  </button>
                </li>
              )
            })  
          }

          {/* Botón Next */}
          <li className= {allPokemon.length < 12 || currentPage  === 4 ? "page-item disabled" : "page-item"}>
            <button className="page-link" onClick={() => paginado(currentPage + 1)} >Next</button>
          </li>

        </ul>
      </nav>
    </div>
  )
}