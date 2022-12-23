import { createContext, useReducer, useMemo } from "react";

import API from "../client";
import { actions } from "./actions";
import { reducer } from "./reducer";
import { calculatePaginationOffset } from "../utils";

const initialState = {
  groups: [],
  pagination: {},
  errorMessage: "",
  searchQuery: "",
  loading: false,
  offset: 0,
  currentPage: 1,
};

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    groups,
    pagination,
    loading,
    errorMessage,
    currentPage,
    searchQuery,
  } = state;

  const value = useMemo(() => {
    return {
      groups,
      pagination,
      currentPage,
      loading,
      errorMessage,
      searchQuery,

      setGroups(data) {
        dispatch({ type: actions.SET_GROUPS, data });
      },
      setError(errorMessage) {
        dispatch({ type: actions.SET_ERROR, errorMessage });
      },
      async fetchGroups(options) {
        try {
          dispatch({ type: actions.SET_LOADING, loading: true });
          const data = await API.fetchGroups({ ...options });
          this.setGroups(data);
          return data;
        } catch (e) {
          dispatch({ type: actions.SET_LOADING, loading: false });
          this.setError(e.reason);
        }
      },
      async searchGroups(query) {
        try {
          dispatch({ type: actions.SET_LOADING, loading: true });
          dispatch({
            type: actions.SET_SEARCH_QUERY,
            searchQuery: query,
          });
          dispatch({
            type: actions.SET_PAGE,
            payload: { page: 1 },
          });
          const newOffset = calculatePaginationOffset(currentPage);
          const options = { ...newOffset, query };
          const data = await this.fetchGroups(options);
          this.setGroups(data);
        } catch (e) {
          console.error(e);
        }
      },
      async createGroup(group) {
        try {
          dispatch({ type: actions.SET_LOADING, loading: true });
          const response = await API.createGroup(group);
          const newOffset = calculatePaginationOffset(currentPage);
          const options = {
            ...newOffset,
            query: searchQuery,
          };
          this.fetchGroups(options);
          return response;
        } catch (e) {
          this.setError(e.reason);
          return;
        }
      },
      async setCurrentPage(page) {
        try {
          dispatch({ type: actions.SET_LOADING, loading: true });
          const newOffset = calculatePaginationOffset(page);
          const options = { ...newOffset, query: searchQuery };
          await this.fetchGroups(options);
          dispatch({ type: actions.SET_PAGE, payload: { page } });
        } catch (e) {
          dispatch({ type: actions.SET_ERROR, errorMessage: e.reason });
        }
      },
      async deleteGroup(id) {
        try {
          dispatch({ type: actions.SET_LOADING, loading: true });
          const response = await API.deleteGroup(id);
          const newOffset = calculatePaginationOffset(currentPage);
          const options = {
            ...newOffset,
            query: searchQuery,
          };
          this.fetchGroups(options);
          return response;
        } catch (e) {
          dispatch({ type: actions.SET_ERROR, errorMessage: e.reason });
          return;
        }
      },
    };
  }, [groups, pagination, currentPage, loading, errorMessage, searchQuery]);

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};
