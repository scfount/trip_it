import axios from "axios";

class FavoritesDataService {
    getFavoriteIds(profileId) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/favorites/${profileId}`
        );
    }

    updateFavoriteIds(data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/favorites`, data
        );
    }
}

export default new FavoritesDataService();