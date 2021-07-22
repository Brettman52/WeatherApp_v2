import React, {useContext} from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import WeatherSelector from './WeatherSelector'
import WeatherContext from './weatherContext';
import Location from './Location'

const WeatherContainer = styled(Card)`
    && {
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 8rem;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-size: 30px;
    

    @media (min-width: 650px){
        margin-left: 50px;
        margin-right: 50px;
       
    }

    @media (min-width: 1000px){
        margin-left: 200px;
        margin-right: 200px;
        justify-content: space-around;
        height: 10rem;
       
        }
    }
`;

const NoWeatherMessage = styled.div `
    
`;

export default function CurrentCastErr() {

    const weatherContext = useContext(WeatherContext);
    return (
        <div>
            <Location/>
            <WeatherSelector/>
            <WeatherContainer>
                <NoWeatherMessage>No current weather data for {weatherContext.weather.location.name}...</NoWeatherMessage>
            </WeatherContainer>
        </div>
    )
}
