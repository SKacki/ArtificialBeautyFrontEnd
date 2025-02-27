import { defineStore } from "pinia";

export const useImagesStore = defineStore('imagesStore', {
    state: () => ({
        responseData: null
    }),
    actions: {
        async fetchData() {       
            try {         
                const response = await fetch('https://localhost:44307/api/View/GetfeatureImages', {           
                    method: 'GET',           
                    headers: {             
                        'Content-Type': 'application/json'          
                    },                  
                });         
                if (!response.ok) {           
                    throw new Error('Network response was not ok');         
                }    
                console.log(response)      
                const data = await response.json(); 
                this.responseData = data
                return data
            } 
            catch (error) { 
                console.error('There was a problem with the fetch operation:', error); 
            } 
        }
    }
})