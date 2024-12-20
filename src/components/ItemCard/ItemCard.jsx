import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ width, item, handleCardClick, onToggleLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const onCardClick = () => {
    handleCardClick(item);
    console.log(item);
  };

  const handleToggleLike = (event) => {
    onToggleLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" style={{ width: width }}>
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            class={`card__like-toggle ${
              isLiked ? "card__like-toggle_liked" : "card__like-toggle_unliked"
            }`}
            onClick={handleToggleLike}
          ></button>
        )}
      </div>
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
