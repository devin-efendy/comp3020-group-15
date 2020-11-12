import React from "react";
import "../css/Dish.css";

const foodLogoList = [
  "fas fa-drumstick-bite fa-5x",
  // "fas fa-seedling fa-5x",
  // "fas fa-hamburger fa-5x",
  // "fas fa-pizza-slice fa-5x",
  // "fas fa-pepper-hot fa-5x",
];

class Dish extends React.Component {
  constructor() {
    super();
  }

  render() {
    const dish = this.props.dishObj;
    // const dishLogo =
    //   foodLogoList[Math.floor(Math.random() * foodLogoList.length)];

    const dishLogo = foodLogoList[0];

    return (
      <div className="dish">
        <div className="dishContainer">
          <div className="dishLogo">
            <i class={dishLogo} />
          </div>

          <div className="dishGroup__Name_Ratings">
            <div>
              <h2 className="dishName">{dish.dishName}</h2>
            </div>
            <p className="description">{dish.description}</p>
          </div>

          <div className="dishGroup__Time_Fee">
            <p>Price: {dish.price}</p>
            <p>Ratings: {dish.review}</p>
          </div>

          <div className="dishGroup__Button">
            <button
              className="selectButton"
              onClick={() => {
                this.props.handleSelectDish(dish);
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dish;
