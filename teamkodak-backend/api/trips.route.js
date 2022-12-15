import express from 'express';
import TripsController from './trips.controller.js';
import ProfilesController from './profiles.controller.js';
import FavoritesController from './favorites.controller.js';

const router = express.Router();

// Trips Routes
router.route("/visibility/:visibility").get(TripsController.apiGetTrips);
router.route("/trip").post(TripsController.apiCreateTrip)
    .put(TripsController.apiUpdateTrip);
router.route("/trip/:tripId").get(TripsController.apiGetTripByTripId)
    .delete(TripsController.apiDeleteTripById);
router.route("/getAllTripsByList").get(TripsController.apiGetAllTripsByList);

// Profile Routes
router.route("/profile").post(ProfilesController.apiCreateProfile);
router.route("/profile/:profileId").get(ProfilesController.apiGetProfileById)
    .put(ProfilesController.apiUpdateProfileById)
    .delete(ProfilesController.apiDeleteProfileById);

// Favorites Routes
router.route("/favorites/:profileId").get(FavoritesController.apiGetFavorites);
router.route("/favorites").put(FavoritesController.apiUpdateFavorites);

export default router;