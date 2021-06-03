import React from 'react'
import './../Styles/app.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { SearchPane } from './SearchPane'
import { BooksList } from './BooksList'

export const App = () => {
    return (
        <Router>
            <Route path="/search=:query/page=:pageNumber" >
                <SearchPane />
                <BooksList />
            </Route>
            <Route path="/" exact >
                <SearchPane />
            </Route>
        </Router>
    )
}


type Styles = {
    [key: string]: string
}