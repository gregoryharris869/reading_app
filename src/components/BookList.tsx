import { Book } from "./BookSearch";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export const BookList = ({
  books,
  onMoveBook,
}: {
  books: Book[];
  onMoveBook: (book: Book, targetList: Book["status"]) => void;
}) => {
  const moveToList = (book: Book, targetList: Book["status"]) => {
    onMoveBook(book, targetList);
  };
  const renderBookItem = (book: Book, index: number, listType: string) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author_name}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            onClick={() => moveToList(book, "inprogress")}
            disabled={listType === "inprogress"}
          >
            In Progress
          </Button>
          <Button
            variant="outline"
            onClick={() => moveToList(book, "backlog")}
            disabled={listType === "backlog"}
          >
            Backlog
          </Button>
          <Button
            variant="outline"
            onClick={() => moveToList(book, "done")}
            disabled={listType === "done"}
          >
            Done
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
  return (
    <div className="p-4 space-y-8">
      <h2 className="mb-4 text-2xl font-bold">Reading List</h2>
      {books.filter((book) => book.status === "inprogress").length > 0 && (
        <>
          <h3 className="mb-2 font-semibold test-xl">In Progress</h3>
          <div>
            {books
              .filter((book) => book.status === "inprogress")
              .map((book, index) => renderBookItem(book, index, "inprogress"))}
          </div>
        </>
      )}
      {books.filter((book) => book.status === "backlog").length > 0 && (
        <>
          <h3 className="mb-2 font-semibold test-xl">Backlog</h3>
          <div>
            {books
              .filter((book) => book.status === "backlog")
              .map((book, index) => renderBookItem(book, index, "backlog"))}
          </div>
        </>
      )}
      {books.filter((book) => book.status === "done").length > 0 && (
        <>
          <h3 className="mb-2 font-semibold test-xl">Done</h3>
          <div>
            {books
              .filter((book) => book.status === "done")
              .map((book, index) => renderBookItem(book, index, "done"))}
          </div>
        </>
      )}
    </div>
  );
};
