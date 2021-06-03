import { api } from './../API/api';
import { BookItemType } from '../API/api'
import { BaseThunkType, InferActionType } from './reduxStore'

const initialState = {
    shortBookList: [] as BookItemType[],
    longBookList: [] as BookItemType[],
    searchTerm: null as string,
    pageNumber: 1,
    itemsFound: null as number,
    isShortListFetching: false,
    isLongListFetching: false
}

export const searchReducer = (state: SearchStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SEARCH_CHANGE_SHORT_LIST':
            return { ...state, shortBookList: action.list }
        case 'SEARCH_CHANGE_LONG_LIST':
            return { ...state, longBookList: action.list }
        case 'SEARCH_CHANGE_QUERY_TERM':
            return { ...state, searchTerm: action.searchTerm.split('+').join(' ') }
        case 'SEARCH_CHANGE_PAGE_NUMBER':
            return { ...state, pageNumber: action.page }
        case 'SEARCH_CHANGE_ITEMS_FOUND':
            return { ...state, itemsFound: action.count }
        case 'SEARCH_CHANGE_LONG_LIST_FETCHING':
            return { ...state, isLongListFetching: action.isFetching }
        case 'SEARCH_CHANGE_SHORT_LIST_FETCHING':
            return { ...state, isLongListFetching: action.isFetching }
        default: return state
    }
}

export const searchActions = {
    setShortBookList: (list: BookItemType[]) => (
        { type: 'SEARCH_CHANGE_SHORT_LIST', list } as const),
    setLongBookList: (list: BookItemType[]) => (
        { type: 'SEARCH_CHANGE_LONG_LIST', list } as const),
    setQueryTerm: (searchTerm: string) => (
        { type: 'SEARCH_CHANGE_QUERY_TERM', searchTerm } as const),
    setPageNumber: (page: number) => (
        { type: 'SEARCH_CHANGE_PAGE_NUMBER', page } as const),
    setItemsFound: (count: number) => (
        { type: 'SEARCH_CHANGE_ITEMS_FOUND', count } as const),
    setLongListFetching: (isFetching: boolean) => (
        { type: 'SEARCH_CHANGE_LONG_LIST_FETCHING', isFetching } as const),
    setShortListFetching: (isFetching: boolean) => (
        { type: 'SEARCH_CHANGE_SHORT_LIST_FETCHING', isFetching } as const),
}

export const requestShortBookList = (termSearch: string): ThunkType => {
    return async (dispatch, getState) => {
        if (!getState().searchReducer.isLongListFetching) {
            dispatch(searchActions.setShortListFetching(true))
            const data = await api.getShortSearchBookList(termSearch)
            dispatch(searchActions.setShortListFetching(false))
            dispatch(searchActions.setItemsFound(0))
            dispatch(searchActions.setShortBookList(data.docs))
        }
    }
}

export const requestLongBookList = (): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(searchActions.setLongListFetching(true))
        const searchTerm = getState().searchReducer.searchTerm
        const page = getState().searchReducer.pageNumber
        const data = await api.getLongSearchBookList(searchTerm, page)
        dispatch(searchActions.setLongListFetching(false))
        dispatch(searchActions.setItemsFound(data.numFound))
        dispatch(searchActions.setLongBookList(data.docs))
    }
}

type ActionsType = InferActionType<typeof searchActions>
type ThunkType = BaseThunkType<ActionsType>
export type SearchStateType = typeof initialState