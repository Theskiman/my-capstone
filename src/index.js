// import React from 'react';
// import ReactDOM from 'react-dom';
// // import ApplicationViews from "./components/ApplicationViews"
// import { BrowserRouter as Router } from "react-router-dom"

const myApiUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:Kingdom+of+Ash&key=AIzaSyBCwcsCgOF-Ie11OlJBsJiDz-_1EobkIf0"
const key = "key=AIzaSyBCwcsCgOF-Ie11OlJBsJiDz-_1EobkIf0"


const display = document.createElement("div")

console.table(fetch(`${myApiUrl}`).then(e => e.json()))

let getAPI = (bookName) => fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&${key}&maxResults=25&printType=books`)
    .then(book => book.json()
    .then(parsedBook => {
        parsedBook.items.forEach(item => {
            // debugger
        const imgContainer = document.createElement("img")
        const imageSource = item.volumeInfo.imageLinks.thumbnail
        if(imageSource !== undefined){
            imgContainer.src = imageSource
        }
        const titleH1 = document.createElement("h1")
        titleH1.textContent = `Title: ${item.volumeInfo.title}`

        const authorH2 = document.createElement("h2")
        authorH2.textContent = `Author: ${item.volumeInfo.authors}`

        const reviewH3 = document.createElement("h3")
        reviewH3.textContent = `Rating: ${item.volumeInfo.averageRating}`

        const summary = document.createElement("p")
        summary.textContent = `Summary: ${item.volumeInfo.description}`

        display.appendChild(imgContainer)
        display.appendChild(titleH1)
        display.appendChild(authorH2)
        display.appendChild(reviewH3)
        display.appendChild(summary)
        document.body.appendChild(display)
    })})
    )

getAPI("Mistborn")




