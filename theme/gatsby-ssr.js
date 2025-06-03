export { default as wrapRootElement } from './wrapRootElement'

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' })
}
