"use client";

import { createContext, useContext } from 'react';
import { YMaps, Map as YandexMap } from '@pbe/react-yandex-maps';

const mapContext = createContext(null);

const MyMap = () => {
    const state = useContext(mapContext);

    return (
        <YMaps>
            <div>
                My awesome application with maps!
                <YandexMap defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </div>
        </YMaps>
    );
};

export default MyMap;