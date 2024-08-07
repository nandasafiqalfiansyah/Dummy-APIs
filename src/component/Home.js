import HeroExample from "./Hero/Hero";
import Maincard from "./card/maincard";

function home() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <HeroExample />
      <Maincard />
    </div>
  );
}

export default home;
