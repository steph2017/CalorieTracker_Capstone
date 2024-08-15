import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL; - couldn't get .env set up for frontend so im hardcoding the values
// const apiHomeUrl = import.meta.env.VITE_API_HOMEURL;
//const baseUrl = "https://calorietracker-capstone.onrender.com"
const baseUrl = "http://localhost:2222" //dev URL

export async function getFoods() {
    const fullURL = `${baseUrl}/foods`;
    const response = await axios.get(fullURL);
    return response.data;
}

export async function getFood(id) {
    if (!id) {
        const fullURL = `${baseUrl}/foods`
    } else {
        const fullURL = `${baseUrl}/foods/${id}`
    }
    const response = await axios.get(fullURL);
    return response.data;
}

export async function deleteFood(id) {
    if (!id) {
        throw new Error("Missing 'id' parameter.");
    };
    const fullURL = `${baseUrl}/foods/${id}/delete`;
    const response = await axios.delete(fullURL);
    return response.data;
}

export async function createFood(foodobj) {
    if (!foodobj) {
        throw new Error("Missing 'foodobj' parameter.");
    };
    const fullURL = `${baseUrl}/foods/add`;
    const response = await axios.post(fullURL, foodobj);
    return response.data;
}

export async function updateFood(id, { foodobj }) {
    if (!id || !foodobj) {
        throw new Error("Missing one or more parameters.");
    };

    const query = new URLSearchParams(foodobj).toString() //thank HEAVENS theres a function for this
    const fullURL = `${baseUrl}/foods/${id}/edit/${query}`;
    const response = await axios.post(fullURL);
    return response.data;
}


