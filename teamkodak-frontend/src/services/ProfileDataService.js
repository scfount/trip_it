import axios from "axios";

class ProfileDataService {

    getProfile(userId) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/profile/${userId}`
        );
    }

    createProfile(data) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/profile`, data
        );
    }

    updateProfile(userId, data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/profile/${userId}`, data
        );
    }

    deleteProfile(profileId) {
        return axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/profile/${profileId}`
        );
    }
}

export default new ProfileDataService();