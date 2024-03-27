import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const submitBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(blogObject)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitBlog}>
        <div>title:<input type="text" value={title} onChange={handleTitleChange} placeholder='Title'></input></div>
        <div>author:<input type="text" value={author} onChange={handleAuthorChange} placeholder='Author'></input></div>
        <div>url:<input type="text" value={url} onChange={handleUrlChange} placeholder='URL'></input></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )
}

export default BlogForm