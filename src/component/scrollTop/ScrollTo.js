import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          className="scroll-top-button"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999",
            backgroundColor: "#212121",
            color: "#fff",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          &#8679;
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
