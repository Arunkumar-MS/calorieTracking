import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className='h-full bg-gray-100' lang="en-us">
        <title>
          Caloriese tracker
        </title>
        <meta name="description" content="This is caloriese tracking app. which helps you to keep fit by setting caloriese limte per day."/>
        <Head />
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument