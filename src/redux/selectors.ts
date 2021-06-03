import { StateType } from './reduxStore';

export const getLongBookList = (state: StateType) => state.searchReducer.longBookList
export const getShortBookList = (state: StateType) => state.searchReducer.shortBookList
export const getSearchTerm = (state: StateType) => state.searchReducer.searchTerm
export const getPageNumber = (state: StateType) => state.searchReducer.pageNumber
export const getIsLongListFetching = (state: StateType) => state.searchReducer.isLongListFetching