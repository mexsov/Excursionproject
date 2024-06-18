import { apiClient } from "./apis";

const excursionModel = {



    createExcursion: async(excursion) => {
      try{
        const response = await apiClient.post(`/create_excursions/`, excursion);
        return response;
      }
      catch(error){
        console.log(error);
      }
    },
    deleteExcursion: async(excursion_id) => {
      try{
        const response = await apiClient.delete(`/create_excursions/${excursion_id}`);
        return response;
      }
      catch(error){
        console.log(error);
        return error.response;
      }
    },
    // updateTaskStatus: async(excursion) => {
    //   try{
    //     const response = await apiClient.put(`/tasks/status`, task);
    //     return response;
    //   }
    //   catch(error){
    //     console.log(error);
    //     return error.response;
    //   }
    // },




  };
    export default excursionModel;