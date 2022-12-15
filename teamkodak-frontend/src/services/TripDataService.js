import axios from "axios";

class TripDataService {

    getTrips(filter) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/visibility/${filter}`
        );
    }

    getTrip(tripId) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/trip/${tripId}`
        );
    }

    createTrip(data) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/trip`, data
        );
    }

    updateTrip(data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/trip`, data
        );
    }

    deleteTrip(tripId) {
        return axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/trip/${tripId}`
        );
    }

    getTripsByList(data){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trips/getAllTripsByList`, {params: {trips: data}} );
    }
}

export default new TripDataService();