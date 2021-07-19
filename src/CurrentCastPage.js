import React from 'react'
import CurrentCast from './CurrentCast'
import Search from './Search'

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
    return (
        <div>
            <Search/>
            <CurrentCast/>
        </div>
    )
}
