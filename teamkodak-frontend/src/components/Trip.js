import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";


import '../App.css';

const Trip = ({
    trip
}) => {

    return (
        <div>
            <Link to="/trip-details"
                state={{ trip: trip }}
                className="text-decoration-none text-reset">
                <div className='tripCard border rounded'>
                    <Row>
                        <Col sm={12} lg={6}>
                            <Image
                                src={trip.image}
                                onError={(defaultImg) => {
                                    defaultImg.target.src = "/images/defaultTripImage.png"
                                }}
                                fluid
                                >
                            </Image>
                        </Col>
                        <Col>
                            <h3 className='mx-1' >
                                {trip.tripName}
                            </h3>
                            <p className='mx-1'>{trip.description}</p>
                        </Col>
                    </Row>
                </div>
            </Link>
        </div>
    );
}

export default Trip;