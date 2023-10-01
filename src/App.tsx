import React, { useEffect, useState } from 'react';
import './App.css';
import getWeatherData from "./RESTAPI/RESTAPI";
import * as XLSX from "xlsx";


export interface WeatherDataType {
    time: string [];
    apparent_temperature: number [];
}

interface ExlDataType {
    [key: string]: string | number;
}


function App() {

    const xlsxFile = 'weatherHasselt.xlsx'
    const [weather, setWeather] = useState<WeatherDataType | null>()
    const [weatherExl, setWeatherExl] = useState<ExlDataType[]>();
    useEffect(() => {
        const data = async () => {
            const getData = await getWeatherData()
            setWeather(getData)
        }
        data()
    }, [])
    setInterval(getWeatherData, 24 * 60 * 60 * 1000)

    const downloadExcel = (weatherExl: ExlDataType[]) => {
        const worksheet = XLSX.utils.json_to_sheet(weatherExl);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Weather");
        XLSX.writeFile(workbook, xlsxFile);
    }
    useEffect(() => {
        if (weather?.time) {
            let result: ExlDataType = {}
            for (let i = 12; i < weather.time.length; i += 24) {
                const time = weather.time[i].slice(0, 10)
                const temperature = weather.apparent_temperature[i]
                result[time] = temperature + ' °C'
            }
            setWeatherExl([result])
        }
    }, [weather])

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => weatherExl ? downloadExcel(weatherExl) : ''}>
                    Download Hasselt Weather
                </button>
            </header>
        </div>
    );
}

export default App;
