import TripsDAO from '../dao/tripsDAO.js';

export default class TripsController {

    static async apiGetTrips(req, res, next) {
        try {
            const visibility = req.params.visibility || null;
            const trips = await TripsDAO.getTrips(visibility);

            res.status(200).json(trips);

        } catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiCreateTrip(req, res, next) {
        try {
            const dateCreated = new Date();
            let trip = {
                tripName: req.body.tripName,
                image: req.body.image,
                visibility: req.body.visibility,
                description: req.body.description,
                destinations: req.body.destinations,
                dateCreated: dateCreated
            }

            const tripResponse = await TripsDAO.addTrip(trip);

            var { error } = tripResponse;

            if (error) {
                res.status(500).json({ error: "Unable to create new Trip." });
            } else {
                res.json({ status: "Successfully created new Trip.", tripId: tripResponse.insertedId });
            }
        } catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetTripByTripId(req, res, next) {
        try {
            const tripId = req.params.tripId || {};
            const trip = await TripsDAO.getTrip(tripId);

            if (!trip) {
                res.status(404).json({ error: "Trip not found" });
                return;
            }

            res.status(200).json(trip);

        } catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateTrip(req, res, next) {
        try {
            const trip = {
                _id: req.body._id,
                tripName: req.body.tripName,
                image: req.body.image,
                visibility: req.body.visibility,
                description: req.body.description,
                dateCreated: req.body.dateCreated,
                destinations: req.body.destinations,

            }

            const tripResponse = await TripsDAO.updateTrip(trip);

            let { error } = tripResponse;
            if (error) {
                res.status(500).json({ error: 'Unable to update review.' });
            } else if (tripResponse['modifiedCount'] === 0) {
                res.status(404).json({ status: 'Trip not found' });
            } else {
                res.status(200).json({ status: 'success' });
            }
        } catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteTripById(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const tripResponse = await TripsDAO.deleteTrip(tripId);

            let { error } = tripResponse;
            if (error) {
                res.status(500).json({ error: 'Unable to delete trip.' });
            } else if (tripResponse['deletedCount'] === 0) {
                res.status(404).json({ status: 'Trip not found' });
            } else {
                res.status(200).json({ status: 'success' });
            }
        } catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetAllTripsByList(req, res, next) {
        try {
            let list = req.query.trips || []

            let trips = await TripsDAO.getAllTripsByList(list);

            if (!trips) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(trips);
        }
        catch (e) {
            console.log(`API error: ${e}`);
            res.status(500).json({ error: e });
        }
    }
}