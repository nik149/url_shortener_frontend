export function historyDataFetched(dataObj) {
  return {
    type: 'DATA_FETCHED',
    payload: {
      data: dataObj.data,
      next_link: dataObj.next_link,
      prev_link: dataObj.prev_link,
      current_page: dataObj.current_page,
      total_pages: dataObj.total_pages
    }
  };
}

export function fetchNextData() {
  return {
    type: 'FETCH_NEXT_DATA'
  };
}

export function fetchPrevData() {
  return {
    type: 'FETCH_PREV_DATA'
  };
}

export function resetHistoryData() {
  return {
    type: 'RESET_DATA'
  };
}
