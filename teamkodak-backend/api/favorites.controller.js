import FavoritesDAO from '../dao/favoritesDAO.js';

export default class FavoritesController{

    static async apiGetFavorites(req, res, next) {
        try {
            let profileId = req.params.profileId || {};

            let favorites = await FavoritesDAO.getFavorites(profileId);

            if (!favorites) {
                res.status(202).json({error: "Favorites not found"});
                return;
            }
            
            res.status(200).json(favorites);
        } catch(e) {
            console.log(`API error: ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateFavorites(req, res, next) {
        try {
            const favoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            );

            let { e } = favoritesResponse;
            if (e) {
                res.status(500).json({error: e});
            }
            
            else if (favoritesResponse.upsertedCount === 0 && favoritesResponse.modifiedCount === 0) {
                res.status(200).json({ status: "No changes were made to your favorites" });
            }
            else {
                res.status(201).json({status: "Successfully updated your favorites."});
            }
        } catch(e) {
            console.log(`API error: ${e}`);
            res.status(500).json({error: e});
        }
    }
    
}