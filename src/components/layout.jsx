import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";

const Layout = ({ pageContext, children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageContext.frontmatter.title}</title>
      <meta name="description" content={pageContext.frontmatter.description} />
      <meta name="google-site-verification" content="MUOrpoypPDrHGG_hngCAq-EOeOFahJFYH6LwFkVPm-M" />
    </Helmet>
    <main>
      <ul>
      <li><Link to="/">Úvod</Link></li>
        <li><Link to="/ideologie">Ideologie</Link></li>
        <li><Link to="/komunismus-v-cesku">Komunismus v česku</Link></li>
        <li><Link to="/porevolucni-kscm">Porevoluční KSČM</Link></li>
        <li><Link to="/osobnosti-kscm">Osobnosti KSČM</Link></li>
      </ul>
      {children}
    </main>
  </>
);

export default Layout;