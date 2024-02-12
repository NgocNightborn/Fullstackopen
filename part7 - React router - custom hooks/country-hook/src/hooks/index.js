import axios from "axios"
import { useEffect, useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => setCountry({data: response.data, found: true}))
            .catch(error => setCountry({data: null, found: false}))
    }, [name])

    return country
}
