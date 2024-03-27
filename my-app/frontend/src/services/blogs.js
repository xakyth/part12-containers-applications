import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let headers = null

const setToken = (newToken) => {
  token = newToken
  headers = {
    headers: { Authorization: `Bearer ${token}` },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, headers)
  return request.then((response) => response.data)
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

const updateBlog = async (blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    headers
  )
  return response.data
}

const removeBlog = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, headers)
}

export default { getAll, createBlog, setToken, updateBlog, removeBlog }
