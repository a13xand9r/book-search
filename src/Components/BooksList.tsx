import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSearchBookList } from '../API/api'
import { searchActions } from '../redux/searchReducer'
import { getLongBookList, getPageNumber, getSearchTerm } from '../redux/selectors'
import { BookItem } from './BookItem'

export const BooksList = () => {
    const bookList = useSelector(getLongBookList)
    const searchTerm = useSelector(getSearchTerm)
    const pageNumber = useSelector(getPageNumber)
    const dispatch = useDispatch()
    const {page, query}: {page: string, query: string} = useParams()
    const getBooks = async () => {
        let data = await getSearchBookList(searchTerm, pageNumber)
        dispatch(searchActions.setLongBookList(data))
    }
    useEffect(() => {
        dispatch(searchActions.setQueryTerm(query))
        dispatch(searchActions.setPageNumber(+page))
    }, [query, page])
    useEffect(() => {
        getBooks()
    }, [searchTerm])

    if (bookList.length === 0) return <div>Loading...</div>
    return <div>
        {bookList.map(book => (<BookItem key={book.key} book={book} />))}
    </div>
}