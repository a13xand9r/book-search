import React, { FormEvent, useEffect, useState } from 'react'
import { getShortSearchBookList, BookItemType, getSearchBookList } from '../API/api'
import './../Styles/app.css'
import { BookItem } from './BookItem'

export const App = () => {
    const [search, setSearch] = useState('')
    const [booksList, setBooksList] = useState<BookItemType[]>([])
    let timeout: ReturnType<typeof setTimeout>
    const onSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        clearTimeout(timeout)
        let data = await getSearchBookList(search, 1)
        setBooksList(data)
    }
    useEffect(() => {
        if (search) {
            timeout = setTimeout(async () => {
                let data = await getShortSearchBookList(search)
                setBooksList(data)
            }, 1000)
        } else setBooksList([])
        return () => {
            clearTimeout(timeout)
        }
    }, [search])
    console.log(booksList)
    return <>
        <form className='app__form search' onSubmit={onSearch}>
            <div className='search__input-pane'>
                <input type='text' className='search__input'
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                {!!booksList.length && <div className='search__list book-list'>
                    {booksList.map((book, i) => (<BookItem key={book.key} book={book} />))}
                </div>}
            </div>
            <input type='submit' value='Поиск' className='search__submit' />
        </form>
    </>
}

type Styles = {
    [key: string]: string
}