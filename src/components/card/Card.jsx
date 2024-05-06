import "./card.css";

import PropTypes from "prop-types";

function Card(props) {
  const { title, content, img, description, price, discount } = props;
  const discountedPrice = price * ((100 - discount) / 100);
  return (
    <div className="card">
      {img ? <img src={img} alt={title} /> : null}
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{description}</p>
      <div className="price-container">
        <p className="price" >${price}</p>
        <p>${discountedPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  img: PropTypes.string,
};
