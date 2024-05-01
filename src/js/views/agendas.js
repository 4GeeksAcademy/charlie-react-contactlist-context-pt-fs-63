import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Agendas = () => {
    const { store, actions } = useContext(Context)
    const [input, setInput] = useState("")
    const navigate = useNavigate()

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
        <div className="d-flex flex-column text-center mx-auto col-md-7 col-4 ">
            <h1 className="font-monospace fw-bold">Select or Create your Agenda</h1>
            {console.log(store.agendas)}
            <ul className="list-group list-group-horizontal flex-wrap text-center">
                {store.agendas?.map((el) => {
                    return (
                        <li className="list-group-item w-50 border-2" onClick={() => handleSelectSlug(el.slug)} key={el.id}>{el.slug}</li>
                    )
                })}
            </ul>
            <div className="col-7 mx-auto d-flex mt-5 gap-2">
                <input className="form-control" type="text" onKeyDown={handleEnter} onChange={e => setInput(e.target.value)} value={input}></input>
                <button className="btn btn-primary w-50" onClick={() => actions.createSlugAgenda(input)}>Create Agenda</button>
            </div>
        </div>
    )
}

export default Agendas