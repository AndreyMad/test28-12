import axios from "axios";
const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getToken = () => {
  return axios.get(`${baseUrl}/token`);
};

export const getCardsApi = ({ page, count = 6 }) => {
  return axios.get(`${baseUrl}/users`, { params: { page, count } });
};

export const getPositionsApi = () => {
  return axios.get(`${baseUrl}/positions`);
};

export const addUser = async (formData) => {
  const { data: { token } } = await getToken();
  return axios.post(`${baseUrl}/users`, formData,
    {
      headers: {
        "Content-type": "multipart/form-data",
        "Token": token
      },
    })
}