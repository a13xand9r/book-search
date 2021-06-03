import React from 'react'
import { Route } from 'react-router-dom'
import { SearchPane } from './SearchPane'
import { BooksList } from './BooksList'

export const App = () => {
    return <>
        <SearchPane />
        <Route path="/search=:query/page=:page" >
            <BooksList />
        </Route>
    </>
}


type Styles = {
    [key: string]: string
}