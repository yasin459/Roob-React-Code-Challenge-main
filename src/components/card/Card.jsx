import "./card.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";
import { Button } from "../button";
function Card(props) {
  const { title, img, description, price, discount, count, select } = props;
  const discountedPrice = price * ((100 - discount) / 100);
  return (
    <div className="card">
      {img ? <img src={img} alt={title} /> : null}
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{description}</p>
      <div className="price-container">
        <p className="price">${price}</p>
        <p>${discountedPrice.toFixed(2)}</p>
      </div>
      <div className="actions">
        <p>{count ? `${count} item` : "No Item"}</p>
        <Button onClick={select}>
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
