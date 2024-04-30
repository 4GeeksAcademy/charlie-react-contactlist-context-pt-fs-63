import React from "react";
import { Context } from "../store/appContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ModalDelete } from "../component/modalDelete";
import { ModalCreate } from "../component/modalCreate";


const Contact = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { username } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const handleDeleteAgenda = async (slug) => {
        await actions.deleteSlugAgenda(slug)
        navigate("/")
        actions.getAllAgendas()
    }


    useEffect(() => {
        actions.getSlugAgenda(username)
        actions.getContacts(username)
    }, [])

    const handleSubmit = async (e, data) => {
        e.preventDefault()
        await actions.createContact(username, data)
        closeModal()
    };
    console.log(store.contacts)

    return (
        //CLOSEMODAL IS NOT DEFINED
        <div>
            {isOpen && <div>
                <ModalDelete name={username} close={() => setIsOpen(false)} delete={() => handleDeleteAgenda(username)} />
            </div>}
            {username}
            <button onClick={() => setIsOpen(true)} className="btn btn-danger">Delete Agenda</button>
            <ul>
                {store.contacts?.map(el => (
                    <li key={el.id}>{el.name} {el.phone} {el.email} {el.address}</li>
                ))}
            </ul>
            {isOpenCreate && <div>
                <ModalCreate handleSubmit={handleSubmit} slug={username} closeModal={() => setIsOpenCreate(false)} close={() => setIsOpenCreate(false)} />
            </div>}
            <button onClick={() => setIsOpenCreate(true)} className="btn btn-primary">Create Contact</button>
        </div>
    )
}

export default Contact