import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import VideoList from "./pages/VideoList";
import VideoDetails from "./pages/VideoDetails";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen w-screen">
          <Header />
          <Routes>
            <Route path="/" element={<VideoList />} exact></Route>
            <Route element={<VideoDetails />} path="/video/:videoId"></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
