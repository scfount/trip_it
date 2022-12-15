import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import TripsDAO from "./dao/tripsDAO.js";
import ProfilesDAO from './dao/profilesDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.TRIPS_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        await TripsDAO.injectDB(client);
        await ProfilesDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);

        app.listen(port, () => {
            console.log("Server is running on port: " + port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);