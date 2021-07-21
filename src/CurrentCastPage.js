import React, {useContext} from 'react'
import CurrentCast from './CurrentCast'
import Search from './Search'
import WeatherContext from './weatherContext'

// export default class CurrentCastPage extends Component {

//     render() {
//         return (
//             <div>
//                 <Search/>
//                 <CurrentCast/>
//             </div>
//         )
//     }
// }

export default function CurrentCastPage() {
    const weatherContext = useContext(WeatherContext)
    return (
        <div>
            <Search/>
            <CurrentCast/>
        </div>
    )
}
