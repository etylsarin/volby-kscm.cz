declare module "*.mdx" {
  let MDXComponent: (props) => JSX.Element
  export default MDXComponent
}

declare module "*.scss"

declare module "*.avif" {
  const src: string
  export default src
}
