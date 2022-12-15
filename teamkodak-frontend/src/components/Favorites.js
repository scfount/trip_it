import React from 'react';
import { Container } from 'react-bootstrap';
import { TbPlaneDeparture } from "react-icons/tb";

import Trip from './Trip';
import '../App.css';

const Favorites = ({
    favoriteTrips
}
) => {
    return (
        <div>
            <Container className='w-75'>
                {favoriteTrips.length === 0 ?
                    <div className='mt-4 text-center'>
                        <p className='display-6'>You don't have any favorites yet!</p> <TbPlaneDeparture className='display-4 my-auto ms-3'/>
                    </div>
                    :
                    favoriteTrips.map((trip, idx) => {
                        return (
                            <div className='my-4 tripCard' key={idx}>
                                <Trip
                                    trip={trip}
                                />
                            </div>
                        )
                    })

                }
            </Container>
        </div>
    );
}

export default Favorites;