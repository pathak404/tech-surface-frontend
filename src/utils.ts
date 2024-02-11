import { NavigateFunction } from "react-router-dom";
import { FetchFromServer } from "./types";

export const fetchFromServer = async (
    path: string, 
    method: string = "GET", 
    data: Record<any, any> = {}, 
    isAuthorization: boolean = true, 
    navigate: NavigateFunction
    ): Promise<FetchFromServer> => {
    try{
        const headers: Record<string, string> = {};
        
        if (isAuthorization) {
            const token = localStorage.getItem('token') || localStorage.getItem('student-token');
            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            } else {
                navigate("/")
                throw new Error('Authorization token is missing.');
            }
        }

        const response = await fetch(import.meta.env.VITE_BACKEND_URL+path, {
            method,
            headers,
            body: JSON.stringify(data),
        })

        let result;
        if(response.ok){
            result = response.json()
            return result
        }else{
            try{
                result = await response.json()
            }catch(error){
                result = response.statusText
            }
            result = result.message ?? result
            if(result.includes("Authorization token")){
                localStorage.removeItem("token")
                throw new Error(`Authorization token issue`);
            }
            throw new Error(`${response.status}: ${result}`);
        }
    }catch(error){
        throw error;
    }
}


