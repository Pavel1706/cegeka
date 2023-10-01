import axios from "axios";

interface ResponseType {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        apparent_temperature: string;
    };
    data: {
        hourly: {
            time: string[];
            apparent_temperature: number[];
        }
    };
}


const getWeatherData = async () => {
    const days = 30
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const endDate = new Date().toISOString().slice(0, 10);
    try {
        const response: ResponseType = await axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=50.9311&longitude=5.3378&hourly=apparent_temperature&start_date=${startDate}&end_date=${endDate}`)
        return response.data.hourly
    } catch (err) {
        console.error(err)
        return null
    }
};

export default getWeatherData;
