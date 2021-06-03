import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getShortSearchBookList, BookItemType } from '../API/api'
import { searchActions } from '../redux/searchReducer'
import { getSearchTerm, getShortBookList } from '../redux/selectors'
import './../styles/searchPane.css'
import { BookItem } from './BookItem'

export const SearchPane = () => {
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [showShortList, setShowShortList] = useState(false)
    const dispatch = useDispatch()
    const bookList = useSelector(getShortBookList)
    const searchTerm = useSelector(getSearchTerm)
    const inputRef = useRef(null)
    let timeout: ReturnType<typeof setTimeout>
    const pushQueryString = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        clearTimeout(timeout)
        const queryWithPluses = search.split(' ').join('+')
        if (search) history.push(`/search=${queryWithPluses}/page=1`)
        else history.push(`/`)
    }
    const onBlurHandler = () => setShowShortList(false)
    const onFocusHandler = () => setShowShortList(true)
    useEffect(() => {
        if (search) {
            timeout = setTimeout(async () => {
                document.activeElement === inputRef.current && setShowShortList(true)
                const data = await getShortSearchBookList(search)
                dispatch(searchActions.setShortBookList(data))
            }, 1000)
        } else dispatch(searchActions.setShortBookList([]))
        return () => {
            clearTimeout(timeout)
        }
    }, [search])
    useEffect(() => {
        searchTerm && setSearch(searchTerm)
    }, [searchTerm])
    return <>
        <form className='app__form search' onSubmit={pushQueryString}>
            <div className='search__input-pane'>
                <input type='text' className='search__input'
                    value={search}
                    ref={inputRef}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    onChange={e => setSearch(e.target.value)} />
                {(!!bookList.length && showShortList) && <div className='search__list book-list'>
                    {bookList.map(book => (<BookItem key={book.key} book={book} />))}
                </div>}
            </div>
            <input type='submit' value='Поиск' className='search__submit' />
        </form>
    </>
}

type Styles = {
    [key: string]: string
}