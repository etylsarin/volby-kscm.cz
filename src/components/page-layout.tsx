import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import clasNames from "classnames";

import { AffiliateSourceContext, pathToSid } from "./affiliate-link";
import { BookLink, BookList, PageBooks } from "./books";
import { RESOURCES } from "../data/resources";

import * as styles from "./page-layout.module.scss";
import uvodHero from "../images/prazske-jaro-1968.avif";
import ideologieHero from "../images/marx-lenin-stalin.avif";
import komunismusHero from "../images/hranice-cssr.avif";
import porevolucniHero from "../images/sametova-revoluce.avif";
import predstaviteleHero from "../images/vojtech-filip.avif";

// A themed page's hero photo is a CSS background (see the hero mixin), which
// the browser would only find once the stylesheet has loaded. It is the
// page's largest paint, so it is preloaded with the HTML instead. Browsers
// without AVIF skip the preload and take WebP or JPEG from image-set().
const HERO_IMAGES = {
  uvod: uvodHero,
  ideologie: ideologieHero,
  "komunismus-v-cesku": komunismusHero,
  "porevolucni-kscm": porevolucniHero,
  "predstavitele-kscm": predstaviteleHero,
};

// Utility pages that Google crawls but must never index: the 404 handler
// (served with a 200 by GitHub Pages) and the empty app shell that
// gatsby-plugin-offline emits.
const NOINDEX_PATHS = [
  "/404",
  "/404.html",
  "/offline-plugin-app-shell-fallback",
];

// Components available in every MDX page without an import.
const MDX_COMPONENTS = { BookLink, BookList };

export const PageLayout = ({ pageContext, location, children }) => {
  const { site: { siteMetadata }} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  const frontmatter = pageContext?.frontmatter || {};
  const TITLE = frontmatter.title
    ? `${frontmatter.title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const DESC = frontmatter.description || siteMetadata.description;
  const PATHNAME = location?.pathname || "/";
  const NOINDEX = NOINDEX_PATHS.some(
    (path) => PATHNAME === path || PATHNAME === `${path}/`
  );
  // The host 301s /foo to /foo/, so the canonical must always be the
  // trailing-slash form — otherwise Google indexes a redirecting URL.
  const CANONICAL_PATH = /\/$|\.[^/]+$/.test(PATHNAME)
    ? PATHNAME
    : `${PATHNAME}/`;
  const PAGE_URL = new URL(CANONICAL_PATH, siteMetadata.siteUrl).href;
  const HERO = HERO_IMAGES[frontmatter.theme];

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'cs' }}
        title={TITLE}
        meta={[
          ...(NOINDEX
            ? [{ name: `robots`, content: `noindex, follow` }]
            : []),
          {
            name: `description`,
            content: DESC,
          },
          {
            property: `og:title`,
            content: TITLE,
          },
          {
            property: `og:description`,
            content: DESC,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:url`,
            content: PAGE_URL,
          },
          {
            property: `og:site_name`,
            content: siteMetadata.title,
          },
          {
            property: `og:locale`,
            content: `cs_CZ`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:title`,
            content: TITLE,
          },
          {
            name: `twitter:description`,
            content: DESC,
          },
        ]}
        link={[
          { rel: `canonical`, href: PAGE_URL },
          ...(HERO
            ? [
                {
                  rel: `preload`,
                  as: `image`,
                  href: HERO,
                  type: `image/avif`,
                  fetchpriority: `high`,
                },
              ]
            : []),
        ]}
      />
      <div className={styles.page}>
        <main className={styles.main}>
          <nav className={styles.menu}>
            <input type="checkbox" id="swith" aria-label="Menu" />
            <label htmlFor="swith" />
            <ul>
              <li><Link to="/">Úvod</Link></li>
              <li><Link to="/ideologie/">Ideologie</Link></li>
              <li><Link to="/komunismus-v-cesku/">Komunismus v Česku</Link></li>
              <li><Link to="/porevolucni-kscm/">Porevoluční KSČM</Link></li>
              <li><Link to="/predstavitele-kscm/">Představitelé KSČM</Link></li>
              <li><Link to="/knihy/">Knihy</Link></li>
            </ul>
          </nav>
          <section
            className={clasNames(styles.section, frontmatter.theme, {
              [styles.sectionPlain]: !frontmatter.theme,
            })}
          >
            <AffiliateSourceContext.Provider value={pathToSid(PATHNAME)}>
              <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
              <PageBooks pathname={PATHNAME} />
            </AffiliateSourceContext.Provider>
          </section>
        </main>
        <footer className={styles.footer}>
          <small>
            Důvěryhodné zdroje:{" "}
            {RESOURCES.map((item, index) => (
              <React.Fragment key={item.url}>
                {index > 0 && " · "}
                <a href={item.url}>{item.name}</a>
              </React.Fragment>
            ))}
          </small>
          <small>
            Odkazy na <Link to="/knihy/">knihy</Link> vedou do knihkupectví Knihy
            Dobrovský a jsou partnerské: když přes ně knihu koupíte, dostaneme
            malou provizi. Cena se pro vás nemění.
          </small>
          <small>Podporujeme: <a href="https://www.nasdilejneztozakazou.cz/">Sdílejte, než to zakážou! Kauzy Andreje Babiše</a> a <a href="https://www.petletzpet.cz/">Největší přešlapy bývalého prezidenta</a></small>
        </footer>
      </div>
    </>
  );
};

export default PageLayout;