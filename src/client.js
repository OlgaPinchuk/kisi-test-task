import KisiClient from "kisi-client";

const LOGIN_PATH = "logins";
const GROUPS_PATH = "groups";

const client = new KisiClient(); //client.setLoginSecret(res.secret); to Localstorage??
client.setLoginSecret("371199d7e81182c0879fd91b0d45e96c");

export const PAGINATION_LIMIT = 10;

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
