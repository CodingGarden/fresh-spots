# Fresh Spots

* Users can create and share lists of places to visit
* Features
  * A user can sign up with social auth / login / logout
  * A user can CRUD lists
  * A user can add a specific Point of Interest (POI) to the list
  * A user can add a comment / more info to a given POI
  * A user can share this list with anyone

* Backend Framework
  * [Deno + Fresh](https://fresh.deno.dev/)
* ORM
  * [DenoDB](https://eveningkid.com/denodb-docs/)
* Auth
  * [DenoAuth](https://www.denoauth.org/docs)

The code is in the [app](/app/) directory. See the README there for setup directions.

---

## TODO

* Day 1
  * [x] Upgrade Deno
  * [x] Generate Fresh Project
  * [x] Familiarize myself with Fresh
  * [x] Linter?
  * [x] Setup the database
    * [x] Docker Postgres
  * [x] Create a users table
  * [x] At least 1 route that returns data from DB
* Day 2
  * [x] Update the README
  * [x] use dotenv from std library
    * https://deno.land/std@0.150.0/dotenv
  * [x] Use source maps everywhere...
  * [x] Figure out DenoAuth
  * [x] Design the Database
* Day 3 - (August 5th 2022)
  * [ ] Config schema validation
  * [ ] Define our Models...
    * User
    * Social Profile
    * Spot List
    * Spot
  * [ ] Allow users to login and logout
  * [ ] Show a map on the home page

# Stretch Features
* Social Features
  * Comments on lists
  * Favoriting / staring lists
  * Posting pictures of food / events at the spots would be pretty cool, similar to Yelp or Amazon reviews
  * Lists can have a header / background image
  * User profile that shows all the lists they've created
  * Lists can be upvoted
