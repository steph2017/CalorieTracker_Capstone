import axios from "axios";
//const baseUrl = "https://calorietracker-capstone.onrender.com"
const baseUrl = "http://localhost:2222" //dev URL

export async function getLogs() {
    const fullURL = `${baseUrl}/logs`;
    const response = await axios.get(fullURL);
    return response.data;
}

export async function getLog(id) {
    if (!id) {
        const fullURL = `${baseUrl}/logs`
    } else {
        const fullURL = `${baseUrl}/logs/${id}`
    }
    const response = await axios.get(fullURL);
    return response.data;
}

export async function getExpandedLogs() {
    const fullURL = `${baseUrl}/logs/expand`;
    const response = await axios.get(fullURL);
    return response.data;
}

export async function getExpandedLog(id) {
    if (!id) {
        const fullURL = `${baseUrl}/logs/expand`
    } else {
        const fullURL = `${baseUrl}/logs/expand/${id}`
    }
    const response = await axios.get(fullURL);
    return response.data;
}

export async function deleteLog(id) {
    if (!id) {
        throw new Error("Missing 'id' parameter.");
    };
    const fullURL = `${baseUrl}/logs/${id}/delete`;
    const response = await axios.delete(fullURL);
    return response.data;
}

export async function createLog(logobj) {
    if (!logobj) {
        throw new Error("Missing 'logobj' parameter.");
    };
    const fullURL = `${baseUrl}/logs/add`;
    const response = await axios.post(fullURL, logobj);
    return response.data;
}

export async function updatelog(id, { logobj }) {
    if (!id || !logobj) {
        throw new Error("Missing one or more parameters.");
    };

    const query = new URLSearchParams(logobj).toString() //thank HEAVENS theres a function for this
    const fullURL = `${baseUrl}/logs/${id}/edit/${query}`;
    const response = await axios.post(fullURL);
    return response.data;
}


