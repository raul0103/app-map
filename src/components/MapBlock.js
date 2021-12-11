import React, { useState, useEffect } from "react"
import { YMaps, Map } from "react-yandex-maps"
import { useSelector } from "react-redux"

const MapBlock = () => {

    const [ymaps, setYmaps] = useState(null)
    const [myRef, setMyRef] = useState(null)
    const mapState = { center: [55.750625, 37.626], zoom: 7 }
    const routesYMap = useSelector(state => state.routesYMap)

    //При изменении массива с маршрутами, обновить карту
    useEffect(() => {
        if (!ymaps) return
        const multiRoute = new ymaps.multiRouter.MultiRoute(
            { referencePoints: routesYMap.map(route => route.route) },
            { boundsAutoApply: true }
        )
        //Очистили карту, затем добавили маршруты
        myRef.geoObjects.removeAll()
        myRef.geoObjects.add(multiRoute)
    }, [routesYMap, myRef, ymaps])

    return (
        <YMaps query={{ apikey: "" }}>
            <Map
                modules={["multiRouter.MultiRoute"]}
                state={mapState}
                onLoad={setYmaps}
                instanceRef={setMyRef}
                width={"100%"} height={500}
            />
        </YMaps>
    )
}


export default MapBlock
