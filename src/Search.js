import React, {useContext} from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import WeatherContext from './weatherContext'

const CityForm = styled.form `
    text-align: center;
    margin-top: 28px;
`;

const CityInput = styled.input `
    border-radius: 5px;
    opacity: .7;
    margin-top: 10px;
    font-size: 18px;
`;

const SubmitButton = styled(Button)`
&& {
    height: 23px;
    background-color: ghostwhite;
    opacity: .8;
    margin-left: 2px;
}
`;

export default function Search() {

    const cityInput = React.createRef()
    const {onSearch} = useContext(WeatherContext)
    const onSubmit = e => {
        e.preventDefault()
        onSearch(cityInput.current.value)
        e.target.reset();
    }
    
    return (
        <div>
            <CityForm onSubmit={onSubmit}>
                <CityInput ref={cityInput} placeholder="Search city or zip code"/>
                <SubmitButton type="submit">
                    GO
                </SubmitButton>
            </CityForm>
        </div>
    )
}
