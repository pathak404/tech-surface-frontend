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


const convertToCSV = (data: Record<string, any>[]): string => {
    const rows: string[] = [];
    const headers = Object.keys(data[0]);
    rows.push(headers.join(","));

    data.forEach(obj => {
        const values = headers.map(header => obj[header])
        rows.push(values.join(","))
    })
    return rows.join('\n')
}

export const downloadCSV = (data: Record<string, any>[], filename: string) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("download", filename)
    a.href = url;
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}