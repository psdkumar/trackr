import Head from 'next/head'

export default function Title({
  prefix = 'Trackr',
  children,
}: {
  prefix?: string
  children: string
}) {
  let title = children ? (prefix ? `${prefix} - ` : '') + children : prefix

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  )
}
