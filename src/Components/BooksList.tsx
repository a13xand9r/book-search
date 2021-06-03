import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestLongBookList, searchActions } from '../redux/searchReducer'
import { getLongBookList, getSearchTerm } from '../redux/selectors'
import { BookItem } from './BookItem'

export const BooksList = () => {
    const bookList = useSelector(getLongBookList)
    const searchTerm = useSelector(getSearchTerm)
    const dispatch = useDispatch()
    const {page, query}: {page: string, query: string} = useParams()
    useEffect(() => {
        dispatch(searchActions.setQueryTerm(query))
        dispatch(searchActions.setPageNumber(+page))
    }, [query, page])
    useEffect(() => {
        searchTerm && dispatch(requestLongBookList())
    }, [searchTerm])

    if (bookList.length === 0) return <div>Loading...</div>
    return <div>
        {bookList.map(book => (<BookItem key={book.key} book={book} />))}
    </div>
}