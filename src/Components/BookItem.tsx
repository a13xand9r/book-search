import React from 'react'
import { BookItemType } from '../API/api'
import '../Styles/bookItem.css'
import bookIcon from '../Assets/img/avatar_book-sm.png'

export const BookItem: React.FC<PropsType> = ({ book }) => {
    return (
        <div className='book-list__item book-item'>
            <div className='book-tem__cover'>
                {book.cover_i ?
                    <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} height='55' width='40' alt='' /> :
                    <img src={bookIcon} height='55' width='40' alt='' />
                }
             </div>
            <div className='book-item__text'>
                <div className='book-item__author'>Автор: {book.author_name}</div>
                {book.title}
            </div>
        </div>
    )
}

type PropsType = {
    book: BookItemType
}
