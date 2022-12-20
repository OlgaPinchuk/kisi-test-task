import KisiClient from "kisi-client";

const authData = {
  Authorization: process.env.REACT_APP_AUTH_KEY,
  domain: process.env.REACT_APP_DOMAIN,
  email: process.env.REACT_APP_EMAIL,
  password: process.env.REACT_APP_PASSWORD,
};

const path = "groups";

const client = new KisiClient(); //client.setLoginSecret(res.secret); to Localstorage??
client.setLoginSecret("e3b66ec6829f90bf519c85439f2eabfe");

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

export const fetchGroups = async () => {
  const data = await client.get(path);
  return data;
};

export const createGroup = async (group) => {
  const data = await client.post(path, group);
  return data;
};

export const deleteGroup = async (id) => {
  const data = await client.delete(`${path}/${id}`, id);
  return data;
};

export const logIn = async (domain, email, password) => {
  const res = await client.post("/logins", {
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

export default client;
