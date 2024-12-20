import "./ItemCard.css";

function ItemCard({ width, item, handleCardClick, onToggleLike }) {
  const onCardClick = () => {
    handleCardClick(item);
  };

  return (
    <li className="card" style={{ width: width }}>
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={onCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
