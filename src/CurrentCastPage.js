import React, {useContext} from 'react'
import CurrentCast from './CurrentCast'
import CurrentCastErr from './CurrentCastErr';
import Search from './Search'
import WeatherContext from './weatherContext'

export default function CurrentCastPage() {
    const weatherContext = useContext(WeatherContext);
    return (
        <div>
            <Search/>
            {weatherContext.weather.current && <CurrentCast/>}
            {!weatherContext.weather.current && <CurrentCastErr/>}
        </div>
    )
}
