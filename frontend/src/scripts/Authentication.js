import axios from "axios";
import { ServerAddress } from "../../config";

export const GetAccountData = () => {
    return axios.get(`${ServerAddress}/account/authentication/get-account-data`)
    .then((result) => {
        return result;
    })
    .catch((error) => {
        return error;
    })
}

export const LogOut = () => {
    axios.post(`${ServerAddress}/account/logout`)
    .then(() => {
        window.location.reload();
    })
    .catch((error) => {
        console.log(error);
    });
}