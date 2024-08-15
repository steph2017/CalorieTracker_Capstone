import axios from "axios";
//const baseUrl = "https://calorietracker-capstone.onrender.com"
const baseUrl = "http://localhost:2222" //dev URL

export async function getUsers() {
    const fullURL = `${baseUrl}/users`;
    const response = await axios.get(fullURL);
    return response.data;
}

export async function getUser(id) {
    if (!id) {
        const fullURL = `${baseUrl}/users`
    } else {
        const fullURL = `${baseUrl}/users/${id}`
    }
    const response = await axios.get(fullURL);
    return response.data;
}

export async function deleteUser(id) {
    if (!id) {
        throw new Error("Missing 'id' parameter.");
    };
    const fullURL = `${baseUrl}/users/${id}/delete`;
    const response = await axios.delete(fullURL);
    return response.data;
}

export async function createUser(userobj) {
    if (!userobj) {
        throw new Error("Missing 'userobj' parameter.");
    };
    const fullURL = `${baseUrl}/users/add`;
    const response = await axios.post(fullURL, userobj);
    return response.data;
}

export async function updateUser(id, { userobj }) {
    if (!id || !userobj) {
        throw new Error("Missing one or more parameters.");
    };

    const query = new URLSearchParams(userobj).toString() //thank HEAVENS theres a function for this
    const fullURL = `${baseUrl}/users/${id}/edit/${query}`;
    const response = await axios.post(fullURL);
    return response.data;
}


