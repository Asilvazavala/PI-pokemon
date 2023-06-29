import styles from './Modal.module.css';

export const Modal = ({ handleDelete, pokemonDetail }) => {
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button> */}

      {/* <!-- Modal --> */}
      <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This action <strong>DELETE</strong> the Pokemon "<strong>{pokemonDetail[0]?.name}</strong>"
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Sure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
