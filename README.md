# volby-kscm.cz

**Komunisti z kola ven** — web o KSČM, jejích představitelích a o tom, co komunistický režim v Československu znamenal. Stránky jsou psané v MDX v [src/pages/](./src/pages/), vzhled a menu v [src/components/page-layout.tsx](./src/components/page-layout.tsx).

Web běží na [Gatsby](https://www.gatsbyjs.com/) a je nasazený na GitHub Pages (doména v [static/CNAME](./static/CNAME), aby ji každé nasazení zachovalo). Sesterské weby: [nasdilejneztozakazou.cz](https://www.nasdilejneztozakazou.cz/) a [petletzpet.cz](https://www.petletzpet.cz/).

## Knihy

- Seznam knih je v [src/data/books.json](./src/data/books.json): odkaz do Knih Dobrovský, vlastní popis, skupina na stránce `/knihy/` a `topics` = cesty stránek, kde se kniha objeví v bloku „Knihy k tématu“.
- V textu stránek lze na knihu odkázat komponentou `<BookLink id="milada-horakova" />` (vypíše název) nebo `<BookLink id="…">vlastní text</BookLink>`. Neznámé `id` shodí build.
- Stránka [src/pages/knihy.mdx](./src/pages/knihy.mdx) vykresluje celý seznam komponentou `<BookList />`.

## Partnerský program Knih Dobrovský

Stejné nastavení jako na nasdilejneztozakazou.cz: program běží přes **CJ (Commission Junction)**. CJ přiděluje ID (`CJ_PID`) každému webu zvlášť — přidejte volby-kscm.cz jako další web ve stejném účtu CJ, doplňte `CJ_PID` a `CJ_AID` v [src/data/affiliate.ts](./src/data/affiliate.ts) a web znovu nasaďte. Do té doby vedou odkazy přímo do obchodu. Odkazy mají `rel="sponsored"` a kliky se v Google Analytics zaznamenávají jako událost `affiliate_click`.

## Důvěryhodné zdroje

Seznam doporučených webů v patičce je v [src/data/resources.ts](./src/data/resources.ts) (stejný jako na sesterských webech).

## Vývoj

```shell
yarn install
yarn develop   # http://localhost:8000
yarn build     # produkční build do public/
yarn serve     # náhled produkčního buildu
yarn deploy    # čistý build + publikace na gh-pages
```
