import React from 'react';
import { useRef } from 'react';
import { useDispatch} from "react-redux";
import { fetchUsers } from '../features/users'




export default function SearchBar(props) {

    const dispatch = useDispatch()

    const inputRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        dispatch(fetchUsers(value))
    }

    return (
        <header>
            <h1 className="heading">MI-C3 Assessment</h1>
            <form className="search_bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    className="search_input"
                    placeholder="Search Users By Name..."
                />
                <button className="search_button">Search</button>
            </form>
        </header>
    )
}