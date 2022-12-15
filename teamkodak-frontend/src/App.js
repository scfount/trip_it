import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";

import Login from "./components/Login";
import Logout from "./components/Logout";

import './App.css';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Map from './components/Map';
import AddTrip from './components/AddTrip';
import Favorites from './components/Favorites';
import TripDetails from './components/TripDetails';

import FavoritesDataService from './services/FavoritesDataService';
import TripDataService from './services/TripDataService';
import ProfileDataService from './services/ProfileDataService';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([])
  const [favoriteTrips, setFavoriteTrips] = useState([])
  const [editFavorites, setEditFavorites] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tripsByUser, setTripsByUser] = useState([]);
  const [profileTripsId, setProfileTripsId] = useState([]);

  const addFavorite = tripId => {
    setFavoriteIds([...favoriteIds, tripId]);
    setEditFavorites(true);
  }

  const deleteFavorite = tripId => {
    setFavoriteIds(favoriteIds.filter(f => f !== tripId));
    setEditFavorites(true);
  }

  const getFavoriteIds = () => {
    FavoritesDataService.getFavoriteIds(user.googleId)
      .then(response => {
        if (response.status === 200) {
          setFavoriteIds(response.data.favorites)
        }
      })
      .catch(e => {
        console.log("Favorites not found");
      })
  };

  //profile
  const getProfile = useCallback((id) => {
    ProfileDataService.getProfile(id)
      .then(response => {
        if (response.status === 202) {
          createProfile();
        }
        else if (response.status === 200) {
          setProfile(response.data);
          setProfileTripsId(response.data.trips);
        }
      })
      .catch(e => {
        console.log(e);
      });
  });

  const createProfile = useCallback(() => {
    const jsonBody = {
      _id: user.googleId,
      first_name: user.given_name,
      last_name: user.family_name,
      email: user.email,
      image: user.picture
    };
    ProfileDataService.createProfile(jsonBody)
      .then(response => {
        setProfile(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  });

  useEffect(() => {
    if (user !== null) {
      getProfile(user.googleId);
    }
  }, [user]);

  useEffect(() => {
    if (profile !== null && profile.trips !== null) {
      getTripsByListForProfile(profileTripsId);
    }
  }, [profile, profileTripsId]);

  const deleteTripApi = (tripId) => {
    TripDataService.deleteTrip(tripId)
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      })
  };

  const deleteTrip = (tripId) => {
    //delete trip from trips collection
    const notDeletedTrips = profileTripsId.filter(f => f !== tripId);
    setProfileTripsId(notDeletedTrips);
    deleteTripApi(tripId);
    //update profile's collection -> trips array without this deleted trip
    const updated = { ...profile, trips: notDeletedTrips }
    ProfileDataService.updateProfile(user.googleId, updated)
      .then(response => {
        console.log(response);
        setProfile(updated);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const getTripsByListForProfile = (tripsList) => {
    TripDataService.getTripsByList(tripsList)
      .then(response => {
        setTripsByUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  //end of profile

  const updateFavoriteIds = () => {
    let data = {
      _id: user.googleId,
      favorites: favoriteIds,
    }
    FavoritesDataService.updateFavoriteIds(data)
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now() / 1000;
      if (now < loginExp) {
        // Not expired
        console.log(loginData);
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  useEffect(() => {
    TripDataService.getTripsByList(favoriteIds)
      .then(response => {
        setFavoriteTrips(response.data)
      })
  }, [favoriteIds]);

  useEffect(() => {
    if (user != null) {
      getFavoriteIds();
    }
  }, [user]);

  useEffect(() => {
    if (editFavorites) {
      updateFavoriteIds();
      setEditFavorites(false)
    }
  }, [user, editFavorites]);

  return (
    <div className="">
      <GoogleOAuthProvider clientId={clientId}>
        <Navbar bg="light" expand="lg" sticky="top" variant="light">
          <Container className="w-75">
            <Navbar.Brand className="brand w-25" href="/">
              <img src='/images/logo.png' alt='TripIt logo' className='w-75' />
              {user ? <div /> :
                <div className=''>
                  <div className='' style={{ fontSize: '2vw'}}>Sign-in to share your adventures!</div>
                </div>
              }
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ?
              <Nav className="ms-auto">
                <Nav.Link as={Link} to={"/profile/" + user.googleId} className='ms-auto'>
                  My Profile
                </Nav.Link>
                <Nav.Link as={Link} to={"/favorites"} className='ms-auto'>
                  My Favorites
                </Nav.Link>
                <Nav.Link as={Link} to={"/add-trip"} className='ms-auto'>
                  Add Trip
                </Nav.Link>
                <div className='ms-auto'>
                  <Logout setUser={setUser} />
                </div>
              </Nav> :
              <Nav className='ms-auto'>
                <div className="ms-auto">
                  <Login setUser={setUser} />
                </div>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={
          <Feed
            user={user}
            tripsByUser={tripsByUser}
            favoriteTrips={favoriteTrips}
            favoriteIds={favoriteIds}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
          />
        }>
        </Route>
        <Route exact path={"/profile/:profileId"} element={
          <Profile
            profile={profile}
            getProfile={getProfile}
            tripsByUser={tripsByUser}
            deleteTrip={deleteTrip}
            profileTripsId={profileTripsId}
            getTripsByListForProfile={getTripsByListForProfile}
          />
        }>
        </Route>
        <Route exact path={"/add-trip"} element={
          <AddTrip
            profile={profile}
            tripsByUser={tripsByUser}
            setTripsByUser={setTripsByUser}
          />
        }>
        </Route>
        <Route exact path={"/favorites"} element={
          <Favorites
            favoriteTrips={favoriteTrips}
          />
        }>
        </Route>
        <Route exact path={"/map"} element={
          <Map
            user={user}
          />
        }>
        </Route>
        <Route exact path={"/trip-details"} element={
          <TripDetails
            user={user}
            favoriteIds={favoriteIds}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
          />
        } >
        </Route>
      </Routes>
    </GoogleOAuthProvider >
    </div >
  );
}

export default App;
