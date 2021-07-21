import React, {useEffect, useState} from 'react'
import {config} from './config'
import {STORAGE_KEY} from './App'
import WeatherContext from './weatherContext'

// export class LocalDataProvider extends Component {

//     static contextType = WeatherContext
//     state = {
//         searching: false,
//         error: null,
//         weather: null
//     }

//     formatQueryParams = params => {
//         const queryItems = Object
//             .keys(params)
//             .map((key) => `${key}=${params[key]}`);
//         return queryItems.join("&");
//     }

//     fetchWeather = async() => {
//         const search = this.props.search;

//         const params = {
//             q: search,
//             days: 3,
//             key: config.API_KEY
//         };

//         const url = encodeURI(config.API_ENDPOINT + "?" + this.formatQueryParams(params));
//         this.setState({searching: true})
//         const resp = await fetch(url, {method: "GET"})

//         if (resp.status === 400) {
//             this.setState({error: `No results found for "${this.props.search}"`, searching: false})
//             this
//                 .props
//                 .setInitOnError();
//         } else if (!resp.ok) {
//             this.setState({error: "Oops! Something went wrong. Please try again later.", searching: false})
//             this
//                 .props
//                 .setInitOnError();
//         } else {
//             this.setState({
//                 error: null,
//                 weather: await resp.json(),
//                 searching: false
//             })
//             localStorage.setItem(STORAGE_KEY, this.props.search)
//             this
//                 .props
//                 .onWeatherUpdate();
//         }
//     }

//     //fetchWeather used only when page is refreshed (in this instance)
//     componentDidMount() {
//         const init = this.props.init;
//         // const path = this.props.pathname;
//         const path = window.location.pathname;
//         // Did this because the app was getting stuck on the loading page when hitting
//         // refresh after data had been fetched App was getting stuck on loading page
//         // because upon reload, weather was cleared from context, thus triggering the
//         // conditional rendering of the <LoadingScreen> component in the App component
//         // for the loading page setTimeout implemented to prevent rapid flashing of
//         // <Loading> on inital fetch or fetch on refresh
//         if (!init && path === '/') 
//             return;
//         setTimeout(this.fetchWeather, 1000)
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if ((this.props.search && this.props.init) && (this.props.init !== prevProps.init)) {
//             this.fetchWeather();
//         }
//     }

//     render() {
//         // Created context value that includes onSearch method so that it can easily be
//         // accessed no matter where the <Search /> component is in the component tree
//         const contextValue = {
//             searching: this.state.searching,
//             error: this.state.error,
//             weather: this.state.weather,
//             onSearch: this.props.onSearch
//         }

//         return (
//             <WeatherContext.Provider value={contextValue}>
//                 {this.props.children}
//             </WeatherContext.Provider>
//         )
//     }
// }

export default function LocalDataProvider(props) {

    const [weatherStore, setWeatherStore] = useState({searching: false, error: null, weather: null});
    const {searching, error, weather} = weatherStore;
    const {setInitOnError, onWeatherUpdate, init, locSearch, path} = props;


    const formatQueryParams = params => {
        const queryItems = Object
            .keys(params)
            .map((key) => `${key}=${params[key]}`);
        return queryItems.join("&");
    }
    const fetchWeather = async() => {

        const params = {
            q: locSearch,
            days: 3,
            key: config.API_KEY
        };

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
            onWeatherUpdate();
        }
    }
    
    // fetchWeather used only when page is refreshed(in this instance)
    useEffect(() => {
        if (!init && path === '/') 
            return;
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(!init)
             return;
        fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init])

    const contextValue = {
        searching: searching,
        error: error,
        weather: weather,
        onSearch: props.onSearch
    }
    return (
        <WeatherContext.Provider value={contextValue}>
            {props.children}
        </WeatherContext.Provider>
    )
}
