import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NOTIFICATION_TYPE from './constants/NotificationType'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogService.getAll()
      sortAndSetBlogs(blogs)
    }
    getAll()
  }, [])

  useEffect(() => {
    const storedLogIn = loginService.getLoggedUser()
    if (storedLogIn) {
      setUser(storedLogIn)
      blogService.setToken(storedLogIn.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      loginService.setLoggedUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationHelper('wrong username or password', NOTIFICATION_TYPE.ERROR)
    }
  }

  const handleLogout = () => {
    loginService.clearLoggedUser()
    setUser(null)
  }

  const setNotificationHelper = (message, type, timeout) => {
    setNotification({
      type,
      message
    })
    setTimeout(() => {
      setNotification(null)
    }, timeout ? timeout : 5000)
  }

  const sortAndSetBlogs = (blogs) => {
    setBlogs(blogs.sort((b1, b2) => {
      if (b1.likes > b2.likes)
        return -1
      else if (b1.likes < b2.likes)
        return 1
      else
        return 0
    }
    ))
  }

  const addLike = async (blog) => {
    await blogService.updateBlog(blog)
    sortAndSetBlogs(blogs.map((b) => b.id === blog.id ? blog : b))
  }

  const addBlog = async (blogObject) => {
    const blog = await blogService.createBlog(blogObject)
    setNotificationHelper(`a new blog ${blog.title} by ${blog.author} added`, NOTIFICATION_TYPE.SUCCESS)
    refBlogForm.current.toggleVisibility()
    sortAndSetBlogs(blogs.concat(blog))
  }

  const removeBlog = async (blog) => {
    await blogService.removeBlog(blog)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
  }

  const refBlogForm = useRef()

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new note" ref={refBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={addLike} user={user} handleRemove={removeBlog} />
      )}
    </div>
  )
}

export default App