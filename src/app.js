const request = require('request')

let config = require('./config')

module.exports = class Hummingbird {

  constructor (configOverride) {
    if (configOverride != null) {
      this.config = Object.assign(config, configOverride)
    } else {
      this.config = config
    }
  }

  getAnimeById (id) {
    return this._getFromUrl(`${this.config.apiBaseUrl}/anime/${id}`)
  }

  searchAnime (termToSearch) {
    return this._getFromUrl(`${this.config.apiBaseUrl}/search/anime?query=${termToSearch}`)
  }

  _getFromUrl (url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, response) => {
        if (error) {
          return reject(error)
        }

        if (response.body != null) {
          response.body = JSON.parse(response.body)
        }

        return resolve(response)
      })
    })
  }
}
