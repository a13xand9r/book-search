import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getShortSearchBookList, BookItemType } from '../API/api'
import './../Styles/searchPane.css'
import { BookItem } from './BookItem'

export const SearchPane = () => {
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [booksList, setBooksList] = useState<BookItemType[]>([])
    const [showShortList, setShowShortList] = useState(false)
    const inputRef = useRef(null)
    let timeout: ReturnType<typeof setTimeout>
    const pushQueryString = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        clearTimeout(timeout)
        const queryWithPluses = search.split(' ').join('+')
        history.push(`/search=${queryWithPluses}/page=1`)
    }
    const onBlurHandler = () => setShowShortList(false)
    const onFocusHandler = () => setShowShortList(true)
    const {_, query}: {_: string, query: string} = useParams()
    useEffect(() => {
        if (search) {
            timeout = setTimeout(async () => {
                if (document.activeElement === inputRef.current) setShowShortList(true)
                let data = await getShortSearchBookList(search)
                setBooksList(data)
            }, 1000)
        } else setBooksList([])
        return () => {
            clearTimeout(timeout)
        }
    }, [search])
    useEffect(() => {
        if (query) setSearch(query)
    }, [])
    return <>
        <form className='app__form search' onSubmit={pushQueryString}>
            <div className='search__input-pane'>
                <input type='text' className='search__input'
                    value={search}
                    ref={inputRef}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    onChange={e => setSearch(e.target.value)} />
                {(!!booksList.length && showShortList) && <div className='search__list book-list'>
                    {booksList.map(book => (<BookItem key={book.key} book={book} />))}
                </div>}
            </div>
            <input type='submit' value='Поиск' className='search__submit' />
        </form>
    </>
}

type Styles = {
    [key: string]: string
}