/* eslint-env mocha */
const assert = require('assert')
const config = require('../bin/config')
const Hummingbird = require('../bin/app')

describe('Hummingbird', () => {
  describe('#constructor', () => {
    it('Uses the default config if no override is provided', () => {
      // Arrange.
      // Act.
      const hummingbirdClient = new Hummingbird()

      // Assert.
      for (let configValueKey in config) {
        if (!config.hasOwnProperty(configValueKey)) {
          continue
        }

        assert(hummingbirdClient.config[configValueKey] != null)
        assert(hummingbirdClient.config[configValueKey] === config[configValueKey])
      }
    })

    it('Uses the provided values if the optional override config is provided', () => {
      // Arrange.
      const configOverride = {
        apiBaseUrl: 'https://test.com',
        testValue: 'test'
      }

      // Act.
      const hummingbirdClient = new Hummingbird(configOverride)

      // Assert.
      for (let configValueKey in configOverride) {
        if (!configOverride.hasOwnProperty(configValueKey)) {
          continue
        }

        assert(hummingbirdClient.config[configValueKey] != null)
        assert(hummingbirdClient.config[configValueKey] === configOverride[configValueKey])
      }
    })
  })

  describe('#getAnimeById(id)', () => {
    it('Correctly gets an anime when a valid ID is provided.', () => {
      // Arrange.
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
