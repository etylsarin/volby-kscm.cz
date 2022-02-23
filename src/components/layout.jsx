import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import clasNames from "classnames";

import * as styles from "./layout.module.scss";

const Layout = ({ pageContext, children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageContext.frontmatter.title} | Komunisti z kola ven</title>
      <meta name="description" content={pageContext.frontmatter.description} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-2DBHBVRPLQ"></script>
    </Helmet>
    <Helmet
        script={[{ 
          type: 'text/javascript', 
          innerHTML: 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};gtag("js", new Date());gtag("config", "G-2DBHBVRPLQ");' 
        }]}
      />
    <main className={styles.page} data-testid={pageContext.frontmatter.theme}>
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
  </>
);

export default Layout;