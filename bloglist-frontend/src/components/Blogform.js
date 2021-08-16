import React from 'react'

const BlogForm = ({addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl}) => (
    <form onSubmit={addBlog}>
    <div>
      Title: 
      <input value={newTitle}
      onChange={handleTitleChange} />
    </div>
    <div>
      Author: 
      <input value={newAuthor}
      onChange={handleAuthorChange}/>
    </div>
    <div>
      URL: 
      <input value={newUrl}
      onChange={handleUrlChange}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
  )


export default BlogForm