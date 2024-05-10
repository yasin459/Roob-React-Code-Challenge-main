import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { Button } from "../button";
import "./card.css";
function Card(props) {
  const { title, img, description, price, discount, count, select } = props;
  const discountedPrice = price * ((100 - discount) / 100);
  return (
    <div data-cy="card" className="card">
      {img ? <img src={img} alt={title} /> : null}
      <h2 data-cy="card-title" className="card-title">
        {title}
      </h2>
      <p data-cy="card-content" className="card-content">
        {description}
      </p>
      <div className="price-container">
        <p data-cy="card-price" className="price">
          ${price}
        </p>
        <p data-cy="card-discounted-price">${discountedPrice.toFixed(2)}</p>
      </div>
      <div className="actions">
        <p data-cy="card-item-count">{count ? `${count} item` : "No Item"}</p>
        <Button dataCy={"btn-add"} onClick={select}>
          <AddIcon style={{ color: "white" }} fontSize="medium" />
        </Button>
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
  count: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};
