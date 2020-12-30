import axios from 'axios';
const baseURL = "http://localhost:3001/phonebook";

// Gets all data from server
const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

// Creates a new object to "upload"to server
const create = newObject => {
    const request =  axios.post(baseURL, newObject);
    return request.then(response => response.data);
}

/*
// To be included - updates if there's an existing object (profile with existing name)
const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
}
*/

const profiles = {
    getAll,
    create
};
export default profiles;