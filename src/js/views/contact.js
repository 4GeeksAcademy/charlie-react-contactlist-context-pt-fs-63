import React from "react";
import { Context } from "../store/appContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


const Contact = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const params = useParams()
    const { username } = useParams()
    const [contactList, setContactList] = useState([])


    const handleDeleteAgenda = (slug) => {
        actions.deleteSlugAgenda(slug)
        actions.getAllAgendas()
        navigate("/")
    }

    const getAllContacts = (username) => {

    }

    //console.log(contactList)

    useEffect(() => {
        actions.getSlugAgenda(username)
        actions.getContacts(username)
    }, [])

    return (

        <div>
            {username}
            <button onClick={() => handleDeleteAgenda(username)} className="btn btn-danger">Delete Agenda</button>
            { }
        </div>
    )
}

export default Contact