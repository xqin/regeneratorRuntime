import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SearchResult from '/components/search-result'

const Hello = () => <SearchResult type="resultPage" />

export default Hello

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
