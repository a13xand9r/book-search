import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookItemType, getSearchBookList } from '../API/api'
import { BookItem } from './BookItem'

export const BooksList = () => {
    const [booksList, setBooksList] = useState<BookItemType[]>([])
    let {pageNumber, query}: {pageNumber: string, query: string} = useParams()
    const getBooks = async () => {
        let data = await getSearchBookList(query, +pageNumber)
        setBooksList(data)
    }
    useEffect(() => {
        getBooks()
    }, [query])
    if (booksList.length === 0) return <div>Loading...</div>
    return <div>
        {booksList.map(book => (<BookItem key={book.key} book={book} />))}
    </div>
}