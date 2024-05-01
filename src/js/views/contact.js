import React from "react";
import { Context } from "../store/appContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ModalDelete } from "../component/modalDelete";
import { ModalDeleteContact } from "../component/modalDeleteContact";
import { ModalCreate } from "../component/modalCreate";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


const Contact = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { username } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenDeleteContact, setIsOpenDeleteContact] = useState(false)
    const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false)
    const [editingValues, setEditingValues] = useState(undefined)

    useEffect(() => {
        actions.getSlugAgenda(username)
        actions.getContacts(username)
    }, [])

    const handleDeleteAgenda = async (slug) => {
        await actions.deleteSlugAgenda(slug)
        navigate("/")
        actions.getAllAgendas()
    }

    const handleSubmit = async (e, data) => {
        e.preventDefault()
        if (!isCurrentlyEditing) {
            await actions.createContact(username, data)
        } else {
            await actions.updateContact(username, data)
        }
        setIsOpenCreate(false)

    };
    //console.log(store.contacts)
    const handleCreateContact = () => {
        setEditingValues(undefined)
        setIsOpenCreate(true)
    }

    const handleDeleteContact = (username, id) => {
        actions.deleteContact(username, id)
        setIsOpenDeleteContact(false)
    }

    const handleUpdateContact = (_username, el) => {
        setEditingValues({
            name: el.name,
            email: el.email,
            phone: el.phone,
            address: el.address
        })
        setIsOpenCreate(true)
    }

    console.log(isOpenDeleteContact)
    console.log(store.contacts)
    return (
        <div className="container mb-5 col-md-6">
            {isOpen && <div>
                <ModalDelete name={username} close={() => setIsOpen(false)} delete={() => handleDeleteAgenda(username)} />
            </div>}
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="ms-1 mb-0">{username}'s Contacts</h3>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <button onClick={() => handleCreateContact()} className="btn btn-primary">Create Contact</button>
                    <button onClick={() => setIsOpen(true)} className="btn btn-danger">Delete Agenda</button>
                </div>
            </div>
            <ul className="list-group">
                {store.contacts?.map(el => (
                    <li className="container list-group-item d-flex gap-3 align-items-center" key={el.id}>
                        <img className="rounded-circle w-25 img-fluid" src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"></img>
                        <div className="d-flex flex-column flex-fill mb-3">
                            <p className="m-0 pb-1 fs-4 fw-bold">{el.name}</p>
                            <p className="m-0 text-secondary fs-5"><IoLocationSharp /> {el.address}</p>
                            <p className="m-0 text-secondary"><FaPhone /> {el.phone}</p>
                            <p className="m-0 text-secondary"> <IoMdMail /> {el.email}</p>
                        </div>
                        
                        <div className="float-end justify-self-end d-flex flex-column gap-2">
                            <button onClick={() => { handleUpdateContact(username, el) }} className="btn contact-buttons pb-2"><BsFillPencilFill /></button>
                            <button onClick={() => setIsOpenDeleteContact(true)} className="btn contact-buttons pb-2"><BsFillTrash3Fill /></button>
                            {isOpenDeleteContact && <div>
                                <ModalDeleteContact closeDeleteContact={() => setIsOpenDeleteContact(false)} deleteContact={() => handleDeleteContact(username, el.id)} />
                            </div>}
                        {/* MODAL DOES NOT DELETE DESIRED ITEM */}
                        </div>

                    </li>
                ))}
            </ul>
            {isOpenCreate && <div>
                <ModalCreate values={editingValues} handleSubmit={handleSubmit} slug={username} closeModal={() => setIsOpenCreate(false)} close={() => setIsOpenCreate(false)} />
            </div>}
        </div>
    )
}

export default Contact