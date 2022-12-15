import ProfilesDAO from '../dao/profilesDAO.js';

export default class ProfilesController {

    static async apiCreateProfile(req, res, next) {
        try { 
            const userInfo = {
                _id : req.body._id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                image: req.body.image,
                trips: []
            }
            const date = new Date();

            const profileResponse = await ProfilesDAO.createProfile(
                userInfo,
                date
            );

            var {error} = profileResponse;
            
            if (error) {
                res.status(500).json({error: "Unable to create new Profile."})
            } else {
                res.json({status: "Successfully created new user Profile."});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetProfileById(req, res, next) {
        try {
            let id = req.params.profileId || {};
            let profile = await ProfilesDAO.getProfileById(id);
            if(!profile){
                res.status(202).json({error: "Profile not found"});
                return;
            }
            res.status(200).json(profile);
        } catch(e) {
            console.log(`API error: ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateProfileById(req, res, next) {
        try {
            let id = req.params.profileId || {};
            const profileResponse = await ProfilesDAO.updateProfileById(
                id,
                req.body.first_name,
                req.body.last_name,
                req.body.image,
                req.body.trips
            );
            let {error} = profileResponse;

            if(error){
                res.status(500).json({error: "Unable to put profile."});
            }
            else if (profileResponse.modifiedCount === 0){
                res.status(200).json({ status : "No changes were made to your profile"});
            }
            else {
                res.status(201).json({status : "success"});
            }
        }
        catch(e){
            res.status(500).json({error: e.mssage});
        }
    }

    static async apiDeleteProfileById(req, res, next) {
        try {
            let id = req.params.profileId || {};
            const deleteResponse = await ProfilesDAO.deleteProfileById(
                id
            );

            var {error} = deleteResponse;

            if(error){
                res.status(500).json({error: "Unable to delete review."});
            }
            else{
                res.json({status: "success"});
            }
        } catch(e) {
            console.log(`API error: ${e}`);
            res.status(500).json({error: e});
        }
    }

}