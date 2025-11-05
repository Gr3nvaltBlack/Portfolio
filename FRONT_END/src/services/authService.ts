import axios from "axios"
// Comment envoyer les reponses de notre back vers le front voilà la raison du return null ???
export const LoginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`,
            { email, password }, 
            { withCredentials: true }
        );

        console.log('Réponse du backend:', res.data);

        if(!res) {
            return null;
        }
        return res.data;
    } catch (error) {
        return "blablasdoeoldoel"
    }
};

export const TokenUser = async () => {
    try {
        const resToken = await axios.get(`${process.env.REACT_APP_API_URL}jwtid`,
            { withCredentials: true }
        );
        if (!resToken) {
            return null;
        }
        return resToken.data
    } catch (error) {
        return null;
    }
};

export const RegisterUser = async (pseudo: string, email:string, password: string) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/register`,
            { pseudo, email, password },
            { withCredentials: true }
        );
        if (!res) {
            return "rt^t";
        }
        return res.data
    } catch (error) {
        return "erer";
    }
};

export const LogOutUser = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`,
            { withCredentials: true }
        );
        return res.data
    } catch (error) {
        return "errr"
    }
};