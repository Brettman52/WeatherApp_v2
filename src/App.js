import React, {useState} from 'react'
import background from './background.jpg'
import styled from 'styled-components'
import {Route, Switch, useHistory} from 'react-router-dom'
import Homepage from './Homepage'
import CurrentCastPage from './CurrentCastPage'
import DailyCastPage from './DailyCastPage'
import Header from './Header'
import LocalDataProvider from './LocalDataProvider'
import WeatherContext from './weatherContext'
import LoadingScreen from './LoadingScreen'
import Error from './Error'

const Wrap = styled.div `
  background-image: url(${background});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  min-width: 250px;
`

export const STORAGE_KEY = 'search';

export default function App() {

    let history = useHistory();

    const [dataHold,
        setDataHold] = useState({init: false})

    const [searchData,
        setSearchData] = useState({
        search: localStorage.getItem(STORAGE_KEY)
    })

    const {init} = dataHold;
    const {search} = searchData;

    const onSearch = value => {
        setDataHold({init: true})
        setSearchData({search: value})
    }

    const setInitOnError = () => {
        setDataHold({init: false})
    }

    // If go button has been pressed, go to /current page Otherwise (if the page is
    // being refreshed), stay on the currently displayed page
    const onWeatherUpdate = () => {
        if (init === true) {
            history.push('/current')
        }
        setDataHold({init: false})
    }

    return (
        <Wrap>
            <Header/>
            <LocalDataProvider
                locSearch={search}
                setInitOnError={setInitOnError}
                init={init}
                onWeatherUpdate={onWeatherUpdate}
                onSearch={onSearch}
                path={history.location.pathname}>
                <WeatherContext.Consumer>
                    {({weather, error}) => (
                        <Switch>
                            {error && (<Error error={error}/>)}
                            <Route exact path="/" render={() => <Homepage onSearch={onSearch}/>}/> {weather && (
                                <Switch>
                                    <Route path="/current" component={CurrentCastPage}/>
                                    <Route path="/daily" component={DailyCastPage}/>
                                </Switch>
                            )}
                            {!weather && (<LoadingScreen/>)}
                        </Switch>
                    )}
                </WeatherContext.Consumer>
            </LocalDataProvider>
        </Wrap>
    )
}