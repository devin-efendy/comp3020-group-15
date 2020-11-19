import React from "react";
import "../css/DishCustomization.css";

const sauces = [
  {
    name: "Sauce 1",
    price: "Free",
  },
  {
    name: "Sauce 2",
    price: "Free",
  },
  {
    name: "Sauce 3",
    price: "Free",
  },
];

const toppings = [
  {
    name: "Toppings 1",
    price: "Free",
  },
  {
    name: "Toppings 2",
    price: "Free",
  },
  {
    name: "Toppings 3",
    price: "Free",
  },
];

class DishCustomization extends React.Component {
  constructor() {
    super();
    this.state = {
      customizationList: [],
      quantity: 1,
    };
  }

  componentDidMount = () => {
    document.body.style.overflow = "hidden";
  };

  componentWillUnmount = () => {
    document.body.style.overflow = "unset";
  };

  handleIncreaseQty = () => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  };

  handleDecreaseQty = () => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };

  handleAddToCart = () => {
    const dishObj = this.props.dishObj;
    dishObj.quantity = this.state.quantity;
    dishObj.customization = this.state.customizationList;
    this.props.handleAddToCart(dishObj);
  };

  render() {
    const dish = this.props.dishObj;
    return (
      <div className="appearAnimationLayer">
        <div
          className="dishOverlay"
          onClick={() => {
            const bodyHTML = document.getElementsByTagName("body")[0];
            bodyHTML.style.paddingRight = `0px`;

            this.props.turnOffCustomization();
          }}
        />
        <div className="customizationContainer">
          <div className="optionGroup__Name_Exit">
            <h1>{dish.dishName}</h1>
            <button
              className="circleButton materialButton"
              onClick={() => {
                const bodyHTML = document.getElementsByTagName("body")[0];
                bodyHTML.style.paddingRight = `0px`;

                this.props.turnOffCustomization();
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          {this.renderOptions("SAUCES", sauces)}
          {this.renderOptions("TOPPINGS", toppings)}

          <div className="optionGroup__Buttons">
            <div className="quantityGroup">
              <button
                className="circleButton materialButton"
                onClick={this.handleDecreaseQty}
              >
                <span>-</span>
              </button>
              <p>{this.state.quantity}</p>
              <button
                className="circleButton materialButton"
                onClick={this.handleIncreaseQty}
              >
                <span>+</span>
              </button>
            </div>

            <div className="optionGroup__RightAlign">
              <button
                className="addToOrderButton materialButton"
                onClick={this.handleAddToCart}
              >
                <span>+ add to cart</span>
              </button>
              <p>${dish.price * this.state.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOptions = (title, list) => {
    const listRender = list.map((el, i) => {
      const isSelected = this.state.customizationList.includes(el.name);

      return (
        <button
          className={`options ${isSelected ? "optionSelected" : ""}`}
          key={i}
          onClick={() => {
            let newList;

            if (!isSelected) {
              newList = [...this.state.customizationList, el.name];
            } else {
              newList = this.state.customizationList.filter((item) => {
                return item !== el.name;
              });
            }

            this.setState({
              customizationList: newList,
            });
          }}
        >
          <p className="optionName">{el.name}</p>
          <p>{el.price}</p>
        </button>
      );
    });

    return (
      <div className="optionContainer">
        <h2>{title}</h2>
        {listRender}
      </div>
    );
  };
}

export default DishCustomization;
