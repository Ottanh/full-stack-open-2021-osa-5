import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((b, a) => {
        return a.likes - b.likes
      })
      setBlogs(blogs)
    })
  }, [])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })


      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObj) => {

    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObj)

    setBlogs(blogs.concat(addedBlog))
    setMessage('New blog added!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addLike = async (blogObj, id) => {

    const updatedBlog = await blogService.update(blogObj, id)
    let copy = [...blogs]
    let index = copy.findIndex(x => x.id === id)
    copy[index] = updatedBlog
    copy.sort((b, a) => {
      return a.likes - b.likes
    })
    setBlogs(copy)
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if(window.confirm(`Delete ${blog.title}`)){
      await blogService.deleteBlog(id)
      const response = await blogService.getAll()
      setBlogs(response)
    }

  }


  const displayBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={addLike} user={user} removeBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div>
        {message}
      </div>
    )
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :

        <div>
          <p>{user.name} logged in
            <button onClick={logout}>Logout</button>
          </p>

          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {displayBlogs()}
        </div>
      }

    </div>
  )
}

export default App