import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddGarmentClick,
  handleEditProfileClick,
  handleLogoutClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleEditProfileClick={handleEditProfileClick}
          handleLogoutClick={handleLogoutClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddGarmentClick={handleAddGarmentClick}
        />
      </section>
    </div>
  );
}

export default Profile;
