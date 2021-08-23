import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

// React helmet
// @link https://github.com/zeit/next.js/tree/canary/examples/with-react-helmet
export default class extends Document {
  static async getInitialProps(ctx) {
    // Material UI SSR
    // @link https://antesepic.com/using-material-ui-and-styled-components-with-next-js/
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const documentProps = await super.getInitialProps(ctx)

    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return {
      ...documentProps,
      styles: (
        <>
          {documentProps.styles}
          {sheets.getStyleElement()}
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;300;400;500;600;700&display=swap" rel="stylesheet" />          
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
