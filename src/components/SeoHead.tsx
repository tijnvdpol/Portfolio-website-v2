import { Helmet } from 'react-helmet-async'

type SeoHeadProps = {
  title: string
  description: string
  noIndex?: boolean
}

export default function SeoHead({ title, description, noIndex }: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </Helmet>
  )
}
