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
        loading: true, //  show spinner to block ui
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
    case actions.DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.id),
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
