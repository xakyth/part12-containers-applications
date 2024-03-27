import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLikeButton = (event) => {
    handleLike({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlogButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

  const removeBlogButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button onClick={handleRemoveBlogButton}>remove</button>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle} className="blog" >
      <div style={hideWhenExpanded} className="blogShort">
        <div>{blog.title} {blog.author}<button onClick={toggleExpanded}>view</button></div>
      </div>
      <div style={showWhenExpanded} className="blogFull">
        <div>{blog.title} {blog.author}<button onClick={toggleExpanded}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeButton}>like</button></div>
        <div>{blog.user.name}</div>
        {removeBlogButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog