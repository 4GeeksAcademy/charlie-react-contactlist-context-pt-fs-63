import React, { useState } from "react";
import { Link } from "react-router-dom";


export const ModalCreate = (props) => {

    const [inputBody, setInputBody] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setInputBody(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="modal" tabIndex="-2">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add a New Contact</h1>
                        <button onClick={props.closeModal} type="button" className="btn-close" ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => props.handleSubmit(e, inputBody)}>
                            <div className="mb-2">
                                <label className="form-label">Full Name</label>
                                <input name="name" value={inputBody.name} onChange={handleChange} type="text" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input name="email" value={inputBody.email} onChange={handleChange} type="email" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Phone</label>
                                <input name="phone" value={inputBody.phone} onChange={handleChange} type="tel" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Address</label>
                                <input name="address" value={inputBody.address} onChange={handleChange} type="text" className="form-control"></input>
                            </div>
                            <button type="submit" className="btn btn-secondary">Save</button>
                        </form>
                    </div>
                    <Link to={"/"}>Or get back to contacts</Link>
                </div>
            </div>
        </div>
    )
}