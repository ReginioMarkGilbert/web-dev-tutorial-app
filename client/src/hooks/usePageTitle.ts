import { useLayoutEffect } from "react"

const SITE_NAME = "Web Dev Tutorials"

export default function usePageTitle(pageTitle?: string) {
  useLayoutEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME
  }, [pageTitle])
}
