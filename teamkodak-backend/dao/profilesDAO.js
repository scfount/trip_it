import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let profiles;

export default class ProfilesDAO {
    static async injectDB(conn) {
        if (profiles) {
            return;
        }
        try {
            profiles = await conn.db(process.env.TRIPS_NS)
                            .collection("profiles");
        } catch (e) {
            console.error(`Unable to connec in ProfilesDAO: ${e}`);
        }
    }

    static async createProfile(userInfo, date) {
        try {
            const profileDoc = {
                _id : userInfo._id,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                image: userInfo.image,
                date_created: date,
                trips: userInfo.trips
            }

            return await profiles.insertOne(profileDoc);
        } catch(e) {
            console.error(`Unable to create new profile: ${e}`);
            return {error: e};
        }
    }

    static async getProfileById(profileId) {
        let cursor;
        try {
            cursor = await profiles.find({
                    _id : profileId
            });
            const userInfo = await cursor.toArray();
            return userInfo[0];
            
        } catch(e) {
            console.error(`Unable to get the specified user's profile: ${e}`);
            return {error: e};
        }
    }

    static async updateProfileById(profileId, firstName, lastName, image, trips) {
        try {
            return await profiles.updateOne(
                {_id : profileId},
                {$set:{
                    first_name: firstName,
                    last_name: lastName,
                    image: image,
                    trips: trips
                }},
                { upsert: true });
        } catch(e) {
            console.error(`Unable to update the profile: ${e}`);
            return {error: e};
        }
    }

    static async deleteProfileById(profileId) {
        try {
            const deleteDoc = {
                _id : profileId
            }
            return await profiles.deleteOne(deleteDoc);
        } catch(e) {
            console.error(`Unable to delete the profile: ${e}`);
            return {error: e};
        }
    }

}