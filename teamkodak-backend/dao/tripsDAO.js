import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let trips;

export default class TripsDAO {
    static async injectDB(conn) {
        if (trips) {
            return;
        }
        try {
            trips = await conn.db(process.env.TRIPS_NS)
                .collection("trips");
        } catch (e) {
            console.error(`Unable to connect in TripsDAO: ${e}`);
        }
    }


    static async getTrips(visibility) {
        let cursor;
        try {
            if (visibility) {
                let query = { 'visibility': { $eq: visibility.toLowerCase() } }
                cursor = await trips.find(query);
            } else {
                cursor = await trips.find();
            }

            return await cursor.toArray();

        } catch (e) {
            console.error(`Unable to get the trips with filter applied: ${e}`);
            return { error: e };
        }
    }

    static async addTrip(trip) {
        try {
            return await trips.insertOne(trip);

        } catch (e) {
            console.error(`Unable to post the new trip: ${e}`);
            return { error: e };
        }
    }

    static async getTrip(tripId) {
        let cursor;
        try {
            cursor = await trips.find(
                { _id: ObjectId(tripId) }
            );
            return cursor.toArray();

        } catch (e) {
            console.error(`Unable to get the trip: ${e}`);
            return { error: e };
        }
    }

    static async updateTrip(trip) {
        try {
            return await trips.updateOne(
                { _id: ObjectId(trip._id) },
                {
                    $set: {
                        tripName: trip.tripName,
                        image: trip.image,
                        visibility: trip.visibility,
                        description: trip.description,
                        dateCreated: trip.dateCreated,
                        destinations: trip.destinations,
                    }
                }
            );
        } catch (e) {
            console.error(`Unable to update the trip: ${e}`);
            return { error: e };
        }
    }

    static async deleteTrip(tripId) {
        try {
            return await trips.deleteOne({ _id: ObjectId(tripId) })
        } catch (e) {
            console.error(`Unable to delete the trip: ${e}`);
            return { error: e };
        }
    }

    static async getAllTripsByList(list){
        let cursor;
        let listOfObjectIds = list.map(id => ObjectId(id));
        
        try{
            cursor = await trips.find({
                _id: {$in : listOfObjectIds}
            });

            const listOfTrips = await cursor.toArray();
            return listOfTrips;
        }
        catch(e){
            console.error(`Something went wrong in getAllTripsByList, ${e}`);
            return {listOfTrips: [], listOfTripsNum: 0};
        }
    }
}