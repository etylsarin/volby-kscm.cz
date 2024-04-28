import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import clasNames from "classnames";

import * as styles from "./page-layout.module.scss";

export const PageLayout = ({ pageContext, children }) => {
  const { site: { siteMetadata }} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const TITLE = `${pageContext.frontmatter.title} | ${siteMetadata.title}`;
  const DESC = pageContext.frontmatter.description || siteMetadata.description;  

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
      />
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.menu}>
            <input type="checkbox" id="swith" />
            <label htmlFor="swith" />
            <ul>
              <li><Link to="/">Úvod</Link></li>
              <li><Link to="/ideologie">Ideologie</Link></li>
              <li><Link to="/komunismus-v-cesku">Komunismus v česku</Link></li>
              <li><Link to="/porevolucni-kscm">Porevoluční KSČM</Link></li>
              <li><Link to="/predstavitele-kscm">Představitelé KSČM</Link></li>
            </ul>
          </div>
          <section className={clasNames(styles.section, pageContext.frontmatter.theme)}>
            {children}
          </section>
        </main>
        <footer className={styles.footer}>
          <small>Podporujeme: <a href="https://www.nasdilejneztozakazou.cz/">Sdílejte, než to zakážou! pravá tvář Andreje Babiše</a> a <a href="https://www.petletzpet.cz/">Největší přešlapy současného prezidenta</a></small>
        </footer>
      </div>
    </>
  );
};

export default PageLayout;