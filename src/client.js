import KisiClient from "kisi-client";

// const authData = {
//   Authorization: process.env.REACT_APP_AUTH_KEY,
//   domain: process.env.REACT_APP_DOMAIN,
//   email: process.env.REACT_APP_EMAIL,
//   password: process.env.REACT_APP_PASSWORD,
// };

const LOGIN_PATH = "logins";
const GROUPS_PATH = "groups";

const client = new KisiClient(); //client.setLoginSecret(res.secret); to Localstorage??
client.setLoginSecret("371199d7e81182c0879fd91b0d45e96c");

// client.signIn(authData).then(() => {
//   client.get(path).then((path) => console.log(path));

// kisiClient
//     .get("places/1")
//     .then(place => console.log(place))

// kisiClient
//     .post("locks/1/unlock")
//     .then(result => console.log(result))
// });

// async function authenticate() {
//   await client.signIn(authData);
//   return client;
// }
// const api = authenticate();

// export const fetchGroups = () => {
//   return api.then((client) => {
//     return client.get(path);
//   });
// };

// export const addGroup = (id) => {
//   return api.then((client) => {
//     return client.post(`${path}/${id}`);
//   });
// };

// export default api;

const PAGINATION_LIMIT = 10;

const fetchGroups = async (offset = 0) => {
  const data = await client.get(GROUPS_PATH, {
    limit: PAGINATION_LIMIT,
    offset,
  });
  return data;
};

const createGroup = async (group) => {
  const data = await client.post(GROUPS_PATH, group);
  return data;
};

const deleteGroup = async (id) => {
  const data = await client.delete(`${GROUPS_PATH}/${id}`, id);
  return data;
};

const logIn = async (domain, email, password) => {
  const res = await client.post(LOGIN_PATH, {
    user: { domain, email, password },
    login: { type: "device" },
  });
  client.setLoginSecret(res.secret);
};

const API = {
  fetchGroups,
  createGroup,
  deleteGroup,
  logIn,
};
export default API;
