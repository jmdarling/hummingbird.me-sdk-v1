# hummingbird.me SDK V1
SDK for the hummingbird.me API, V1.

## Usage
This project is in active development and aims to eventually implement all methods provided by the (hummingbird.me V1 API)[https://github.com/hummingbird-me/hummingbird/wiki/API-v1-Methods].

### Constructor
Create a new instance of the Hummingbird SDK by calling its constructor.
```
const Hummingbird = require('hummingbird.me-sdk-v1')
const hummingbird = new Hummingbird()
```

The constructor takes an optional "config override" as a parameter. The current config options available are:
```
{
  apiBaseUrl: 'https://hummingbird.me/api/v1' // Override this to change the base URL of the hummingbird.me API.
}
```

### Methods

#### getAnimeById(id)
Gets an anime object for the provided ID.
```
const Hummingbird = require('hummingbird.me-sdk-v1')
const hummingbird = new Hummingbird()

hummingbird.getAnimeById(1)
  .then(response => {
    console.log(response.body) // An anime object.
  })
  .catch(error => {
    console.error(error)
  })
```

#### searchAnime(termToSearch)
Searches for anime that match the provided search item.
```
const Hummingbird = require('hummingbird.me-sdk-v1')
const hummingbird = new Hummingbird()

hummingbird.searchAnime('Cowboy Bebop')
  .then(response => {
    console.log(response.body) // An array of anime objects.
  })
  .catch(error => {
    console.error(error)
  })
```
