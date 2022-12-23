import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_GROUPS:
      return {
        ...state,
        groups: [...action.data.data],
        pagination: { ...action.data.pagination },
        errorMessage: "",
        loading: false,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case actions.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
