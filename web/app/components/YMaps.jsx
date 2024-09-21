"use client"

import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";


function MapSection() {
    return (
        <YMaps query={{ apikey: 'c14ac96f-199f-4ba5-81ac-88db2283187b'}}>
            <Map
                defaultState={{ center: [56.871663, 53.176700], zoom: 16 }}
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <Placemark geometry={[56.871663, 53.176700]} />
            </Map>
        </YMaps>
    );
}

export default MapSection;