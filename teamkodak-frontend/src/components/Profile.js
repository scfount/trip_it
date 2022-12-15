import React, { useEffect, useState } from 'react';
import { ButtonGroup, Container, ToggleButton, Row, Col, Carousel, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineEditLocationAlt, MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Trip from './Trip.js';
import Map from './Map.js';

import "../App.css";

const Profile = ({
    profile,
    getProfile,
    tripsByUser,
    deleteTrip,
    profileTripsId,
    getTripsByListForProfile
}) => {
    let params = useParams();
    // on page load, we will get profile and trips
    useEffect(() => {
        if (profile == null) {
            getProfile(params.profileId);
            if (profile !== null && profile.trips !== null) {
                getTripsByListForProfile(profileTripsId);
            }
        }
    }, [profile]);

    //radio information needed
    const [radioValue, setRadioValue] = useState('list');
    const [saveUser, setSavedUser] = useState(JSON.parse(localStorage.getItem("login")));

    const radios = [
        { name: 'List', value: 'list' },
        { name: 'Map', value: 'map' }
    ];

    //carousel information needed
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    //end of carousel

    return (
        <div>
            <Container className='w-75'>
                {/* Profile Card */}
                <Row className='my-3'>
                    <Col lg={3}>
                        <Image className="smallPoster" src={saveUser.picture}
                            onError={(defaultImg) => {
                                defaultImg.target.src = "/images/avatar.png"
                            }} />
                    </Col>
                    <Col>
                        <Row>
                            <h1 className='display-2'>{saveUser.given_name} {saveUser.family_name} </h1>
                        </Row>
                        <Row>
                            <h4 className=''>Trips Logged : {tripsByUser == null ? 0 : tripsByUser.length}</h4>
                        </Row>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <h1 className='display-5'>Your Trips</h1>
                    </Col>
                    <Col className='d-flex justify-content-end' align="end">
                        <Link to={{ pathname: "/add-trip" }} className='text-dark d-flex text-decoration-none'>
                            <AiOutlinePlusCircle className='display-5 my-auto' />
                            <p className='text-decoration-none my-auto mx-1'>Add Trip</p>
                        </Link>
                    </Col>
                    <Row>
                    </Row>
                    {/* toggle/radio button for View (list/map) */}
                    <Col className='mt-3' align="right">
                        <ButtonGroup className="mb-2">
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={'outline-dark'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Row>

                {radioValue === "list" ?
                    <div id="tripId">
                        {tripsByUser.map((trip, index) => {
                            return (
                                <Row className="my-4" key={index}>
                                    <Col sm={12} md={10} >
                                        <Trip trip={trip} />
                                    </Col>
                                    <Col className='my-auto mx-auto'>
                                        <Link to={{ pathname: "/add-trip" }}
                                            state={{ trip: trip }}>
                                            <MdOutlineEditLocationAlt className='display-4 text-dark' />
                                        </Link>
                                        <Link className='text-dark'>
                                            <MdDeleteOutline className='display-4' onClick={() => { deleteTrip(trip._id) }} />
                                        </Link>
                                    </Col>
                                </Row> 
                            )
                        })}
                    </div>
                    :
                    <Row>
                        <div id="mapId">
                            <Carousel interval={null} variant="dark">
                                {tripsByUser.map((trip, i) => {
                                    return (
                                        <Carousel.Item key={i} activeindex={i} onSelect={handleSelect} >
                                            <h1 className="text-center" >{trip.tripName}</h1>
                                            <div className='border rounded px-3'>
                                                <Map trip={trip} />
                                            </div>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </Row>
                }

            </Container>
        </div>

    );
}

export default Profile;
