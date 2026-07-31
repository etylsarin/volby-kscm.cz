import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import clasNames from "classnames";

import * as styles from "./page-layout.module.scss";

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
  const PAGE_URL = new URL(location?.pathname || "/", siteMetadata.siteUrl).href;

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'cs' }}
        title={TITLE}
        meta={[
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
        link={[{ rel: `canonical`, href: PAGE_URL }]}
      />
      <div className={styles.page}>
        <main className={styles.main}>
          <nav className={styles.menu}>
            <input type="checkbox" id="swith" />
            <label htmlFor="swith" aria-label="Menu" />
            <ul>
              <li><Link to="/">Úvod</Link></li>
              <li><Link to="/ideologie">Ideologie</Link></li>
              <li><Link to="/komunismus-v-cesku">Komunismus v Česku</Link></li>
              <li><Link to="/porevolucni-kscm">Porevoluční KSČM</Link></li>
              <li><Link to="/predstavitele-kscm">Představitelé KSČM</Link></li>
            </ul>
          </nav>
          <section
            className={clasNames(styles.section, frontmatter.theme, {
              [styles.sectionPlain]: !frontmatter.theme,
            })}
          >
            {children}
          </section>
        </main>
        <footer className={styles.footer}>
          <small>Podporujeme: <a href="https://www.nasdilejneztozakazou.cz/">Sdílejte, než to zakážou! pravá tvář Andreje Babiše</a> a <a href="https://www.petletzpet.cz/">Největší přešlapy bývalého prezidenta</a></small>
        </footer>
      </div>
    </>
  );
};

export default PageLayout;