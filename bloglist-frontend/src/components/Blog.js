
import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    updateBlog(
      {
        likes: blog.likes + 1
      } , blog.id
    )
  }

  const deleteButton = () => {
    console.log(blog.user.username)
    console.log(blog)
    console.log(user.username)
    if((blog.user !== null) && (blog.user.username === user.username)){
      return (
        <button onClick={() => {deleteBlog(blog.id)}}>Delete</button>
      )
    }
  }



  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} id='blogDetails'>
        <p>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button> <br/>
          {blog.author} <br/>
          {blog.url} <br/>
          Likes{' '}{blog.likes}
          <button onClick={addLike}>Like</button>
        </p>

        {deleteButton()}

      </div>
    </div>
  )
}

export default Blog