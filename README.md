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
* Database Access
  * [Kysely](https://koskimas.github.io/kysely/)
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
  * [x] Config schema validation
  * [x] Define our Models...
    * User
    * Social Profile
    * Spot List
    * Spot
  * [ ] Allow users to login and logout
    * [ ] Login
      * [x] If we have not seen a user before, insert
      * [x] If we have seen a user before, update
      * [ ] Issue a cookie
  * [ ] Show a map on the home page
    * [x] with hacks
* [x] Day 4 - August 12th
  * [x] Setup Kysely Connection
  * [x] Setup DB Models with Kysely
  * [x] Setup DB migrations... with Kysely
  
* [ ] Day 5 - August 19th
  * [x] Replace DenoAuth with DenoGrant
  * [x] Get a Proper map on the page
  * [ ] Goals
    * Landing Page
    * Discord Sign In
    * Spot List creation page
  * [ ] Login
    * [ ] Upsert user into db
    * [ ] Figure out sessions
    * [ ] Issue a Cookie
      * Make sure cookie is signed
  * [ ] Design Flows and Layout
    * [ ] Landing Page
      * Description of the App
      * Recently updated lists
      * Popular lists
    * [ ] Navbar
      * [ ] Signup / Sign In
      * [ ] User State
    * [ ] Spot List Edit Page
    * [ ] Spot List Page
    * [ ] "Private / Logged In" Profile Page

# Stretch Features

* Comments on lists
* Favoriting / staring lists
* Posting pictures of food / events at the spots
* Lists can have a header / background image
* User profile that shows all the lists they've created
* Lists can be upvoted
