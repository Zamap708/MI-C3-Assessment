import axios from "axios"

export const getPeople = () => {
    

    axios.get("https://swapi.dev/api/people/?search=luke")
        .then(response => {
            // if (response.data.next) {
            //     axios.get(response.data.next)
            // }
            console.log(response.data)
        })
    .catch( err => console.log(err) )
}