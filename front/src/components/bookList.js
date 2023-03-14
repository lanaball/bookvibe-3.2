import { useState, useEffect } from "react";

const BookList = () => {
     const [books, setBooks] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/')
            const json = await response.json()

            if (response.ok) {
              setBooks(json)
            }
        } 

        fetchBooks()
    }, [])
   

    return (
        <div className="book-list">
            <div className="book-list__books">
                {books && books.map((book) => (
                    <p key={book._id}>{book.title }</p>
                ))}
            </div>
        </div>
    )
}

export default BookList