import React from "react";
import { Context } from "../store/appContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


const Contact = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { username } = useParams()

    const handleDeleteAgenda = (slug) => {
        actions.deleteSlugAgenda(slug)
        actions.getAllAgendas()
        navigate("/")
    }

    useEffect(() => {
        actions.getSlugAgenda(username)
        actions.getContacts(username)
    }, [])

    //console.log(store.contacts)
    return (

        <div>
            {username}
            <button onClick={() => handleDeleteAgenda(username)} className="btn btn-danger">Delete Agenda</button>
            <ul>
                {store.contacts?.map(el => (
                    <li key={el.id}>{el.name} {el.adress} {el.phone} {el.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Contact