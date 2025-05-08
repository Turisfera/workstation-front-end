import axios from "axios";

export class ExperiencesApiService {
    async getExperiences(){
        var response= await axios.get(`http://localhost:3000/experiences`)
        return response;
    }

    async createExperience(experience){
        var response= await axios.post(`http://localhost:3000/experiences`, experience)
        return response;
    }

    async deleteExperience(id){
        return await axios.delete(`http://localhost:3000/experiences/${id}`)
    }
}