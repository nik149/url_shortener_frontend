const initialHistoryState = {
  data: [],
  prev_link: null,
  next_link: null,
  current_link: '/get_user_history_data?page=0&size=10',
  current_page: 0,
  total_pages: null,
  fetched: false
};

function historyReducer(state=initialHistoryState, action) {
  switch(action.type) {
    case 'DATA_FETCHED':
      state = {...state,
        data: action.payload.data,
        prev_link: action.payload.prev_link,
        next_link: action.payload.next_link,
        current_page: action.payload.current_page,
        total_pages: action.payload.total_pages,
        fetched: true
      };
      console.log("Data Fetched State: ", state);
      return state;
    case 'FETCH_NEXT_DATA':
      state = {...state, fetched: false, current_link: state.next_link};
      return state;
    case 'FETCH_PREV_DATA':
      state = {...state, fetched: false, current_link: state.prev_link};
      return state;
  }
  return state;
}

export default historyReducer;
