import React from 'react'
import '../css/RestaurantsList.css'

function RestaurantsList() {
    return (
        <div className="restaurants">
            <div className="restaurantContainer">
                <h2>Restaurant near you #1</h2>
            <p className="ratings">Ratings: O O O O X</p>
            <p className="dummyLogo">**Dummy Logo**</p>
            <button>Select</button>
            <ul>
                <li>Delivery time: 30 mins.</li>
                <li>Delivery fee: $0.00</li>
            </ul>
            </div>

            <div className="restaurantContainer">
            <h2>Restaurant near you #2</h2>
            <p className="ratings">Ratings: O O O X X</p>
            <p className="dummyLogo">**Dummy Logo**</p>
            <button>Select</button>
            <ul>
                <li>Delivery time: 20 mins.</li>
                <li>Delivery fee: $0.00</li>
            </ul>
            </div>

            <div className="restaurantContainer">
            <h2>Restaurant near you #3</h2>
            <p className="ratings">Ratings: O O X X X</p>
            <p className="dummyLogo">**Dummy Logo**</p>
            <button>Select</button>
            <ul>
                <li>Delivery time: 15 mins.</li>
                <li>Delivery fee: $0.00</li>
            </ul>
            </div>

            <div className="restaurantContainer">
            <h2>Restaurant near you #4</h2>
            <p className="ratings">Ratings: O O O O O</p>
            <p className="dummyLogo">**Dummy Logo**</p>
            <button>Select</button>
            <ul>
                <li>Delivery time: 47 mins.</li>
                <li>Delivery fee: $0.00</li>
            </ul>
        </div>
    </div>
    )
}

export default RestaurantsList;