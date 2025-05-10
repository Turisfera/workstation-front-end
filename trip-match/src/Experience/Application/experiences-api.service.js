import axios from "axios";

export class ExperiencesApiService {
    async getExperiences(){
        var response= await axios.get(`https://681e93bfc1c291fa66347465.mockapi.io/experience`)
        return response;
    }

    async getById(id){
        var response= await axios.get(`https://681e93bfc1c291fa66347465.mockapi.io/experience/${id}`)
        return response;
    }

    async createExperience(experience){
        var response= await axios.post(`https://681e93bfc1c291fa66347465.mockapi.io/experience`, experience)
        return response;
    }

    async deleteExperience(id){
        return await axios.delete(`https://681e93bfc1c291fa66347465.mockapi.io/experience/${id}`)
    }

    async updateExperience(id, article) {
        var response = await axios.put(`https://681e93bfc1c291fa66347465.mockapi.io/experience/${id}`, article)
        return response;
    }
}