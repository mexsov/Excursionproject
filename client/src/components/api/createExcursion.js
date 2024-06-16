import { apiClient } from "./apis";

const excursionModel = {
    getProjectTasks: async(create_excursions_id) => {
      try{
        const response = await apiClient.get(`/tasks/create_excursions/${create_excursions_id}`);
        return response;
      }
      catch(error){
        console.log(error);
      }
    },
};
    export default excursionModel;