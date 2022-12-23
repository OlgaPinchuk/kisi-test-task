import KisiClient from "kisi-client";

const LOGIN_PATH = "logins";
const GROUPS_PATH = "groups";
const STORAGE_KEY = "responseKey";

const client = new KisiClient();
client.setLoginSecret(sessionStorage.getItem(STORAGE_KEY));

export const PAGINATION_LIMIT = 10;

export const fetchGroups = async (options) => {
  const data = await client.get(GROUPS_PATH, {
    limit: PAGINATION_LIMIT,
    ...options,
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
  const response = await client.post(LOGIN_PATH, {
    user: { domain, email, password },
    login: { type: "device" },
  });
  const { secret } = response;
  client.setLoginSecret(secret);
  sessionStorage.setItem(STORAGE_KEY, secret);
};

const API = {
  logIn,
  fetchGroups,
  createGroup,
  deleteGroup,
};
export default API;
