import axios from "axios";
const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getToken = async () => {
  return axios.get(`${baseUrl}/token`);
};

export const getCardsApi = async ({ page, count = 6 }) => {
  return await axios.get(`${baseUrl}/users`, { params: { page, count } });
};

export const getPositionsApi = async () => {
  return await axios.get(`${baseUrl}/positions`);
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