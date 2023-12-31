import axiosClient from "./axiosClient";

const UserAPI = {
  getAllClients: () => {
    const url = "/users-clients";
    return axiosClient.get(url);
  },
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
  postSignIn: (query) => {
    const url = `/users/admin/login${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
