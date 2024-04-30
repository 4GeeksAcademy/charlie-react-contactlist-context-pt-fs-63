import React from "react";

export const ModalDelete = (props) => {
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete {props.name}'s Agenda?</h1>
                        <button onClick={props.close} type="button" className="btn-close" ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this agenda? It might not be yours.
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={props.delete} type="button" className="btn btn-danger">Yes, Delete.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}