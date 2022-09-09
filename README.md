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
* OAuth 2
  * [DenoGrant](https://github.com/w3cj/deno_grant)

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
* [x] Day 5 - August 19th
  * [x] Replace DenoAuth with DenoGrant
  * [x] Get a Proper map on the page
  * [x] Login
    * [x] Upsert user into db
    * [x] Issue a Cookie
      * [x] Make sure cookie is signed
  * [x] Design Flows and Layout
    * [x] Color Pallette
      * https://coolors.co/56bc58-202030-ff8811-9649cb-a52422
    * [x] Landing Page
      * Description of the App
      * [x] Signup / Sign In
    * [x] Navbar
* [x] Day 6 - August 26th
  * [x] Work on TODOS
* [x] Day 7 - September 2nd
  * [x] Login
    * [x] Setup cookie session
  * [x] Navbar
    * [x] User State
* [ ] Day 8 - September 9th
  * [x] Update fresh
  * [ ] Fix login drop down on Chrome
  * [ ] Finish creating deps.ts
  * [ ] "Private / Logged In" Profile Page
  * [ ] Spot List Create Page
  * [ ] Spot List Page
  * [ ] Colors / Theme / twind setup

# Stretch Features

* Comments on lists
* Favoriting / staring lists
* Posting pictures of food / events at the spots
* Lists can have a header / background image
* User profile that shows all the lists they've created
* Lists can be upvoted

# AI Images
* Created by NGriffin_uk
  * https://labs.openai.com/s/Fc0tSwrtXy1MtX4jVM3HGZof
  * https://labs.openai.com/s/wM8r9YbnQAHEKQwl9hTNnN05