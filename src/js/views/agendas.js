import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Agendas = () => {
    const { store, actions } = useContext(Context)
    const [input, setInput] = useState("")
    const navigate = useNavigate()

    //create a handleOnKeyDown that also call to getAllAgendas

    //console.log(allAgendas)

    const handleEnter = (evt) => {
        if (evt.key === "Enter") {
            actions.createSlugAgenda(input)
            setInput("")
        }
    }

    const handleSelectSlug = async (username) => {
        const slugJson = await actions.getSlugAgenda(username);
        navigate(`/contact/${slugJson.slug}`)
    }


    return (
        <div>
            Todas las agendas
            {console.log(store.agendas)}
            <ul>
                {store.agendas?.map((el) => {
                    return (
                        <li onClick={() => handleSelectSlug(el.slug)} key={el.id}>{el.slug}</li>
                    )
                })}
            </ul>
            <input type="text" onKeyDown={handleEnter} onChange={e => setInput(e.target.value)} value={input}></input>
            <button onClick={() => actions.createSlugAgenda(input)}>Create User</button>
        </div>
    )
}

export default Agendas