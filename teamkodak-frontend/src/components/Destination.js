import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

import '../App.css';

const Destination = ({
    destination
}
) => {

    const getLocalDate = (date) => {
        let parseDate = Date.parse(date);
        let dateObject = new Date(parseDate);
        return dateObject.toLocaleDateString();
    }

    return (
        <div>
            <div className='m-2 '>
                <Row>
                    <h5 className='mb-4'>
                        {destination.formattedAddress}
                    </h5>
                </Row>
                <Row>
                    <Col sm={5}>   
                        <p className='m-0 p-0'>Arrival Date</p>
                        <p>{getLocalDate(destination.arrivalDate)}</p>
                        <p className='m-0 p-0'>Departure Date</p>
                        <p>{getLocalDate(destination.departureDate)}</p>
                    </Col>
                    <Col>
                        <p>
                            {destination.description}
                        </p>
                    </Col>
                    
                </Row>
            </div>

        </div>
    );
}

export default Destination;