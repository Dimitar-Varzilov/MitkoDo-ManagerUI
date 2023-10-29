export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}

export const getLocaleDateString = (string: string): string => {
  const date = new Date(string)
  return date.toLocaleDateString()
}

export const isoStringSplitter = (string: string): string => {
  return string.split('T')[0]
}

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\d\sa-zA-Z.,]).{8,}$/

export const checkPassword = (password: string) => {
  return passwordRegex.test(password)
}
