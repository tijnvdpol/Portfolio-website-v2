import { Helmet } from 'react-helmet-async'

type SeoHeadProps = {
  title: string
  description: string
}

export default function SeoHead({ title, description }: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}
