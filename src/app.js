const request = require('request')

let config = require('./config')

module.exports = class Hummingbird {

  /**
   * Creates an instance of Hummingbird.
   *
   * @param {object} configOverride
   */
  constructor (configOverride) {
    if (configOverride != null) {
      this.config = Object.assign({}, config, configOverride)
    } else {
      this.config = config
    }
  }

  /**
   * Gets the anime for the provided ID.
   *
   * @param {string} id The ID for which to get the anime.
   *
   * @returns The anime for the provided ID.
   */
  getAnimeById (id) {
    return this._getFromUrl(`${this.config.apiBaseUrl}/anime/${id}`)
  }

  /**
   * Returns an array of anime matching the provided search term.
   *
   * @param {string} termToSearch The search term to find anime for.
   *
   * @returns An array of anime matching the provided search term.
   */
  searchAnime (termToSearch) {
    return this._getFromUrl(`${this.config.apiBaseUrl}/search/anime?query=${termToSearch}`)
  }

  /**
   * Performs a GET request to the provided URL.
   *
   * @param {string} url The URL to make the get request to.
   *
   * @returns A promise with the HTTP response.
   */
  _getFromUrl (url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response) => {
        if (error) {
          return reject(error)
        }

        if (response.body != null) {
          try {
            response.body = JSON.parse(response.body)
          } catch (e) {
            return reject(e)
          }
        }

        return resolve(response)
      })
    })
  }
}
