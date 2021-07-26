import React, {useEffect, useState} from 'react'
import {config} from './config'
import {STORAGE_KEY} from './App'
import WeatherContext from './weatherContext'

export default function LocalDataProvider(props) {

    console.log("from LDP props " + props.locSearch)

    const [weatherStore, setWeatherStore] = useState({searching: false, error: null, weather: null});
    const {searching, error, weather} = weatherStore;
    const {setInitOnError, onWeatherUpdate, init, locSearch, path,onSearch} = props;

    const params = {
        q: locSearch,
        days: 3,
        key: config.API_KEY
    };

    const formatQueryParams = params => {
        const queryItems = Object
            .keys(params)
            .map((key) => `${key}=${params[key]}`);
        return queryItems.join("&");
    }
    const fetchWeather = async() => {

        if (locSearch === "" || locSearch === " ") {
            setWeatherStore({error: "Enter a search to continue..."});
            setInitOnError();
            return;
        }

        console.log("from params " + params.q)

        const url = encodeURI(config.API_ENDPOINT + "?" + formatQueryParams(params));
        setWeatherStore({searching: true})
        const resp = await fetch(url, {method: "GET"})

        if (resp.status === 400) {
            setWeatherStore({error: `No results found for "${locSearch}"`, searching: false})
            setInitOnError();
        } else if (!resp.ok) {
            setWeatherStore({error: "Oops! Something went wrong. Please try again later.", searching: false})
            setInitOnError();
        } else {
            setWeatherStore({
                error: null,
                weather: await resp.json(),
                searching: false
            })
            localStorage.setItem(STORAGE_KEY, locSearch)
            console.log("Right after it's set in LDP " + localStorage.search)
            onWeatherUpdate();
        }
    }

    // fetchWeather used only when page is refreshed on any page other than the
    // homepage (in this instance)
    useEffect(() => {
        if (!init && path === '/') 
            return;
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // fetch weather when the go button is pressed
    useEffect(() => {
        if (!init) 
            return;
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init])

    const contextValue = {
        searching: searching,
        error: error,
        weather: weather,
        onSearch: onSearch
    }

    
    return (
        <WeatherContext.Provider value={contextValue}>
            {props.children}
        </WeatherContext.Provider>
    )
}
