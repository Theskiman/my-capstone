import { Route } from 'react-router-dom'
import {withRouter} from 'react-router'
import React, { Component } from "react"

const myApiUrl = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBCwcsCgOF-Ie11OlJBsJiDz-_1EobkIf0"

export default class ApplicationViews extends Component {
    {console.log(fetch(`${myApiUrl}`).then(e => e.json()))}
      
}