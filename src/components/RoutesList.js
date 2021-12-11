import React, { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getDateRoute, btnDelete } from "../lib/funcs"
import isDblTouchTap from "../lib/isDblTouchTap"
import { errList } from "../lib/errors.js"

const RoutesList = () => {
    const dragOverElem = useRef(null)
    const ulElem = useRef(null)
    const [activeElem, setActiveElem] = useState()
    const routesYMap = useSelector(state => state.routesYMap)
    const dispatch = useDispatch()

    const dragOver = e => {
        //Убирает при перемещении курсор ошибки
        e.preventDefault()
        if (dragOverElem.current === e.target) return
        setActiveElem(e.target)
        dragOverElem.current = e.target
        btnDelete.point_none()
    }

    //По двойному клику на мобильном устройстве выделить активный элемент 
    const ddTouch = e => {
        if (isDblTouchTap(e) && activeElem !== e.target) {
            setActiveElem(prev => {
                prev?.classList.remove('touch-active')
                if (!activeElem) e.target.classList.add('touch-active')
                return e.target
            })
            if (activeElem) swapListRoutes(e)
        }
    }

    const swapListRoutes = e => {
        //Создаем временный элемент
        let li = document.createElement("li")
        //Устанавливаем временный элемент перед перетаскиваемым
        ulElem.current.insertBefore(li, e.target)
        //Заменяем
        activeElem.replaceWith(e.target)
        li.replaceWith(activeElem)
        //Обрабатываем новое положение списка
        const nodes = Array.prototype.slice.call(ulElem.current.children)
        const newPositionList = nodes.map(child => child.getAttribute("data-position"))
        //Меняем массив списка
        dispatch({
            type: "swapRouteMap",
            payload: newPositionList.map(position => routesYMap[position])
        })
        setActiveElem(null)
        btnDelete.point_all()
    }

    const deleteRoute = index => {
        dispatch({
            type: "deleteRouteMap",
            payload: index
        })
    }

    if (!routesYMap.length) return errList
    return (
        <ul className="list-group routes-list" ref={ulElem}>
            {routesYMap.map((route, i) => {
                let dateRoute = getDateRoute(new Date(route.date))

                return (
                    <li
                        data-position={i}
                        key={route.date}
                        className="list-group-item list-group-item-action"
                        onTouchStart={ddTouch}
                        onDragEnd={swapListRoutes}
                        onDragOver={dragOver}
                        draggable="true" >
                        <div className="d-flex w-100 justify-content-between">
                            <div> <span>Адрес:</span><h5 className="mb-1">{route.route}</h5></div>
                            <small className="badge bg-primary">{dateRoute.dd + "." + dateRoute.mm + "." + dateRoute.yy + " " + dateRoute.hh + ":" + dateRoute.minutes}</small>
                        </div>
                        {route.description ? <p className="mb-1"><span>Описание: </span>{route.description}</p> : <></>}
                        <button onClick={_ => deleteRoute(i)} className="btn-delete-route btn btn-danger w-100">Удалить</button>
                    </li>
                )
            })}
        </ul >
    )
}

export default RoutesList