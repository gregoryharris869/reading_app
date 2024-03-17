import { useEffect, useState } from "react";
import BookSearch, { Book } from "./components/BookSearch";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storeBooks = localStorage.getItem("readingList");
    if (storeBooks) {
      setBooks(JSON.parse(storeBooks));
    }
  }, []);

  const addBook = (newBook: Book) => {
    const updateBooks: Book[] = [...books, { ...newBook, status: "backlog" }];

    setBooks(updateBooks);
    localStorage.setItem("readingList", JSON.stringify(updateBooks));
  };

  return (
    <div className="container mx-auto">
      <BookSearch onAddBook={addBook} />
      <BookList books={books} />
    </div>
  );
}

export default App;
