import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3030/api"
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getEvents() {
    return service
      .get("/")
      .then(res => res.data)
      .catch(errHandler);
  },

  postEvents(data) {
    return service
      .post("/", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile() {
    return service
      .get("/users/profile")
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  getHelp(userId) {
    return service
      .get("/users/get-help/" + userId)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post("/login", {
        email,
        password
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  },

  loadUser() {
    const userData = localStorage.getItem("user");
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  }
};
