import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodCostPage from "./modules/food-cost-module/components/FoodCostPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/food-cost" element={<FoodCostPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
