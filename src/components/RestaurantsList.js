import React from 'react'
import '../css/RestaurantsList.css'
import RestaurantStub from '../backend/RestaurantStub';


function RestaurantsList() {
    //formatting the restaurant boxes/info
    const restaurantList = RestaurantStub.map(theInfo=> (
        <div className="restaurants">
                <div className="restaurantContainer">
                <h2>{theInfo.restaurantName}</h2>
                <p className="ratings">Ratings: {theInfo.review} stars</p>
                <p className="restaurantLogo"><i class={theInfo.restaurantLogo}></i></p>
                
                <button>Select</button>
                <ul>
                    <li>Delivery time: {theInfo.deliveryTime}</li>
                    <li>Delivery fee: ${theInfo.deliveryFee}</li>
                </ul>
            </div>
        </div>
    ))

    return (
        <div>
            {restaurantList}
        </div>
    )
}

export default RestaurantsList;