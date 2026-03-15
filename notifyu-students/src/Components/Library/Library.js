import React, { useState, useEffect, useCallback } from 'react'
import './Library.css'
import axios from 'axios';

export default function Library({ usersInfo, userID }) {

    const [issuedbooks, setIssuedBooks] = useState([]);
    const [suggestedBooks, setSuggestedBooks] = useState([]);

    // fetch issued books:
    const getIssuedBooks = useCallback(async () => {
        const response = await axios.post("https://notify-u-student-module.onrender.com/api/getIssuedBookList", { userID });
        const issuedBookList = response.data;

        if (!issuedBookList || !issuedBookList.issuedBooks) {
            setIssuedBooks([<div key="none">No issued books found.</div>]);
            return;
        }

        const books = issuedBookList.issuedBooks;
        const bookElements = books.map((book, i) => {
            const isExpired = new Date(book.LastDate) < new Date();
            const className = isExpired ? "issuedBook dueDateExpired" : "issuedBook";
            return (
                <div key={i} className={className}>
                    Book: <b>{book.BookName}</b><br />
                    Issued On: <b>{book.IssuedDate}</b><br />
                    Due Date: <b>{book.LastDate}</b><br />
                    Charges: <b>₹{book.Fees}</b><br />
                </div>
            );
        });

        setIssuedBooks(bookElements);
    }, [userID]);

    // fetch all library books for suggestions:
    const getAllBooks = useCallback(async () => {
    try {
        const response = await axios.post("https://notify-u-student-module.onrender.com/api/getAllBooks");
        const data = response.data;

        if (!data || !data.bookList) return;

        const elements = data.bookList.map((book, i) => (
            <div key={i} className="suggestedBook">
                <div className='bookFront'>
                    <b>{book.BookName}</b><br />
                    {book.Author}<br />
                    {book.Topic1} | {book.Topic2}<br />
                    {book.Topic3}<br />
                </div>
            </div>
        ));

        setSuggestedBooks(elements);
    } catch (error) {
        console.error(error);
    }
}, []);

    useEffect(() => {
        getIssuedBooks();
        getAllBooks();
    }, [getIssuedBooks, getAllBooks]);

    return (
        <>
            <div className="libraryBG">
                <div className="issuedBG">
                    <h4>
                        Issued Books
                        <span>
                            <svg className='issuedSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                            </svg>
                        </span>
                    </h4>
                    <div className="issuedBG2">
                        {issuedbooks}
                    </div>
                </div>

                <div className="suggestionsBG">
                    <h4>
                        You might like
                        <span>
                            <svg className="suggestedSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                        </span>
                    </h4>
                    <div className="suggestionsBg2">
                        {suggestedBooks}
                    </div>
                </div>
            </div>
        </>
    )
}