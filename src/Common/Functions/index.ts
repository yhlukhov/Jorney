// To Fetch id as last /part of url address
export function getIdFromUrl() {
  let urlParts = window.location.pathname.split('/')
  return urlParts[urlParts.length -1]
}