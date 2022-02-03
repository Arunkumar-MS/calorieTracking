import axios from "@Service/core/axios";

export const fetchSuggestion = (query: string) => {
    const headers = {
        'x-app-key': '24ef67c5d46245ab6d32977d7a8c013f',
        'x-app-id': '3846263c',
        'content-type': 'application/json',
    };
    return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?branded=true&common=true&query=${query}&self=false`, { headers })
}



export const fetchNutrition = (query: string) => {
    const headers = {
        'x-app-key': '24ef67c5d46245ab6d32977d7a8c013f',
        'x-app-id': '3846263c',
        'content-type': 'application/json',
    };
    return axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, { query }, { headers })
}