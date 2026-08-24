type CookieProps = {
  path?: string
  expires?: string | number | Date
  [key: string]: string | number | Date | boolean | undefined
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
    ),
  )

  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(
  name: string,
  value: string,
  props: CookieProps = {},
): void {
  const cookieProps: CookieProps = {
    path: '/',
    ...props,
  }

  let exp = cookieProps.expires

  if (typeof exp === 'number') {
    const date = new Date()
    date.setTime(date.getTime() + exp * 1000)
    exp = cookieProps.expires = date
  }

  if (exp instanceof Date) {
    cookieProps.expires = exp.toUTCString()
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`

  for (const propName in cookieProps) {
    const propValue = cookieProps[propName]

    if (propValue === undefined) {
      continue
    }

    updatedCookie += `; ${propName}`

    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  }

  document.cookie = updatedCookie
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 })
}
