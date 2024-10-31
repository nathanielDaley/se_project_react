import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const onCardClick = () => {
    handleCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={onCardClick}
        src={item.link}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
