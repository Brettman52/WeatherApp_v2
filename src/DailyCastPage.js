import React from 'react'
import DailyCast from './DailyCast'
import Search from './Search'

// export default class DailyCastPage extends Component {
//     render() {
//         return (
//             <div>
//                 <Search/>
//                 <DailyCast/>
//             </div>
//         )
//     }
// }

export default function DailyCastPage() {
    return (
        <div>
            <Search/>
            <DailyCast/>
        </div>
    )
}
