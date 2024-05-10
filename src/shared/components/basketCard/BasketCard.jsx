import PropTypes from "prop-types";
import { Button } from "../button";
import "./basketCard.css";
function BasketCard(props) {
  const { title, img, price, discount, handelDelete, count } = props;
  const discountedPrice = price * ((100 - discount) / 100);
  return (
    <div data-cy="basket-card" className="basket-card">
      {img ? <img className="basket-img" src={img} alt={title} /> : null}
      <div className="basket-container">
        <h2 data-cy="basket-card-title" className="basket-card-title">
          {title}
        </h2>
        <div data-cy="basket-card-discounted-price">
          ${discountedPrice.toFixed(2)}
        </div>
        <div className="basket-count">
          <div data-cy="basket-card-item-count">{count} item</div>
          <Button onClick={handelDelete}>remove</Button>
        </div>
      </div>
    </div>
  );
}

export default BasketCard;

BasketCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  img: PropTypes.string,
  handelDelete: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
