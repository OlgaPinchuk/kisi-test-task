import { createContext, useReducer, useMemo } from "react";

import API from "../client";
import { actions } from "./actions";
import { reducer } from "./reducer";
import { calculatePaginationOffset } from "../utils";

const initialState = {
  groups: [],
  pagination: {},
  errorMessage: "",
  loading: false,
  offset: 0,
  currentPage: 1,
};

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { groups, pagination, loading, errorMessage, currentPage } = state;

  const value = useMemo(() => {
    return {
      groups,
      pagination,
      currentPage,
      loading,
      errorMessage,
      setGroups: (data) => {
        dispatch({ type: actions.SET_GROUPS, data });
      },
      async fetchGroups(offset) {
        try {
          dispatch({ type: actions.SET_LOADING });
          const data = await API.fetchGroups(offset);
          this.setGroups(data);
        } catch (e) {
          console.error(e);
        }
      },
      async createGroup(group) {
        try {
          dispatch({ type: actions.SET_LOADING });
          await API.createGroup(group);
          this.fetchGroups(calculatePaginationOffset(currentPage));
        } catch (e) {
          dispatch({ type: actions.SET_ERROR, errorMessage: e.reason });
          return;
        }
      },
      async setCurrentPage(page) {
        try {
          dispatch({ type: actions.SET_LOADING });
          this.fetchGroups(calculatePaginationOffset(page));
          dispatch({ type: actions.SET_PAGE, payload: { page } });
        } catch (e) {
          dispatch({ type: actions.SET_ERROR, errorMessage: e.reason });
        }
      },
      deleteGroup: (data) => {
        dispatch({ type: actions.DELETE_GROUP, id: data.groupId });
      },
    };
  }, [groups, pagination, currentPage, loading, errorMessage]);

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};
