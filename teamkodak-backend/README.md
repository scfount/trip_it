# teamkodak-backend
Repository for all backend code for Team Kodak's Group Project (TripIt Travel Logging Web App)

# [Link to Deployed Backend](https://trip-it-backend-teamkodak.herokuapp.com/api/v1/trips/visibility/public)

## Iteration 3
- Most of the changes from the point of Iteration 3 occurred on the Frontend, with limited changes on the backend

### Team
- Finalized routing and api controllers
- Debugging minor backend issues

### Morgan
- AddTrip completed to fully utilize CRUD operations

### Stacy
- Automatic profile creation implmented with profiles collection
- Profile page utilizing CRUD operations for profiles and trips collections
    - Examples
        - Create profile (POST)
We now store the _id as google’s user id (which is a string)
https://trip-it-backend-teamkodak.herokuapp.com/api/v1/trips/profile

            -  {"_id":"113769174785288270601","first_name":"Stacy","last_name":"Hong","email":"stacykimh2@gmail.com","image":"https://lh3.googleusercontent.com/a/AEdFTp73-onmK47Q_tdMY9MhOdqCTLTCH6ymr_cFHr9Y=s96-c"}
        - Get profile by id (GET)
https://trip-it-backend-teamkodak.herokuapp.com/api/v1/trips/profile/104949575134075165583
        - Update profile (PUT)
In this example we are adding a trip to a new user
Add a user id to the parameter and pass with a json body
https://trip-it-backend-teamkodak.herokuapp.com/api/v1/trips/profile/104949575134075165583
            - {"first_name":"Stacy","last_name":"Hong","image":"https://lh3.googleusercontent.com/a/AEdFTp73-onmK47Q_tdMY9MhOdqCTLTCH6ymr_cFHr9Y=s96-c","trips":["639a39aeefce8b474bc36901"]}
        - Delete profile (DELETE)
https://trip-it-backend-teamkodak.herokuapp.com/api/v1/trips/profile/104949575134075165583

### Steven
- TripDetail completed to fully utilize getting from DB

## Iteration 2
#### Morgan
- Debugging of the getTrips method for populating the trip Feed page. Experienced an issue due to a slight routing inconsistency.
#### Stacy
- API for Profile
    - Create Profile
    - Get Profile
    - Update Profile
    - Delete Profile
#### Steven
- Implement Favorites API
    - Logic for controller and DAO
- Minor fixes to Trips API


## Iteration 1

#### Steven Fountain
Task Name : Get All Trips API
Task Description:
    -Implement backend api route to get all trips so that we can test the backend endpoint on Insomnia and Heroku.
ScreenShot Heroku:
<img width="1188" alt="image" src="https://media.github.khoury.northeastern.edu/user/9268/files/a24b75d4-7886-435d-8415-fb208ecf5a12">

ScreenShot Insomnia:
<img width="950" alt="image" src="https://media.github.khoury.northeastern.edu/user/9268/files/6ceb9fab-7e40-4bea-96fc-cc4bcb32071f">

#### Morgan Levy
Task Name: Backend skeleton
Task Description:
- add backend api routes
- add controller methods
- add DAO methods

Task Name: Implement backend CRUD - Favorites
Task Description:
- Implement controller and DAO methods for Favorites


#### Stacy Hong
Task Name: Heroku and MongoDB Atlas Setup
Task Description:
Sign up and set up production.

Task Name: Deploy Iteration 1 to Heroku
Task Description:
Verify all iteration 1 criteria met and deploy frontend and backend as heroku web apps.

Task Name: Dummy Data for MongoDB
Task Description: Set up dummy data so that get all trips works for heroku and backend.
MongoDB Database Data Schema: 
<img width="1329" alt="image" src="https://media.github.khoury.northeastern.edu/user/9268/files/e0e32b6b-a7e6-4196-8854-ba72ef41ed87">
