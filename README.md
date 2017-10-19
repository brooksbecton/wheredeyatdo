# Where Dey At Do

An app that lets you know where someone is at. Some users will be able to post points on the map while others will be able to see those points.

## Why

Some public transportation use outdated and inaccurate location software. This is an attempt to provide a simple solution to keeping up where public transport currently is.

## Future

WDAD is currently a simple web site, but it would probably be better as a mobile app. Also using a phones native geolocation is probably going to be more accurate.

## Setup

  1. Create `settings.json` in root like:
  ```json
    {
        "admin": {
            "email": "admin@admin.admin",
            "pass": "admin",
            "name": "admin"
        },
        "bus": {
            "email": "bus@bus.bus",
            "pass": "bus",
            "name": "bus"
        }
    }
  ```

### Running the app

* `npm i`

* `meteor --settings settings.json`

* Go To localhost:3000

*There is a default bus account. email:`bus@bus.bus`  pass`bus`*
