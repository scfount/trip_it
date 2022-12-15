import { React } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Destination from './Destination';
import Map from './Map';

import { RiMapPinAddLine, RiMapPin2Fill } from "react-icons/ri";

const TripDetails = ({
    user,
    favoriteIds,
    addFavorite,
    deleteFavorite,
}) => {
    const location = useLocation();
    const { trip } = location.state;

    return (
        <div>
            <Container className='w-75 mt-3'>
                <Row>
                    {user && (
                        favoriteIds.includes(trip._id) ?
                            <Col lg={1}>
                                <RiMapPin2Fill className="display-1 text-danger" onClick={() => {
                                    deleteFavorite(trip._id);
                                }} />
                            </Col>
                            :
                            <Col lg={1}>
                                <RiMapPinAddLine className="display-1 text-dark" onClick={() => {
                                    addFavorite(trip._id);
                                }} />
                            </Col>
                    )}
                    <Col>
                        <h1 className='display-5'>{trip.tripName}</h1>
                    </Col>
                </Row>
                <Row className='my-3'>
                    <Col sm={4}>
                        <Image src={trip.image}
                            onError={(defaultImg) => {
                                defaultImg.target.src = "/images/defaultTripImage.png"
                            }}
                            fluid
                            className='rounded' />
                    </Col>
                    <Col className=''>
                        {trip.description}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {trip.destinations.map((destination, i) => {
                            return (
                                <div className='border rounded mb-3' key={i}>
                                    <Destination
                                        destination={destination}
                                    />
                                </div>

                            )
                        })}
                    </Col>
                    <Col >
                        <div className='border rounded px-3'>
                            <Map user={user} trip={trip} />
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TripDetails;