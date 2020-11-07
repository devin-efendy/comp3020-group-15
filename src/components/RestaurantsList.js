import React from 'react'
import '../css/RestaurantsList.css'

function RestaurantsList() {
    //Information for restaurants
    const restaurantInfo =[
        {
        restaurant_name: 'McDonalds',
        restaurant_rating: 'O O O O X',
        restaurant_logo: '*Insert*LOGO*',
        delivery_time: 30,
        delivery_fee: 1.00
        },
        {
        restaurant_name: 'Burger King',
        restaurant_rating: 'O O O X X',
        restaurant_logo: '*Insert*LOGO*',
        delivery_time: 25,
        delivery_fee: 0.50
        },
        {
        restaurant_name: 'Pizza Hut',
        restaurant_rating: 'O O O O O',
        restaurant_logo: '*Insert*LOGO*',
        delivery_time: 20,
        delivery_fee: 0.30
        }
    ]

    //formatting the restaurant boxes/info
    const restaurantList = restaurantInfo.map(theInfo=> (
        <div className="restaurants">
                <div className="restaurantContainer">
                <h2>{theInfo.restaurant_name}</h2>
                <p className="ratings">Ratings: {theInfo.restaurant_rating}</p>
                <p className="dummyLogo">{theInfo.restaurant_logo}</p>
                <button>Select</button>
                <ul>
                    <li>Delivery time: {theInfo.delivery_time} mins.</li>
                    <li>Delivery fee: ${theInfo.delivery_fee}</li>
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