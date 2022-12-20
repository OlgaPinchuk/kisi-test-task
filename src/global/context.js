import { createContext, useReducer, useMemo } from "react";

import API from "../client";

const initialState = [];

// const initialState = {
// groups: [],
// pagination: {}
//  errorMessage: ''
// };

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
      return [action.data, ...state];
    case actions.DELETE_GROUP:
      return state.filter((group) => group.id !== group.data.id);
    default:
      return state;
  }
};

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      groups: groups,
      setGroups: (data) => {
        dispatch({ type: actions.SET_GROUPS, data });
      },
      async fetchGroups(offset) {
        try {
          const data = await API.fetchGroups(offset);
          console.log({ data });
          this.setGroups(data.data);
        } catch (e) {
          console.error(e);
        }
      },
      createGroup: async (group) => {
        const data = await API.createGroup(group);
        dispatch({
          type: actions.ADD_GROUP,
          data: data,
        });
      },
      deleteGroup: (data) => {
        dispatch({ type: actions.DELETE_GROUP, id: data.groupId });
      },
    };
  }, [groups]);

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
