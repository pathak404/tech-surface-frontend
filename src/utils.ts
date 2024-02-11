import { FetchFromServer } from "./types";

export const fetchFromServer = async (
    path: string, 
    method: string = "GET", 
    data: Record<any, any> = {}, 
    isAuthorization: boolean = true, 
    ): Promise<FetchFromServer> => {
    try{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (isAuthorization) {
            const token = localStorage.getItem('token') || localStorage.getItem('student-token');
            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            } else {
                window.location.pathname = "/"
                throw new Error('Authorization token is missing.');
            }
        }

        const response = await fetch(import.meta.env.VITE_BACKEND_URL+path, {
            method,
            headers,
            body: Object.keys(data).length ? JSON.stringify(data) : undefined,
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


export const logout = (type: "admin" | "student" = "admin") => {
    if(type === "admin"){
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
    }else{
        localStorage.removeItem("student-token")
        localStorage.removeItem("student")
    }
    window.location.pathname = "/"
}