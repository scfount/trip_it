import { React, useState } from 'react';
import { Form, Row, Col, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from "react-icons/ai";
import Autocomplete from 'react-google-autocomplete';

const AddDestination = ({ addDestination }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_CLIENT_API_KEY;

    const initialDestinationState = {
        placeId: "",
        formattedAddress: "",
        latitude: "",
        longitude: "",
        arrivalDate: "",
        departureDate: "",
        description: ""
    };

    const [destination, setDestination] = useState(initialDestinationState);
    const [addDisabled, setAddDisabled] = useState(true);
    const [addDestinationAttempted, setAddDestinationAttempted] = useState(false);

    const validateReqFields = () => {
        const isNamed = (destination.formattedAddress !== "");
        const hasArrivalDate = (destination.arrivalDate !== "");
        const hasDepartureDate = (destination.departureDate !== "");
        if (isNamed && hasArrivalDate && hasDepartureDate) {
            setAddDisabled(false);
        }
    }

    const handleChange = (event) => {
        if (event.target && event.target.name !== "placeAutocomplete") {
            const val = event.target.value;
            setDestination({ ...destination, [event.target.name]: val });
        } else {
            const updateValues = {
                placeId: event.place_id,
                formattedAddress: event.formatted_address,
                latitude: event.geometry.location.lat(),
                longitude: event.geometry.location.lng()
            }
            setDestination({ ...destination, ...updateValues });
        }
        validateReqFields();
    }

    return (

        <div>
            <h3>
                Destination Details
            </h3>
            {addDisabled && addDestinationAttempted && (destination.formattedAddress === "") &&
                <Alert variant="warning">Required: Location Name</Alert>
            }
            {addDisabled && addDestinationAttempted && (destination.arrivalDate === "") &&
                <Alert variant="warning">Required: Arrival Date</Alert>
            }
            {addDisabled && addDestinationAttempted && (destination.departureDate === "") &&
                <Alert variant="warning">Required: Departure Date</Alert>
            }
            <div className="destinationInput">
                <Form>
                    <Row>
                        <Col className=''>
                            <Form.Group>
                                <Form.Label>
                                    Location Name
                                </Form.Label>
                            </Form.Group>
                            <Autocomplete
                                className='w-100'
                                apiKey={apiKey}
                                name="placeAutocomplete"
                                onKeyDown={(e) => {
                                    if (e.target.code === "Enter") {
                                        e.preventDefault();
                                    }
                                }}
                                onPlaceSelected={(place) => {
                                    handleChange(place);
                                }}
                                required
                            />
                        </Col>
                        {/* <Col>
                            <Form.Group>
                                <Row>
                                    <Form.Label sm="2">
                                        Coordinates
                                    </Form.Label>
                                </Row>
                                <br/>
                                <Row>
                                    <Col align="left">Latitude:</Col>
                                    <Col align="right">{destination.latitude}</Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col align="left">Longitude:</Col>
                                    <Col align="right">{destination.longitude}</Col>
                                </Row>
                            </Form.Group>
                        </Col> */}
                        <Col>
                            <Form.Group>
                                <Row>
                                    <Form.Label align="left" onInput={(e) => console.log(e.target.value)}>
                                        Date of Arrival
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="arrivalDate"
                                        value={destination.arrivalDate}
                                        onChange={e => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label align="left">
                                        Date of Departure
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="departureDate"
                                        value={destination.departureDate}
                                        onChange={e => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </Row>

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label sm="2">
                                    Description
                                </Form.Label>
                                <FormControl
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    value={destination.description}
                                    onChange={e => {
                                        handleChange(e);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Link className='text-dark d-flex text-decoration-none'>
                <AiOutlinePlusCircle className='display-4' onClick={() => {
                    setAddDestinationAttempted(true);
                    if (!addDisabled) {
                        addDestination(destination);
                        setDestination(initialDestinationState);
                    }
                }} />
                <p className='text-decoration-none my-auto mx-1'>Add Destination</p>
            </Link>
        </div>
    );
}

export default AddDestination;