
export const ITEMS_COUNT_SHORT_SEARCH = 5
export const ITEMS_COUNT_LONG_SEARCH = 15

export const api = {
    getShortSearchBookList: async (query: string): Promise<ResponseListType> => {
        console.log('SHORT LIST REQUEST')
        const queryWithPluses = query.split(' ').join('+')
        const res = await fetch(`http://openlibrary.org/search.json?q=${queryWithPluses}&limit=${ITEMS_COUNT_SHORT_SEARCH}`)
        const data = await res.json()
        return data
    },
    getLongSearchBookList: async (query: string, page: number): Promise<ResponseListType> => {
        console.log('LONG LIST REQUEST')
        const queryWithPluses = query.split(' ').join('+')
        const res = await fetch(`http://openlibrary.org/search.json?q=${queryWithPluses}&page=${page}&limit=${ITEMS_COUNT_LONG_SEARCH}`)
        const data = await res.json()
        return data
    }
}

type ResponseListType = {
    numFound: number
    start: number
    docs: BookItemType[]
}
export type BookItemType = {
    title: string
    author_name: string[]
    cover_i?: number
    key: string
}