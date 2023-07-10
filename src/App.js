import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./context/StoryContext";
import MainPage from './components/home/MainPage';

function App() {
  return (
    <div>
      <Provider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              {/* <Route path="/health" element={<Health />} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Router>
        </div>
      </Provider>
    </div>
  );
}

export default App;
