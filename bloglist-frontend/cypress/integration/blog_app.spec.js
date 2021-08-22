

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Testi', password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })


  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Testi')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')

    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'Testi', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('testi title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#submit').click()
      cy.contains('testi title')
    })


    describe('and a blog exist', function() {
      beforeEach(function() {
        cy.contains('Create blog').click()
        cy.get('#title').type('testi title')
        cy.get('#author').type('author')
        cy.get('#url').type('url')
        cy.get('#submit').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('Like').click()
        cy.contains('Likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.contains('title').not()
      })

    })
  })
})

