/* eslint-env mocha */
const assert = require('assert')

describe('Hummingbird', () => {
  describe('#getAnimeById(id)', () => {
    it('Correctly gets an anime when a valid ID is provided.', () => {
      // Arrange.
      const Hummingbird = require('../src/app')
      const hummingbirdClient = new Hummingbird()
      const idToSearch = 1

      // Act.
      // Assert.
      return hummingbirdClient.getAnimeById(idToSearch)
        .then(response => {
          assert(response != null)
          assert(response.statusCode === 200)
          assert(response.body != null)
          assert(response.body.id === 1)
          assert(response.body.slug === 'cowboy-bebop')
        })
    })
  })

  describe('#searchAnime(searchTerm)', () => {
    it('Correctly gets at least the expected anime, when the title of a known anime is provided.', () => {
      // Arrange.
      const Hummingbird = require('../bin/app')
      const hummingbirdClient = new Hummingbird()
      const termToSearch = 'Cowboy Bebop'

      // Act.
      // Assert.
      return hummingbirdClient.searchAnime(termToSearch)
        .then(response => {
          assert(response != null)
          assert(response.statusCode === 200)
          assert(response.body != null)
          assert(Array.isArray(response.body))

          for (let anime of response.body) {
            if (anime.id === 1 && anime.slug === 'cowboy-bebop') {
              return
            }
          }

          assert(false)
        })
    })
  })
})
