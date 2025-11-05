// FoodTracker.jsx (Dietitian version)
import { useState, useEffect } from 'react';
import { searchFood, getFoodNutrition } from '../../services/api';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../styles/dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function FoodTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodDetails, setFoodDetails] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    try {
      const response = await searchFood('');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchFood(searchQuery);
      setFoods(response.data);
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSelect = async (food) => {
    setSelectedFood(food);
    try {
      const response = await getFoodNutrition(food.id, quantity);
      setFoodDetails(response.data);
    } catch (error) {
      console.error('Error fetching food details:', error);
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity);
    if (selectedFood) {
      try {
        const response = await getFoodNutrition(selectedFood.id, newQuantity);
        setFoodDetails(response.data);
      } catch (error) {
        console.error('Error updating nutrition:', error);
      }
    }
  };

  const macroData = foodDetails ? {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      data: [
        foodDetails.nutrition.protein,
        foodDetails.nutrition.carbs,
        foodDetails.nutrition.fats
      ],
      backgroundColor: [
        'rgba(45, 106, 79, 0.8)',
        'rgba(244, 162, 97, 0.8)',
        'rgba(231, 111, 81, 0.8)'
      ],
      borderWidth: 0
    }]
  } : null;

  const microData = foodDetails ? {
    labels: ['Calcium', 'Iron', 'Vit C', 'Vit A', 'Fiber'],
    datasets: [{
      label: 'Micronutrients (mg/mcg)',
      data: [
        foodDetails.nutrition.calcium,
        foodDetails.nutrition.iron,
        foodDetails.nutrition.vitaminC,
        foodDetails.nutrition.vitaminA / 10, // Scale down for better visualization
        foodDetails.nutrition.fiber * 100 // Scale up for better visualization
      ],
      backgroundColor: 'rgba(82, 183, 136, 0.8)',
      borderColor: 'rgb(82, 183, 136)',
      borderWidth: 1
    }]
  } : null;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Food Tracker</h1>
        <p className="page-subtitle">Search and analyze nutritional information</p>
      </div>

      {/* Search Section */}
      <div className="food-search-container">
        <form className="food-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control food-search-input"
            placeholder="🔍 Search for any food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Food Results */}
        <div className="food-results">
          {foods.map((food) => (
            <div
              key={food.id}
              className="food-item-card"
              onClick={() => handleFoodSelect(food)}
            >
              <h3>{food.name}</h3>
              <span className="food-category">{food.category}</span>
              <div className="food-preview">
                <p><strong>Calories:</strong> {food.calories} kcal</p>
                <p><strong>Protein:</strong> {food.protein}g</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Details Modal */}
      {selectedFood && foodDetails && (
        <div className="modal-overlay" onClick={() => {
          setSelectedFood(null);
          setFoodDetails(null);
        }}>
          <div className="modal-content food-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="food-detail-header">
              <div>
                <h2>{foodDetails.name}</h2>
                <span className="food-category">{foodDetails.category}</span>
              </div>
              <button className="close-btn" onClick={() => {
                setSelectedFood(null);
                setFoodDetails(null);
              }}>
                ×
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label className="form-label">Quantity (grams):</label>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseFloat(e.target.value))}
                min="1"
                step="1"
              />
            </div>

            {/* Nutritional Information */}
            <div className="nutrition-summary">
              <h3>Nutritional Information</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.calories.toFixed(1)}</div>
                  <div className="nutrition-label">Calories</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.protein.toFixed(1)}g</div>
                  <div className="nutrition-label">Protein</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.carbs.toFixed(1)}g</div>
                  <div className="nutrition-label">Carbs</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.fats.toFixed(1)}g</div>
                  <div className="nutrition-label">Fats</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.fiber.toFixed(1)}g</div>
                  <div className="nutrition-label">Fiber</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.calcium.toFixed(1)}mg</div>
                  <div className="nutrition-label">Calcium</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.iron.toFixed(1)}mg</div>
                  <div className="nutrition-label">Iron</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.vitaminC.toFixed(1)}mg</div>
                  <div className="nutrition-label">Vitamin C</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-value">{foodDetails.nutrition.vitaminA.toFixed(0)}mcg</div>
                  <div className="nutrition-label">Vitamin A</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-2">
              <div className="nutrition-chart-container">
                <h4>Macronutrient Distribution</h4>
                <Doughnut data={macroData} />
              </div>
              <div className="nutrition-chart-container">
                <h4>Micronutrients</h4>
                <Bar data={microData} options={{ responsive: true }} />
              </div>
            </div>

            {/* Ayurvedic Properties */}
            <div className="ayurvedic-properties">
              <h4>Ayurvedic Properties</h4>
              <div className="ayurvedic-grid">
                <div className="ayurvedic-item">
                  <span className="ayurvedic-item-label">Rasa (Taste):</span> {foodDetails.ayurvedic.rasa}
                </div>
                <div className="ayurvedic-item">
                  <span className="ayurvedic-item-label">Virya (Potency):</span> {foodDetails.ayurvedic.virya}
                </div>
                <div className="ayurvedic-item">
                  <span className="ayurvedic-item-label">Vipaka:</span> {foodDetails.ayurvedic.vipaka}
                </div>
                <div className="ayurvedic-item">
                  <span className="ayurvedic-item-label">Dosha Effect:</span> {foodDetails.ayurvedic.dosha}
                </div>
                <div className="ayurvedic-item">
                  <span className="ayurvedic-item-label">Digestibility:</span> {foodDetails.ayurvedic.digestibility}
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Health Benefits</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{foodDetails.ayurvedic.benefits}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodTracker;