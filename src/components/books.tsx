import * as React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import { AffiliateLink } from "./affiliate-link"
import {
  BOOK_GROUPS,
  BOOKS,
  bookById,
  booksForPath,
  type Book,
} from "../data/catalog"
import * as styles from "./books.module.scss"

const authorsOf = (book: Book) =>
  book.authors.length > 3
    ? `${book.authors.slice(0, 2).join(", ")} a další`
    : book.authors.join(", ")

// Typographic stand-in for the cover; real cover images would need the
// publisher's permission (or the partner program's product feed).
// Long titles get a smaller type size so they fit the narrow cover.
const coverScale = (title: string) =>
  title.length > 40 ? "0.8em" : title.length > 22 ? "0.95em" : "1.3em"

const Cover = ({ book }: { book: Book }) => (
  <span className={styles.cover} aria-hidden="true">
    <span className={styles.coverAuthor}>{authorsOf(book)}</span>
    <span
      className={styles.coverTitle}
      style={{ fontSize: coverScale(book.title) }}
    >
      {book.title}
    </span>
  </span>
)

// Affiliate link to a book, usable directly in MDX:
// <BookLink id="milada-horakova" /> renders the book title as the link text.
export const BookLink = ({
  id,
  children,
}: {
  id: string
  children?: React.ReactNode
}) => {
  const book = bookById(id)
  if (!book) {
    // Fail the build on a typo instead of shipping a dead link.
    throw new Error(`BookLink: neznámá kniha "${id}" (viz src/data/books.json)`)
  }
  return (
    <AffiliateLink book={book}>
      {children ?? <cite>{book.title}</cite>}
    </AffiliateLink>
  )
}

const Disclosure = () => (
  <p className={styles.disclosure}>
    Odkazy vedou do knihkupectví Knihy Dobrovský a jsou partnerské: když přes ně
    knihu koupíte, dostaneme malou provizi. Cena se pro vás nemění.
  </p>
)

// "Knihy k tématu" at the end of a page, from the books' `topics`.
export const PageBooks = ({ pathname }: { pathname: string }) => {
  const books = booksForPath(pathname)
  if (books.length === 0) return null
  return (
    <aside className={styles.pageBooks} aria-labelledby="knihy-k-tematu">
      <h2 id="knihy-k-tematu">Knihy k tématu</h2>
      <ul className={styles.grid}>
        {books.map(book => (
          <li key={book.id}>
            <AffiliateLink book={book} className={styles.item}>
              <Cover book={book} />
              <span>
                <cite className={styles.itemTitle}>{book.title}</cite>
                <span className={styles.itemMeta}>
                  {authorsOf(book)}
                  {book.year ? `, ${book.year}` : ""}
                </span>
              </span>
            </AffiliateLink>
          </li>
        ))}
      </ul>
      <p className={styles.disclosure}>
        Partnerské odkazy: při nákupu dostaneme provizi, cena se vám nemění.{" "}
        <Link to="/knihy/">Všechny knihy o komunismu</Link>
      </p>
    </aside>
  )
}

const PAGE_TITLES: Record<string, string> = {
  "/": "Úvod",
  "/ideologie/": "Ideologie",
  "/komunismus-v-cesku/": "Komunismus v Česku",
  "/porevolucni-kscm/": "Porevoluční KSČM",
  "/predstavitele-kscm/": "Představitelé KSČM",
}

// The full list on /knihy/, grouped, with schema.org Book data.
export const BookList = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Knihy o komunismu a KSČ",
    numberOfItems: BOOKS.length,
    itemListElement: BOOKS.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        name: book.title,
        url: book.url,
        inLanguage: "cs",
        author: book.authors.map(name => ({ "@type": "Person", name })),
        ...(book.year ? { datePublished: String(book.year) } : {}),
        ...(book.publisher
          ? { publisher: { "@type": "Organization", name: book.publisher } }
          : {}),
        ...(book.isbn ? { isbn: book.isbn } : {}),
        ...(book.pages ? { numberOfPages: book.pages } : {}),
      },
    })),
  }

  return (
    <div className={styles.list}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Disclosure />
      {BOOK_GROUPS.map(group => (
        <section key={group.id} aria-labelledby={`skupina-${group.id}`}>
          <h2 id={`skupina-${group.id}`} className={styles.groupTitle}>
            {group.title}
          </h2>
          {BOOKS.filter(book => book.group === group.id).map(book => (
            <article key={book.id} id={book.id} className={styles.card}>
              <AffiliateLink
                book={book}
                className={styles.coverLink}
                aria-hidden="true"
                tabIndex={-1}
              >
                <Cover book={book} />
              </AffiliateLink>
              <div>
                <h3 className={styles.title}>
                  <AffiliateLink book={book}>{book.title}</AffiliateLink>
                </h3>
                <p className={styles.meta}>
                  {[
                    book.authors.join(", "),
                    book.year,
                    book.publisher,
                    book.pages ? `${book.pages} stran` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p>{book.description}</p>
                <p className={styles.pages}>
                  <strong>Souvisí s:</strong>{" "}
                  {book.topics.map((path, index) => (
                    <React.Fragment key={path}>
                      {index > 0 && ", "}
                      <Link to={path}>{PAGE_TITLES[path] ?? path}</Link>
                    </React.Fragment>
                  ))}
                </p>
                <AffiliateLink book={book} className={styles.button}>
                  Koupit na Knihy Dobrovský
                </AffiliateLink>
              </div>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}
