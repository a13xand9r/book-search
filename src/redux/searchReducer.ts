import { BookItemType } from '../API/api'
import { InferActionType } from './reduxStore'

const initialState = {
    shortBookList: [] as BookItemType[],
    longBookList: [] as BookItemType[],
    searchTerm: null as string,
    pageNumber: 1
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
        default: return state
    }
}

export const searchActions = {
    setShortBookList: (list: BookItemType[]) => (
        {type: 'SEARCH_CHANGE_SHORT_LIST', list} as const),
    setLongBookList: (list: BookItemType[]) => (
        {type: 'SEARCH_CHANGE_LONG_LIST', list} as const),
    setQueryTerm: (searchTerm: string) => (
        {type: 'SEARCH_CHANGE_QUERY_TERM', searchTerm} as const),
    setPageNumber: (page: number) => (
        {type: 'SEARCH_CHANGE_PAGE_NUMBER', page} as const)
}

type ActionsType = InferActionType<typeof searchActions>
export type SearchStateType = typeof initialState