import { createContext, useReducer, useEffect } from "react";

import client, { fetchGroups } from "../client";

const initialState = [];

//const initialState = {
//groups: [],
//  errorMessage: ''
//};

const actions = {
  SET_GROUPS: "SET_GROUPS",
  ADD_GROUP: "ADD_GROUP",
  DELETE_GROUP: "DELETE_GROUP",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_GROUPS:
      return [...action.data];
    case actions.ADD_GROUP:
      return [...state, action.data];
    case actions.DELETE_GROUP:
      return state.filter((group) => group.id !== group.data.id);
    default:
      return state;
  }
};

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, dispatch] = useReducer(reducer, initialState);

  const value = {
    // useMemo, groups in deps
    groups: groups,
    fetchGroups: () => {
      api.fetchGroups().then((data) => this.setGroups(data));
    },
    setGroups: (data) => {
      dispatch({ type: actions.SET_GROUPS, data });
    },
    addGroup: (groupName) => {
      dispatch({
        type: actions.ADD_GROUP,
        data: {
          name: groupName,
          place_id: null,
        },
      });
    },
    deleteGroup: (data) => {
      dispatch({ type: actions.DELETE_GROUP, id: data.groupId });
    },
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};

// function setGroups(data) {
//   console.log({ data });
//   dispatch({
//     type: actions.SET_GROUPS,
//     data,
//   });
// }

// function addGroup(text) {
//   dispatch({
//     type: actions.ADD_GROUP,
// data: {
//   name: text,
//   place_id: null,
// }
//   });
// }

// function deleteGroup(groupId) {
//   dispatch({
//     type: actions.DELETE_GROUP,
//     id: groupId,
//   });
// }
