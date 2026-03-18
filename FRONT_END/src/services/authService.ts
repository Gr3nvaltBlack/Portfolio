import axios from "axios"
import Cookies from "js-cookie"

interface UserResponse {
    message?: string;
    token?: string;
    user?: {
    _id: string;
    username: string;
    email: string;
    picture?: string;
  };
}

export const LoginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post<UserResponse>(`${import.meta.env.VITE_API_URL}api/user/login`,
            { email, password }, 
            { withCredentials: true}
        );
        
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return { error: error.response.data.message || "Invalid credentials" };
        }
        return { error: "Unable to connect to the server" };
    }
};

export const TokenUser = async () => {
    try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}api/user/jwtid`,
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        );
        return resp.data
    } catch (error) {
        return null;
    }
};

export const RegisterUser = async (username: string, email:string, password: string): Promise<UserResponse | null> => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}api/user/register`,
            { username, email, password },
            { withCredentials: true }
        );
        return data
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
};

export const LogOutUser = async (): Promise<UserResponse | null> => {
    try {
        const { data } = await axios.get<UserResponse>(`${import.meta.env.VITE_API_URL}api/user/logout`,
            { withCredentials: true }
        );
        return data
    } catch (error) {
        console.error("Error during disconnection:", error);
        return null;
    }
};