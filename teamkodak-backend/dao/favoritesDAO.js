import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let favorites;

export default class FavoritesDAO {
    static async injectDB(conn) {
        if (favorites) {
            return;
        }
        try {
            favorites = await conn.db(process.env.TRIPS_NS)
                .collection("favorites");
        } catch (e) {
            console.error(`Unable to connect in FavoritesDAO: ${e}`);
        }
    }

    static async getFavorites(profileId) {
        let cursor;
        try {
            cursor = await favorites.find(
                { _id: profileId }
            );
            const favoriteTrips = await cursor.toArray();
            return favoriteTrips[0];
        } catch (e) {
            console.error(`Unable to get user's favorite trips: ${e}`);
            return { error: e };
        }
    }

    static async updateFavorites(profileId, favoriteTripIds) {
        try {
            const updateFavoritesResponse = await favorites.updateOne(
                { _id: profileId },
                { $set: { favorites: favoriteTripIds } },
                { upsert: true }
            );
            return updateFavoritesResponse;
        } catch (e) {
            console.error(`Unable to update user's favorite trips: ${e}`);
            return { error: e };
        }
    }

}