export { default as wrapRootElement } from './wrapRootElement'

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: 'en' })

  const colorModeScript = `
    (function() {
      try {
        var mode = localStorage.getItem('theme-ui-color-mode');
        if (!mode) {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          mode = prefersDark ? 'dark' : 'default';
        }
        document.documentElement.setAttribute('data-theme-ui-color-mode', mode);
      } catch (e) {}
    })();
  `

  setPreBodyComponents([<script key='theme-ui-no-flash' dangerouslySetInnerHTML={{ __html: colorModeScript }} />])
}
