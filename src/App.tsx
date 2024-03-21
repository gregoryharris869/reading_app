import { useEffect } from "react";
import BookSearch from "./components/BookSearch";
import { BookList } from "./components/BookList";
import { useStore } from "./store";
import { Layout } from "./components/Layout";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const { loadBooksFromLocalStorage } = useStore((state) => state);

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, [loadBooksFromLocalStorage]);

  return (
    <Layout>
      <BookSearch />
      <TooltipProvider>
        <BookList />
      </TooltipProvider>
    </Layout>
  );
}

export default App;
