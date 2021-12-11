import React, { useState } from 'react';
import { useDispatch } from "react-redux"

const ExampleData = () => {
    const [btnClick, setBtnClick] = useState(false)
    const dispatch = useDispatch()

    return (
        <button className="btn btn-secondary w-100 mt-3"
            onClick={_ => {
                dispatch({
                    type: "exampleRouteMap",
                    payload: [
                        { route: "Москва, Люберцы", description: "Забрать товар", date: 1639150636064 },
                        { route: "Москва, Балашиха", description: "Навестить бабушку", date: 1639152713451 },
                        { route: "Москва, Мытищи", description: "Доставить товар, забрать деньги.", date: 1639152785893 }
                    ]
                })
                setBtnClick(true)
            }}>{btnClick ? "Сбросить к примеру" : "Показать пример"}</button>
    )
};

export default ExampleData;