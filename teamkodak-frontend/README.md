# teamkodak-frontend
Repository for all frontend code for Team Kodak's Group Project (TripIt Travel Logging Web App)

# [Link to Deployed Frontend](https://trip-it-frontend-teamkodak.herokuapp.com/)

## Iteration 3

### Team
- Debugging (LOTS of debugging)

### Morgan
- AddDestination component completed for the AddTrip page, with functional autocomplete to load
destination lat/long to work with Map component
- AddTrip component completed for user's to create and post (and edit) their trips
    ![](./public/images/AddTrip.JPG)
- Map component creation to use google maps api to show destinations associated with a trip
- Auto-zoom functionality implemented for Mapping of singular trips
    ![](./public/images/Map.JPG)

### Stacy
- Handled all Heroku deployment of app and MongoDB online database
- Created Profile page (accessible from top of page) which utilizes Google Login info
- Profile page displays two views, controlled by Toggle button:
    - List View, displays trips as cards
        ![](./public/images/ProfileList.JPG)
    - Map View, displays singular trips on Google Map with carousel functionality to iterate through all the user's trips
        ![](./public/images/ProfileMap.JPG)

### Steven
- Handled majority of final styling for web app components (TripDetails, AddTrip, Profile, NavBar, Trip Cards)
- Implemented the TripDetails page to display finalized trips
    ![](./public/images/TripDetail.JPG)
- Finalized Feed component to utilize all possible filters for trips
    ![](./public/images/Feed.JPG)

### Iteration 2 README additions:
#### Morgan

- Creation of an ApiKey via Google Credentials to allow for use of google components embedded into the Tripit web app. (Must be hardcoded in final code for use by other google users)

- Research into Google’s ‘Autocomplete’ react library to allow for autocompletion of locations via a search bar component.
- Implementation of the Autocomplete feature for adding ‘destinations’ on the AddDestination component. This feature returns a ‘Place’ object which gives location info (address, lat, long, etc.)

- Creation of the AddTrip.js frontend page, a page to create/edit trips by populating FormControl fields.
- Collaborated with group members to develop data schemas for the trips collection in our Mongo database

<img width="516" alt="image" src="https://media.github.khoury.northeastern.edu/user/7604/files/b56b4977-c75f-443a-8fb2-ad7f9ad7b10d">


#### Stacy
- Profile Page Creation (not yet pushed as I am still working on functionalities)
<img width="611" alt="image" src="https://media.github.khoury.northeastern.edu/user/7604/files/505c6de0-577f-4d9e-a6f3-61143b7c44d4">


#### Steven
- Add hooks for managing user favorites
- Clickable icons to add/delete favorite
- Implement logic to filter feed by favorites
- Implement My Favorites Component

<img width="1386" alt="image" src="https://media.github.khoury.northeastern.edu/user/7604/files/4c71e190-eed8-43ce-89dc-7da1154d3ac3">



### Iteration 1
#### Steven Fountain
Task Name: Implemented the frontend skeleton for the main trip's page
Task Description:
- setup react app
- add components
- add services
- add routes
- add initial navigation
ScreenShot Heroku FrontEnd:
<img width="1475" alt="image" src="https://media.github.khoury.northeastern.edu/user/9268/files/9365cc3f-fd21-4ae9-93cd-de3e69cf6c22">

Task Name: Implement Trip card component
Task Description:
- build Trip component to display a Trip
- have all info needed passed in as a prop
    - Trip name
    - Trip details
    - image url

Task Name: add TripIt logo
Task Description:
 - add logo to home page
- set logo as favicon
- add to /public/images

