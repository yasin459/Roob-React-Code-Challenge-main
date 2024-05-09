import PropTypes from "prop-types";
import { Button } from "../button";
import "./basketCard.css";
function BasketCard(props) {
  const { title, img, price, discount, handelDelete, count } = props;
  const discountedPrice = price * ((100 - discount) / 100);
  return (
    <div className="basket-card">
      {img ? <img className="basket-img" src={img} alt={title} /> : null}
      <div className="basket-container">
        <h2 className="basket-card-title">{title}</h2>
        <div>${discountedPrice.toFixed(2)}</div>
        <div className="basket-count">
          <div>{count} item</div>
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
