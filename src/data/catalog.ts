import booksJson from "./books.json"

export type Book = {
  id: string
  /** Section on the /knihy/ page (see BOOK_GROUPS). */
  group: string
  title: string
  authors: string[]
  year: number | null
  publisher: string | null
  pages: number | null
  isbn: string | null
  url: string
  description: string
  /** Paths of the pages where the book is listed under "Knihy k tématu". */
  topics: string[]
}

export const BOOKS = booksJson as Book[]

export const BOOK_GROUPS = [
  { id: "dejiny", title: "Dějiny komunismu a KSČ" },
  { id: "obeti", title: "Oběti, odpor a svědectví" },
]

export const bookById = (id: string) => BOOKS.find(book => book.id === id)

// "/ideologie" and "/ideologie/" are the same page.
export const booksForPath = (pathname: string) => {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`
  return BOOKS.filter(book => book.topics.includes(path))
}
