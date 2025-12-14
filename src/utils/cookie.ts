type CookieProps = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

export function getCookie(name: string): string | undefined {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('(?:^|; )' + escapedName + '=([^;]*)');
  const result = regex.exec(document.cookie);
  return result ? decodeURIComponent(result[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: CookieProps = {},
  ttlSeconds?: number
): void {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  let expiresDate: Date | undefined;

  if (ttlSeconds !== undefined) {
    expiresDate = new Date(Date.now() + ttlSeconds * 1000);
  } else if (props.expires !== undefined) {
    expiresDate =
      typeof props.expires === 'number'
        ? new Date(Date.now() + props.expires * 1000)
        : props.expires;
  }

  if (expiresDate) {
    cookieStr += `; expires=${expiresDate.toUTCString()}`;
  }

  if (props.path) cookieStr += `; path=${props.path}`;
  if (props.domain) cookieStr += `; domain=${props.domain}`;
  if (props.secure) cookieStr += `; Secure`;
  if (props.sameSite) cookieStr += `; SameSite=${props.sameSite}`;

  document.cookie = cookieStr;
}

export function deleteCookie(name: string, path = '/'): void {
  setCookie(name, '', { expires: new Date(0), path });
}
