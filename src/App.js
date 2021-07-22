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

// class App extends Component {

//     state = {
//         search: localStorage.getItem(STORAGE_KEY),
//         init: false
//     }

//     onSearch = value => {
//         this.setState({search: value, init: true})
//     }

//     setInitOnError = () => {
//         this.setState({init: false})
//     }

//     // If go button has been pressed, go to /current page Otherwise (if the page is
//     // being refreshed), stay on the currently displayed page
//     onWeatherUpdate = () => {
//         if (this.state.init === true) {
//             this
//                 .props
//                 .history
//                 .push('/current')
//         } else {
//             this
//                 .props
//                 .history
//                 .push(this.props.location.pathname)
//         }
//         this.setState({init: false})
//     }

//     render() {
//         return (
//             <Wrap>
//                 <Header/>
//                 <LocalDataProvider
//                     locSearch={this.state.search}
//                     setInitOnError={this.setInitOnError}
//                     init={this.state.init}
//                     onWeatherUpdate={this.onWeatherUpdate}
//                     onSearch={this.onSearch}
//                     path={this.props.location.pathname}>
//                     <WeatherContext.Consumer>
//                         {({weather, error}) => (
//                             <Switch>
//                                 {error && (<Error error={error}/>)}
//                                 <Route exact path="/" render={() => <Homepage onSearch={this.onSearch}/>}/> {weather && (
//                                     <Switch>
//                                         <Route path="/current" component={CurrentCastPage}/>
//                                         <Route path="/daily" component={DailyCastPage}/>
//                                     </Switch>
//                                 )}
//                                 {!weather && (<LoadingScreen/>)}
//                             </Switch>
//                         )}
//                     </WeatherContext.Consumer>
//                 </LocalDataProvider>
//             </Wrap>
//         )
//     }
// }

// export default withRouter(App)


    export default function App() {
    
    let history = useHistory();
 
    const [dataHold, setDataHold] = useState({
        search: localStorage.getItem(STORAGE_KEY),
        init: false
    })

    // const [searchData, setSearchData] = useState({search: localStorage.getItem(STORAGE_KEY)})

    const {search, init} = dataHold;
    console.log("from app state " + search)
    console.log("from app in localStorage " + localStorage.getItem(STORAGE_KEY))
   
    const onSearch = value => {
        setDataHold({search: value, init: true})
    }

    // const onSearch = value => {
    //     setDataHold({init: true})
    //     setSearchData({search: value})
    // }

    const setInitOnError = () => {
        setDataHold({init: false})
    }

    // If go button has been pressed, go to /current page Otherwise (if the page is
    // being refreshed), stay on the currently displayed page
    const onWeatherUpdate = () => {
        if (init === true) {
                history
                .push('/current')
        } else {
            
                history
                .push(window.location.pathname)
        }
        setDataHold({init: false})
    }
    return (
        <Wrap>
            <Header/>
            <LocalDataProvider
                locSearch={search}
                // locSearch={searchData.search}
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