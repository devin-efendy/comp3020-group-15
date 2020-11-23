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

let dishIds = 0;
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
    const dish = Object.assign({}, this.props.dishObj);

    dish.quantity = this.state.quantity;
    dish.customization = this.state.customizationList;
    dish.id = dishIds++;
    this.props.handleAddToCart(dish);

    // this.setState({
    //   customizationList: [],
    //   quantity: 0,
    // });
  };

  render() {
    const dish = this.props.dishObj;
    return (
      <div className="appearAnimationLayer">
        <div
          className="overlay"
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
                className={`circleButton materialButton ${this.state.quantity === 1 ? "disabledButton" : ""}`}
                onClick={this.handleDecreaseQty}
              >
                <i class="fas fa-minus"></i>
              </button>
              <p>{this.state.quantity}</p>
              <button
                className="circleButton materialButton"
                onClick={this.handleIncreaseQty}
              >
                <i class="fas fa-plus"></i>
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
