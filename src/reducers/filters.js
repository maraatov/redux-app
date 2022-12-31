// const initialState = {
//   filters: [],
//   filtersLoadingStatus: "idle",
//   activeFilter: "all",
// };

// const filters = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING__FILTERS":
//       return {
//         ...state,
//         filtersLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED_FILTERS":
//       return {
//         ...state,
//         filters: action.payload,
//         filtersLoadingStatus: "idle",
//       };
//     case "FILTERS_FETCHING_ERROR":
//       return {
//         ...state,
//         filtersLoadingStatus: "error",
//       };
//     case "ACTIVE_FILTER_CHANGED":
//       return {
//         ...state,
//         activeFilter: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default filters;
