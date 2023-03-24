export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_WATCHED":
      return {
        ...state,
        watched: action.payload,
      };
    default:
      return state;
  }
};