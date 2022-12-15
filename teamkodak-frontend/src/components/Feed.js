import { React, useEffect, useState } from 'react';
import { ButtonGroup, Container, ToggleButton } from 'react-bootstrap';
import { RiMapPinAddLine, RiMapPin2Fill } from "react-icons/ri";
import { TbPlaneDeparture } from "react-icons/tb";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

import Trip from './Trip';
import TripDataService from '../services/TripDataService';

const Feed = ({
    user,
    tripsByUser,
    favoriteTrips,
    favoriteIds,
    addFavorite,
    deleteFavorite
}) => {
    const [radioValue, setRadioValue] = useState('public');
    const [tripFeed, setTripFeed] = useState([])

    const radios = [
        { name: 'Public', value: 'public' },
        { name: 'Private', value: 'private' },
        { name: 'Favorites', value: 'favorites' },
    ];

    useEffect(() => {
        if (radioValue === 'public') {
            TripDataService.getTrips(radioValue)
                .then(response => {
                    setTripFeed(response.data)
                })
        }
        if (radioValue === 'private') {
            let privateTrips = tripsByUser.filter(trip => trip.visibility === "private");
            setTripFeed(privateTrips);
        }
        if (radioValue === 'favorites') {
            setTripFeed(favoriteTrips)
        }
    }, [radioValue, favoriteTrips]);


    return (
        <div>
            <Container className='w-75'>
                {
                    user ?
                        <ButtonGroup className='w-100 mt-4'>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={'outline-dark'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}>
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        :
                        <div />
                }
                { tripFeed.length > 0 ? 
                    tripFeed.map((trip, i) => {
                        return (
                            <div className='d-flex align-items-center' key={i}>
                                <div className='w-25'>
                                    {user && (
                                        favoriteIds.includes(trip._id) ?
                                            <RiMapPin2Fill className="display-1 text-danger" onClick={() => {
                                                deleteFavorite(trip._id);
                                            }} />
                                            :
                                            <RiMapPinAddLine className="display-1 text-dark" onClick={() => {
                                                addFavorite(trip._id);
                                            }} />
                                    )}
                                </div>
                                <div className='w-75 my-4'>
                                    <Trip trip={trip} />
                                </div>
                            </div>
                        )
                    })
                    :
                    radioValue == 'favorites' ? 
                        <div className = 'mt-4 text-center'>
                            <p className= 'display-6'> You don't have any favorites yet! </p>
                            <TbPlaneDeparture className = 'display-4'/>
                        </div>
                        :
                        <div className = 'mt-4'>
                            <p className= 'display-6 text-center'> Enter your first private trip!</p>
                            <Link className='text-dark d-flex text-decoration-none justify-content-center' to={{ pathname: "/add-trip" }}>
                            <AiOutlinePlusCircle className='display-4' />
                            <p className='text-decoration-none my-auto mx-1'>Add Trip</p>
                            </Link>
                        </div>
                }
           
            </Container>
        </div>
    );
}

export default Feed;