import axios from "axios";

export class CategoryApiService {
    async getCategory(){
        var response= await axios.get(`https://681e93bfc1c291fa66347465.mockapi.io/category`);
        return response;
    }
    async getCategoryById(categoryId){
        var response= await axios.get(`https://681e93bfc1c291fa66347465.mockapi.io/category/${categoryId}`);
        return response;
    }

}