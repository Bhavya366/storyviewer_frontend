import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./context/StoryContext";
import MainPage from './components/home/MainPage';
import Bookmark from './components/bookmarksfolder/Bookmark';
import AllMobileViewStories from './components/home/MobileNavbar/AllMobileViewStories';
import Notfound from './components/notfound/Notfound';
import Health from './components/health/Health';
import SharedCarousel from './components/sharedCarousel/SharedCarousel'

function App() {
  return (
      <Provider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/carousel" element = {<SharedCarousel />} />
              <Route path="/bookmark" element = {<Bookmark />}  />
              <Route path="/mystory" element = {<AllMobileViewStories/>} />
              <Route path="/health" element={<Health />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Router>
        </div>
      </Provider>
  );
}

export default App;
