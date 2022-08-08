import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Search.css';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const doSearch = () => {
        console.log(searchTerm);
        navigate(`/find/${searchTerm}`); //    "/find/" + searchTerm
    }

    const {orderId}= useParams<string>();
    useEffect( ()=> {
        if (orderId != null) {
            setSearchTerm(orderId);
        }
    }, [] );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchTerm(event.currentTarget.value);
    }

    return (
        <div className="searchBox">
            <label htmlFor="orderId" >Order Id:</label>
            <input onChange={handleChange} value={searchTerm} id="orderId" type="text" />
            <button onClick={doSearch}  >Search</button>
        </div>

    );

}

export default Search;