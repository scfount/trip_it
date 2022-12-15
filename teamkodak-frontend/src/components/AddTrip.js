import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col, Form, Alert, Container } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";
import AddDestination from './AddDestination';
import Destination from './Destination';
import TripDataService from '../services/TripDataService';
import ProfileDataService from '../services/ProfileDataService';

const AddTrip = ({ profile: userProfile, tripsByUser, setTripsByUser }) => {

    const navigate = useNavigate();
    let location = useLocation();
    const VisibilityTypes = {
        PUBLIC: 'public',
        NETWORK: 'network',
        PRIVATE: 'private'
    }

    let initialTripState, editingTrip;
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [destinationsList, setDestinationsList] = useState([]);

    if (location.state) {
        editingTrip = true;
        initialTripState = location.state.trip;
    } else {
        editingTrip = false;
        initialTripState = {
            tripName: "",
            image: "",
            visibility: VisibilityTypes.PUBLIC,
            description: "",
            destinations: [],
            dateCreated: null
        }
    }

    useEffect(() => {
        if (editingTrip) {
            setDestinationsList(initialTripState.destinations);
        }
    }, [])

    const [trip, setTrip] = useState(initialTripState);

    const navHomePage = "/"; // "/visibility/public";

    const saveTrip = () => {
        setSubmitAttempted(true);
        if ((trip.tripName !== "") && (trip.destinations.length > 0)) {
            if (editingTrip) {
                TripDataService.updateTrip(trip)
                    .then(() => {
                        setTripsByUser(trip)
                        let navProfilePage = "/profile/" + userProfile._id;
                        window.location.href = navProfilePage;
                })
                    .catch((error) => console.log(error));
            } else {
                TripDataService.createTrip(trip)
                    .then((response) => {
                        const newTripId = response.data.tripId;
                        ProfileDataService.getProfile(userProfile._id);
                        const currTrips = userProfile.trips || [];
                        const updateProfDoc = {
                            first_name: userProfile.first_name,
                            last_name: userProfile.last_name,
                            image: userProfile.image,
                            trips: currTrips.concat([newTripId])
                        }
                        ProfileDataService.updateProfile(userProfile._id, updateProfDoc);

                        // storing id to trip and setting tripsByUser with the new trip
                        trip._id = newTripId;
                        setTripsByUser([...tripsByUser, trip]);
                        // Navigate to the page for the new trip
                        let navProfilePage = "/profile/" + userProfile._id;
                        navigate(navProfilePage);
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            console.log("Please name the trip and add at least one destination.")
        }
    }

    const addDestination = (destination) => {
        const newDests = destinationsList.concat([destination]);
        setDestinationsList([...destinationsList, destination]);
        setTrip({ ...trip, destinations: newDests });
    }

    const deleteDestination = (destination) => {
        const newDests = destinationsList.filter((dest, i) => {
            return dest !== destination
        });
        setDestinationsList(newDests);
        setTrip({ ...trip, destinations: newDests })
    }

    const handleNavAway = () => {
        if (editingTrip) {
            console.log("Navigating away from Edit Trip page");
        } else {
            console.log("Navigating away from Add Trip page");
        }
        navigate(navHomePage);
    }

    return (
        <div>
            <Container className="w-75">
                <h1 align = "left"> {editingTrip ? "Edit Trip" : "Create New Trip and Add Destinations"} </h1>
                <Form className = "mt-4">
                    {submitAttempted && (trip.tripName === "") &&
                        <Alert variant="warning">Required: Trip Name</Alert>
                    }
                    {submitAttempted && (trip.destinations.length === 0) &&
                        <Alert variant="warning">Required: At least one Destination</Alert>
                    }
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Trip Name
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                value={trip.tripName}
                                onChange={
                                    e => {
                                        setTrip({ ...trip, tripName: e.target.value });
                                    }
                                }
                                placeholder="Add Trip Name"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Trip Image
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                value={trip.image}
                                onChange={
                                    e => {
                                        setTrip({ ...trip, image: e.target.value });
                                    }
                                }
                                placeholder="Add image source URL"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Visibility
                        </Form.Label>
                        <Col>
                            <Form.Select
                                type="tripVisibility"
                                value={trip.visibility}
                                onChange={e => {
                                    setTrip({ ...trip, visibility: e.target.value });
                                }}
                            >
                                <option value="public">Public</option>
                                <option value="network">Network</option>
                                <option value="private">Private</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="tripDescription"
                                value={trip.description}
                                placeholder="Add a Description of your Trip"
                                as="textarea"
                                onChange={e => {
                                    setTrip({ ...trip, description: e.target.value });
                                }}
                                required
                            />
                        </Col>
                    </Form.Group>
                </Form>
                <div className="destinationDisplay" style={{ borderRadius: 10 }}>
                    <p>Destinations</p>
                    {editingTrip ? initialTripState.destinations.map((destination, ind) => {
                        return (
                            <Row style={{ justifyContent: "center", alignItems: 'center' }} key={ind}>
                                <Col className="rounded">
                                    <Destination
                                        className="border rounded my-2"
                                        destination={destination}
                                    />
                                </Col>
                                {editingTrip ? 
                                    <div></div>
                                    :
                                    <Col>
                                        <Link className='text-dark'>
                                            <MdDeleteOutline className='display-4' onClick={() => { deleteDestination(destination) }} />
                                        </Link>
                                    </Col>
                                }
                            </Row>

                        );
                    }) :
                        destinationsList.map((destination, ind) => {
                            return (
                                <Row style={{ justifyContent: "center", alignItems: 'center' }} key={ind}>
                                    <Col className="border rounded my-2">
                                        <Destination
                                            destination={destination}
                                        />
                                    </Col>
                                    <Col align="left">
                                        <Link className='text-dark'>
                                            <MdDeleteOutline className='display-4' onClick={() => { deleteDestination(destination) }} />
                                        </Link>
                                    </Col>
                                </Row>

                            );
                        })

                    }
                </div>
                {editingTrip ?
                    <div></div> :
                    <Row>
                        <AddDestination
                            addDestination={addDestination}
                        />
                    </Row>
                }
                <Row className='mb-5'>
                    <Col align="right">
                        <Button className='mx-1' onClick={saveTrip}>Save Trip</Button>
                        <Button className='btn-danger' onClick={handleNavAway}>Cancel</Button>
                    </Col>
                </Row>


            </Container>
        </div>
    );
}

export default AddTrip;