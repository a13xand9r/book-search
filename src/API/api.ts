
export const ITEMS_COUNT_SHORT_SEARCH = 5
export const ITEMS_COUNT_LONG_SEARCH = 15

export const getShortSearchBookList = async (query: string): Promise<BookItemType[]> => {
    const queryWithPluses = query.split(' ').join('+')
    const res = await fetch(`http://openlibrary.org/search.json?q=${queryWithPluses}&limit=${ITEMS_COUNT_SHORT_SEARCH}`)
    const data = await res.json()
    return data.docs
}
export const getSearchBookList = async (query: string, page: number): Promise<BookItemType[]> => {
    const queryWithPluses = query.split(' ').join('+')
    const res = await fetch(`http://openlibrary.org/search.json?q=${queryWithPluses}&page=${page}&limit=${ITEMS_COUNT_LONG_SEARCH}`)
    const data = await res.json()
    return data.docs
}

export type BookItemType = {
    title: string
    author_name: string[]
    cover_i?: number
    key: string
}