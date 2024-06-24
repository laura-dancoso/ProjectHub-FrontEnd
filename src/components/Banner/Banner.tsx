import banner from "../../assets/banner.png";
import { useAuth } from "../../context/AuthContext";
import "./Banner.styles.css"; 

const Banner = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null; 
  }

  return (
      <img
        src={banner}
        alt="banner"
        className="banner-image"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          borderRadius: "10px",
        }}
      />
  );
};

export default Banner;
