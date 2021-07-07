import axios from "axios";

const authService = {
  login: (email, password) => {
    return axios.get(`/user`, {
      headers: {
        authorization: `Basic ${btoa(`${email}:${password}`)}`
      }
    });
  },
  logout: () => {
    return axios.post(`/logout`);
  },

  check: () => {
    return axios.get(`/user`);
  }
};

export default authService;