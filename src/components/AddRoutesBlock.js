import React, { useState } from "react"
import { useDispatch } from "react-redux"

const AddRoutesBlock = () => {
    const [newRoute, setNewRoute] = useState({ route: "", description: "", date: "" })
    const dispatch = useDispatch()

    const inputChange = e => setNewRoute({ ...newRoute, [e.target.name]: e.target.value, date: Date.now() })
    const addRoute = e => {
        e.preventDefault()
        //Меняем массив списка
        dispatch({
            type: "addRouteMap",
            payload: newRoute
        })
        //Очистили inputs
        setNewRoute({ route: "", description: "" })
    }

    return (
        <form onSubmit={addRoute}>
            <div className="form-floating mb-1 mt-1">
                <input className="form-control" id="floatingInput" type="text" name="route" placeholder="Маршрут" onChange={inputChange} value={newRoute.route} />
                <label htmlFor="floatingInput">Маршрут</label>
            </div>
            <div className="form-floating mb-1 mt-1">
                <input className="form-control" id="floatingDescription" type="text" name="description" placeholder="Описание" onChange={inputChange} value={newRoute.description} />
                <label htmlFor="floatingDescription">Описание</label>
            </div>
            <button className="btn btn-primary mb-3 w-100" disabled={!newRoute.route ? true : false}>Добавить</button>
        </form>
    )
}

export default AddRoutesBlock