import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Book, useStore } from "@/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

export default function BookSearch() {
  const { books, addBook } = useStore((state) => state);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 100;

  type SearchResult = {
    docs: Book[];
    numFound: number;
  };

  const searchBooks = async (page: number = 1) => {
    if (!query) return;
    setIsLoading(true);
    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`
      );
      setResults(response.data.docs);
      setTotalResults(response.data.numFound);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching OpenLibrary API data", error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchBooks();
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      searchBooks(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
      searchBooks(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * resultsPerPage + 1;
  const endIndex = Math.min(startIndex + resultsPerPage - 1, totalResults);

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="sm:divide-y sm:divide-gray-200 sm:rounded-2xl sm:border sm:dark:divide-gray-700 sm:dark:border-gray-700">
        <div className="flex flex-col items-center gap-3 px-4 py-3 sm:flex-row">
          <div className="relative w-full sm:max-w-xs">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for next book."
              onKeyUp={handleKeyPress}
            />
          </div>
          <Button
            className="max-sm:w-full sm:max-w-xs"
            onClick={() => searchBooks()}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin " />
            ) : (
              "Search"
            )}
          </Button>
        </div>

        <div className="mt-4 overflow-auto max-h-64">
          {query.length > 0 && results.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Year</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    page Count
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto">
                {results.map((book: Book, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author_name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {book.first_publish_year}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {book.number_of_pages_median ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        onClick={() => {
                          addBook({
                            key: book.key,
                            title: book.title,
                            author_name: book.author_name,
                            first_publish_year: book.first_publish_year,
                            number_of_pages_median:
                              book.number_of_pages_median || null,
                            status: "backlog",
                          });
                        }}
                        disabled={books.some((b) => b.key === book.key)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center p-16 max-h-60">
              <p className="text-gray-600 dark:text-gray-400">
                Start your search.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-full gap-3 px-6 py-4 border-t border-gray-200 sm:flex-row sm:justify-between dark:border-gray-700">
          <div>
            <p className="tracking-wide text-gray-600 dark:text-gray-400">
              {totalResults > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {startIndex} - {endIndex}
                  </span>{" "}
                  out of{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {totalResults}
                  </span>{" "}
                  results.
                </>
              ) : (
                "0 results"
              )}
            </p>
          </div>
          <div className="inline-flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousClick}
              disabled={currentPage <= 1 || isLoading}
            >
              <SlArrowLeft className="size-4" />
            </Button>

            <Button
              variant="outline"
              onClick={handleNextClick}
              disabled={
                currentPage >= Math.ceil(totalResults / resultsPerPage) ||
                isLoading
              }
            >
              <SlArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
