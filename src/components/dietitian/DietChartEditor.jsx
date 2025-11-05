// components/dietitian/DietChartEditor.jsx
/*import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getDietChartDetails, 
  updateMeal, 
  addFoodToMeal, 
  deleteMealFood,
  getAllFoods,
  getFoodNutrition 
} from '../../services/api';
import { formatDate } from '../../utils/helpers';
import '../../styles/dietitian.css';

function DietChartEditor({ user }) {
  const { chartId } = useParams();
  const navigate = useNavigate();
  
  const [dietChart, setDietChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Food search modal state
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  
  // Edit state
  const [editedQuantities, setEditedQuantities] = useState({});

  useEffect(() => {
    fetchDietChartDetails();
    fetchFoodDatabase();
  }, [chartId]);

  const fetchDietChartDetails = async () => {
    try {
      const response = await getDietChartDetails(chartId);
      setDietChart(response.data);
    } catch (error) {
      console.error('Error fetching diet chart:', error);
      alert('Failed to load diet chart');
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodDatabase = async () => {
    try {
      const response = await getAllFoods();
      setFoodDatabase(response.data);
    } catch (error) {
      console.error('Error fetching food database:', error);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
    // Initialize edited quantities with current values
    const quantities = {};
    dietChart.meals.forEach(meal => {
      meal.foodItems.forEach(item => {
        quantities[item.id] = item.quantity;
      });
    });
    setEditedQuantities(quantities);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedQuantities({});
    fetchDietChartDetails(); // Refresh to original data
  };

  const handleQuantityChange = (foodItemId, newQuantity) => {
    setEditedQuantities(prev => ({
      ...prev,
      [foodItemId]: parseFloat(newQuantity) || 0
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // Update quantities for each meal
      const updatePromises = dietChart.meals.map(async (meal) => {
        const updatedFoodItems = meal.foodItems.map(item => ({
          id: item.id,
          foodId: item.food.id,
          quantity: editedQuantities[item.id] || item.quantity
        }));

        return updateMeal(meal.id, {
          mealType: meal.mealType,
          dayNumber: meal.dayNumber,
          foodItems: updatedFoodItems
        });
      });

      await Promise.all(updatePromises);
      
      alert('Diet chart updated successfully!');
      setEditMode(false);
      fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const openFoodModal = (meal) => {
    setSelectedMeal(meal);
    setShowFoodModal(true);
    setSearchTerm('');
  };

  const closeFoodModal = () => {
    setShowFoodModal(false);
    setSelectedMeal(null);
    setSearchTerm('');
  };

  const handleAddFood = async (food) => {
    try {
      await addFoodToMeal({
        mealId: selectedMeal.id,
        foodId: food.id,
        quantity: 100 // Default quantity
      });

      alert(`${food.name} added successfully!`);
      closeFoodModal();
      fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food item');
    }
  };

  const handleDeleteFood = async (mealId, foodItemId, foodName) => {
    if (!window.confirm(`Are you sure you want to remove ${foodName}?`)) {
      return;
    }

    try {
      await deleteMealFood(mealId, foodItemId);
      alert('Food item removed successfully!');
      fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error deleting food:', error);
      alert('Failed to remove food item');
    }
  };

  const calculateMealCalories = (meal) => {
    return meal.foodItems.reduce((total, item) => {
      const quantity = editMode ? (editedQuantities[item.id] || item.quantity) : item.quantity;
      const multiplier = quantity / 100;
      return total + (item.food.calories * multiplier);
    }, 0).toFixed(0);
  };

  const calculateDayCalories = (dayNumber) => {
    const dayMeals = dietChart.meals.filter(m => m.dayNumber === dayNumber);
    return dayMeals.reduce((total, meal) => {
      return total + parseFloat(calculateMealCalories(meal));
    }, 0).toFixed(0);
  };

  const calculateTotalCalories = () => {
    if (!dietChart) return 0;
    return dietChart.meals.reduce((total, meal) => {
      return total + parseFloat(calculateMealCalories(meal));
    }, 0).toFixed(0);
  };

  const groupMealsByDay = () => {
    if (!dietChart) return [];
    
    const days = [];
    for (let i = 1; i <= dietChart.durationDays; i++) {
      const dayMeals = dietChart.meals.filter(m => m.dayNumber === i);
      days.push({
        dayNumber: i,
        meals: dayMeals
      });
    }
    return days;
  };

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMealTypeLabel = (mealType) => {
    const labels = {
      BREAKFAST: '🍳 Breakfast',
      LUNCH: '🍽️ Lunch',
      SNACK: '🍪 Snack',
      DINNER: '🍝 Dinner'
    };
    return labels[mealType] || mealType;
  };

  if (loading) {
    return <div className="loading">Loading diet chart...</div>;
  }

  if (!dietChart) {
    return <div className="loading">Diet chart not found</div>;
  }

  const dayGroups = groupMealsByDay();

  return (
    <div className="diet-chart-editor">
   
      <div className="page-header">
        <div>
          <h1 className="page-title">Diet Chart Editor</h1>
          <p className="page-subtitle">
            Patient: {dietChart.patient.name} | Duration: {dietChart.durationDays} days
          </p>
        </div>
        <div className="header-actions">
          {!editMode ? (
            <>
              <button onClick={() => navigate(-1)} className="btn btn-secondary">
                ← Back
              </button>
              <button onClick={handleEditMode} className="btn btn-primary">
                ✏️ Edit Diet Chart
              </button>
            </>
          ) : (
            <>
              <button onClick={handleCancelEdit} className="btn btn-secondary">
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges} 
                className="btn btn-success"
                disabled={saving}
              >
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

    
      <div className="card">
        <div className="chart-info-grid">
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`badge badge-${dietChart.status === 'ACTIVE' ? 'success' : 'info'}`}>
              {dietChart.status}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Start Date:</span>
            <span>{formatDate(dietChart.startDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">End Date:</span>
            <span>{formatDate(dietChart.endDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Calories:</span>
            <span className="calorie-value">{calculateTotalCalories()} kcal</span>
          </div>
        </div>
      </div>

  
      {dayGroups.map((day) => (
        <div key={day.dayNumber} className="card day-card">
          <div className="day-header">
            <h2>Day {day.dayNumber}</h2>
            <span className="day-calories">
              {calculateDayCalories(day.dayNumber)} kcal
            </span>
          </div>

          {['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'].map((mealType) => {
            const meal = day.meals.find(m => m.mealType === mealType);
            
            if (!meal) return null;

            return (
              <div key={mealType} className="meal-section">
                <div className="meal-header">
                  <h3>{getMealTypeLabel(mealType)}</h3>
                  <div className="meal-header-right">
                    <span className="meal-calories">
                      {calculateMealCalories(meal)} kcal
                    </span>
                    {editMode && (
                      <button
                        onClick={() => openFoodModal(meal)}
                        className="btn btn-sm btn-success"
                      >
                        + Add Food
                      </button>
                    )}
                  </div>
                </div>

                <div className="food-items-list">
                  {meal.foodItems.length === 0 ? (
                    <div className="empty-meal">
                      <p>No food items added yet</p>
                    </div>
                  ) : (
                    meal.foodItems.map((item) => (
                      <div key={item.id} className="food-item">
                        <div className="food-item-info">
                          <span className="food-name">{item.food.name}</span>
                          <span className="food-details">
                            {item.food.calories} kcal per 100g | 
                            P: {item.food.protein}g | 
                            C: {item.food.carbs}g | 
                            F: {item.food.fat}g
                          </span>
                        </div>
                        <div className="food-item-actions">
                          {editMode ? (
                            <>
                              <input
                                type="number"
                                value={editedQuantities[item.id] ?? item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="quantity-input"
                                min="0"
                                step="10"
                              />
                              <span className="unit">g</span>
                              <button
                                onClick={() => handleDeleteFood(meal.id, item.id, item.food.name)}
                                className="btn btn-danger btn-sm"
                                title="Remove food"
                              >
                                🗑️
                              </button>
                            </>
                          ) : (
                            <span className="quantity-display">
                              {item.quantity}g
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

    
      {showFoodModal && (
        <div className="modal-overlay" onClick={closeFoodModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Add Food to {getMealTypeLabel(selectedMeal.mealType)} - Day {selectedMeal.dayNumber}
              </h2>
              <button onClick={closeFoodModal} className="btn-close">
                ×
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="🔍 Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                autoFocus
              />

              <div className="food-search-results">
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      className="food-search-item"
                      onClick={() => handleAddFood(food)}
                    >
                      <div className="food-search-info">
                        <div className="food-search-name">{food.name}</div>
                        <div className="food-search-details">
                          {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g (per 100g)
                        </div>
                      </div>
                      <button className="btn btn-sm btn-primary">
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    {searchTerm ? 'No food items found' : 'Start typing to search...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietChartEditor;*/
// components/dietitian/DietChartEditor.jsx
/*import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getDietChartDetails, 
  addFoodToMeal, 
  deleteMealFood,
  updateFoodQuantity,
  getAllFoodsFromDatabase,
  searchFoodsInDatabase
} from '../../services/api';
import { formatDate } from '../../utils/helpers';
import '../../styles/dietitian.css';

function DietChartEditor({ user }) {
  const { chartId } = useParams();
  const navigate = useNavigate();
  
  const [dietChart, setDietChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Food search modal state
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    fetchDietChartDetails();
    fetchFoodDatabase();
  }, [chartId]);

  const fetchDietChartDetails = async () => {
    try {
      const response = await getDietChartDetails(chartId);
      setDietChart(response.data);
    } catch (error) {
      console.error('Error fetching diet chart:', error);
      alert('Failed to load diet chart');
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodDatabase = async () => {
    try {
      const response = await getAllFoodsFromDatabase();
      setFoodDatabase(response.data);
    } catch (error) {
      console.error('Error fetching food database:', error);
    }
  };

  const handleQuantityChange = async (dietChartId, mealId, mealFoodId, newQuantity) => {
    if (newQuantity < 0) return;
    
    setSaving(true);
    try {
      await updateFoodQuantity(dietChartId, mealId, mealFoodId, parseFloat(newQuantity));
      await fetchDietChartDetails(); // Refresh to show updated values
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setSaving(false);
    }
  };

  const openFoodModal = (meal) => {
    setSelectedMeal(meal);
    setShowFoodModal(true);
    setSearchTerm('');
  };

  const closeFoodModal = () => {
    setShowFoodModal(false);
    setSelectedMeal(null);
    setSearchTerm('');
  };

  const handleAddFood = async (food) => {
    try {
      setSaving(true);
      await addFoodToMeal(dietChart.id, selectedMeal.id, {
        foodId: food.id,
        quantity: 100 // Default quantity in grams
      });

      alert(`${food.name} added successfully!`);
      closeFoodModal();
      await fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food item');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFood = async (mealId, mealFoodId, foodName) => {
    if (!window.confirm(`Are you sure you want to remove ${foodName}?`)) {
      return;
    }

    try {
      setSaving(true);
      await deleteMealFood(dietChart.id, mealId, mealFoodId);
      alert('Food item removed successfully!');
      await fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error deleting food:', error);
      alert('Failed to remove food item');
    } finally {
      setSaving(false);
    }
  };

  const handleSearchFood = async (query) => {
    setSearchTerm(query);
    if (query.trim() === '') {
      setFoodDatabase(foodDatabase);
      return;
    }

    try {
      const response = await searchFoodsInDatabase(query);
      setFoodDatabase(response.data);
    } catch (error) {
      console.error('Error searching foods:', error);
    }
  };

  const calculateMealCalories = (meal) => {
    if (!meal.mealFoods || meal.mealFoods.length === 0) {
      return 0;
    }
    return meal.mealFoods.reduce((total, mealFood) => {
      return total + (mealFood.calories || 0);
    }, 0).toFixed(0);
  };

  const calculateDayCalories = (dayNumber) => {
    const dayMeals = dietChart.meals.filter(m => m.dayNumber === dayNumber);
    return dayMeals.reduce((total, meal) => {
      return total + parseFloat(calculateMealCalories(meal));
    }, 0).toFixed(0);
  };

  const groupMealsByDay = () => {
    if (!dietChart) return [];
    
    const days = [];
    for (let i = 1; i <= dietChart.durationDays; i++) {
      const dayMeals = dietChart.meals.filter(m => m.dayNumber === i);
      days.push({
        dayNumber: i,
        meals: dayMeals
      });
    }
    return days;
  };

  const getMealTypeLabel = (mealType) => {
    const labels = {
      BREAKFAST: 'Breakfast',
      LUNCH: 'Lunch',
      SNACK: 'Snack',
      DINNER: 'Dinner'
    };
    return labels[mealType] || mealType;
  };

  if (loading) {
    return <div className="loading">Loading diet chart...</div>;
  }

  if (!dietChart) {
    return <div className="loading">Diet chart not found</div>;
  }

  const dayGroups = groupMealsByDay();

  return (
    <div className="diet-chart-editor">
      <div className="page-header">
        <div>
          <h1 className="page-title">Diet Chart Editor</h1>
          <p className="page-subtitle">
            Patient: {dietChart.patient.name} | Duration: {dietChart.durationDays} days
          </p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Back
          </button>
        </div>
      </div>

      <div className="card">
        <div className="chart-info-grid">
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`badge badge-${dietChart.status === 'ACTIVE' ? 'success' : 'info'}`}>
              {dietChart.status}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Start Date:</span>
            <span>{formatDate(dietChart.startDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">End Date:</span>
            <span>{formatDate(dietChart.endDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Calories:</span>
            <span className="calorie-value">{dietChart.totalCalories?.toFixed(0)} kcal</span>
          </div>
          {dietChart.versionNumber && (
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span>{dietChart.versionNumber}</span>
            </div>
          )}
          {dietChart.lastModifiedBy && (
            <div className="info-item">
              <span className="info-label">Last Modified By:</span>
              <span>{dietChart.lastModifiedBy}</span>
            </div>
          )}
        </div>
      </div>

      {dayGroups.map((day) => (
        <div key={day.dayNumber} className="card day-card">
          <div className="day-header">
            <h2>Day {day.dayNumber}</h2>
            <span className="day-calories">
              {calculateDayCalories(day.dayNumber)} kcal
            </span>
          </div>

          {['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'].map((mealType) => {
            const meal = day.meals.find(m => m.mealType === mealType);
            
            if (!meal) return null;

            return (
              <div key={mealType} className="meal-section">
                <div className="meal-header">
                  <h3>{getMealTypeLabel(mealType)}</h3>
                  <div className="meal-header-right">
                    <span className="meal-calories">
                      {calculateMealCalories(meal)} kcal
                    </span>
                    <button
                      onClick={() => openFoodModal(meal)}
                      className="btn btn-sm btn-success"
                      disabled={saving}
                    >
                      + Add Food
                    </button>
                  </div>
                </div>

                <div className="food-items-list">
                  {!meal.mealFoods || meal.mealFoods.length === 0 ? (
                    <div className="empty-meal">
                      <p>No food items added yet</p>
                    </div>
                  ) : (
                    meal.mealFoods.map((mealFood) => (
                      <div key={mealFood.id} className="food-item">
                        <div className="food-item-info">
                          <span className="food-name">{mealFood.food.name}</span>
                          <span className="food-details">
                            {mealFood.food.calories} kcal per 100g | 
                            P: {mealFood.food.protein}g | 
                            C: {mealFood.food.carbs}g | 
                            F: {mealFood.food.fats}g
                          </span>
                        </div>
                        <div className="food-item-actions">
                          <input
                            type="number"
                            value={mealFood.quantity}
                            onChange={(e) => handleQuantityChange(
                              dietChart.id, 
                              meal.id, 
                              mealFood.id, 
                              e.target.value
                            )}
                            className="quantity-input"
                            min="0"
                            step="10"
                            disabled={saving}
                          />
                          <span className="unit">g</span>
                          <button
                            onClick={() => handleDeleteFood(meal.id, mealFood.id, mealFood.food.name)}
                            className="btn btn-danger btn-sm"
                            title="Remove food"
                            disabled={saving}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {showFoodModal && (
        <div className="modal-overlay" onClick={closeFoodModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Add Food to {getMealTypeLabel(selectedMeal.mealType)} - Day {selectedMeal.dayNumber}
              </h2>
              <button onClick={closeFoodModal} className="btn-close">
                Close
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => handleSearchFood(e.target.value)}
                className="search-input"
                autoFocus
              />

              <div className="food-search-results">
                {foodDatabase.length > 0 ? (
                  foodDatabase.map((food) => (
                    <div
                      key={food.id}
                      className="food-search-item"
                    >
                      <div className="food-search-info">
                        <div className="food-search-name">{food.name}</div>
                        <div className="food-search-details">
                          {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g (per 100g)
                        </div>
                        <div className="food-search-ayurvedic">
                          Dosha: {food.dosha} | Virya: {food.virya}
                        </div>
                      </div>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddFood(food)}
                        disabled={saving}
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    {searchTerm ? 'No food items found' : 'Start typing to search...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietChartEditor;*/
// components/dietitian/DietChartEditor.jsx
/*import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getDietChartDetails, 
  addFoodToMeal, 
  deleteMealFood,
  updateFoodQuantity,
  getAllFoodsFromDatabase,
  searchFoodsInDatabase
} from '../../services/api';
import { formatDate } from '../../utils/helpers';
import '../../styles/dietitian.css';

function DietChartEditor({ user }) {
  const { chartId } = useParams();
  const navigate = useNavigate();
  
  const [dietChart, setDietChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Food search modal state
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    fetchDietChartDetails();
    fetchFoodDatabase();
  }, [chartId]);

  const fetchDietChartDetails = async () => {
    try {
      const response = await getDietChartDetails(chartId);
      setDietChart(response.data);
    } catch (error) {
      console.error('Error fetching diet chart:', error);
      alert('Failed to load diet chart');
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodDatabase = async () => {
    try {
      const response = await getAllFoodsFromDatabase();
      setFoodDatabase(response.data);
    } catch (error) {
      console.error('Error fetching food database:', error);
    }
  };

  const handleQuantityChange = async (dietChartId, mealId, mealFoodId, newQuantity) => {
    if (newQuantity < 0) return;
    
    setSaving(true);
    try {
      await updateFoodQuantity(dietChartId, mealId, mealFoodId, parseFloat(newQuantity));
      await fetchDietChartDetails(); // Refresh to show updated values
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setSaving(false);
    }
  };

  const openFoodModal = (meal) => {
    setSelectedMeal(meal);
    setShowFoodModal(true);
    setSearchTerm('');
  };

  const closeFoodModal = () => {
    setShowFoodModal(false);
    setSelectedMeal(null);
    setSearchTerm('');
  };

  const handleAddFood = async (food) => {
    try {
      setSaving(true);
      
      const foodData = {
        foodId: food.id,
        quantity: 100
      };
      
      console.log('Adding food to meal:', {
        dietChartId: dietChart.id,
        mealId: selectedMeal.id,
        foodData: foodData
      });

      await addFoodToMeal(dietChart.id, selectedMeal.id, foodData);

      alert(`${food.name} added successfully!`);
      closeFoodModal();
      await fetchDietChartDetails();
    } catch (error) {
      console.error('Error adding food:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to add food item: ${error.response?.data?.error || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFood = async (mealId, mealFoodId, foodName) => {
    if (!window.confirm(`Are you sure you want to remove ${foodName}?`)) {
      return;
    }

    try {
      setSaving(true);
      await deleteMealFood(dietChart.id, mealId, mealFoodId);
      alert('Food item removed successfully!');
      await fetchDietChartDetails(); // Refresh data
    } catch (error) {
      console.error('Error deleting food:', error);
      alert('Failed to remove food item');
    } finally {
      setSaving(false);
    }
  };

  const handleSearchFood = async (query) => {
    setSearchTerm(query);
    if (query.trim() === '') {
      setFoodDatabase(foodDatabase);
      return;
    }

    try {
      const response = await searchFoodsInDatabase(query);
      setFoodDatabase(response.data);
    } catch (error) {
      console.error('Error searching foods:', error);
    }
  };

  const calculateMealCalories = (meal) => {
    if (!meal.mealFoods || meal.mealFoods.length === 0) {
      return 0;
    }
    return meal.mealFoods.reduce((total, mealFood) => {
      return total + (mealFood.calories || 0);
    }, 0).toFixed(0);
  };

  const calculateDayCalories = (dayNumber) => {
    const dayMeals = dietChart.meals.filter(m => m.dayNumber === dayNumber);
    return dayMeals.reduce((total, meal) => {
      return total + parseFloat(calculateMealCalories(meal));
    }, 0).toFixed(0);
  };

  const groupMealsByDay = () => {
    if (!dietChart) return [];
    
    const days = [];
    for (let i = 1; i <= dietChart.durationDays; i++) {
      const dayMeals = dietChart.meals.filter(m => m.dayNumber === i);
      days.push({
        dayNumber: i,
        meals: dayMeals
      });
    }
    return days;
  };

  const getMealTypeLabel = (mealType) => {
    const labels = {
      BREAKFAST: 'Breakfast',
      LUNCH: 'Lunch',
      SNACK: 'Snack',
      DINNER: 'Dinner'
    };
    return labels[mealType] || mealType;
  };

  if (loading) {
    return <div className="loading">Loading diet chart...</div>;
  }

  if (!dietChart) {
    return <div className="loading">Diet chart not found</div>;
  }

  const dayGroups = groupMealsByDay();

  return (
    <div className="diet-chart-editor">
      <div className="page-header">
        <div>
          <h1 className="page-title">Diet Chart Editor</h1>
          <p className="page-subtitle">
            Patient: {dietChart.patient.name} | Duration: {dietChart.durationDays} days
          </p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Back
          </button>
        </div>
      </div>

      <div className="card">
        <div className="chart-info-grid">
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`badge badge-${dietChart.status === 'ACTIVE' ? 'success' : 'info'}`}>
              {dietChart.status}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Start Date:</span>
            <span>{formatDate(dietChart.startDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">End Date:</span>
            <span>{formatDate(dietChart.endDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Calories:</span>
            <span className="calorie-value">{dietChart.totalCalories?.toFixed(0)} kcal</span>
          </div>
          {dietChart.versionNumber && (
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span>{dietChart.versionNumber}</span>
            </div>
          )}
          {dietChart.lastModifiedBy && (
            <div className="info-item">
              <span className="info-label">Last Modified By:</span>
              <span>{dietChart.lastModifiedBy}</span>
            </div>
          )}
        </div>
      </div>

      {dayGroups.map((day) => (
        <div key={day.dayNumber} className="card day-card">
          <div className="day-header">
            <h2>Day {day.dayNumber}</h2>
            <span className="day-calories">
              {calculateDayCalories(day.dayNumber)} kcal
            </span>
          </div>

          {['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'].map((mealType) => {
            const meal = day.meals.find(m => m.mealType === mealType);
            
            if (!meal) return null;

            return (
              <div key={mealType} className="meal-section">
                <div className="meal-header">
                  <h3>{getMealTypeLabel(mealType)}</h3>
                  <div className="meal-header-right">
                    <span className="meal-calories">
                      {calculateMealCalories(meal)} kcal
                    </span>
                    <button
                      onClick={() => openFoodModal(meal)}
                      className="btn btn-sm btn-success"
                      disabled={saving}
                    >
                      + Add Food
                    </button>
                  </div>
                </div>

                <div className="food-items-list">
                  {!meal.mealFoods || meal.mealFoods.length === 0 ? (
                    <div className="empty-meal">
                      <p>No food items added yet</p>
                    </div>
                  ) : (
                    meal.mealFoods.map((mealFood) => (
                      <div key={mealFood.id} className="food-item">
                        <div className="food-item-info">
                          <span className="food-name">{mealFood.food.name}</span>
                          <span className="food-details">
                            {mealFood.food.calories} kcal per 100g | 
                            P: {mealFood.food.protein}g | 
                            C: {mealFood.food.carbs}g | 
                            F: {mealFood.food.fats}g
                          </span>
                        </div>
                        <div className="food-item-actions">
                          <input
                            type="number"
                            value={mealFood.quantity}
                            onChange={(e) => handleQuantityChange(
                              dietChart.id, 
                              meal.id, 
                              mealFood.id, 
                              e.target.value
                            )}
                            className="quantity-input"
                            min="0"
                            step="10"
                            disabled={saving}
                          />
                          <span className="unit">g</span>
                          <button
                            onClick={() => handleDeleteFood(meal.id, mealFood.id, mealFood.food.name)}
                            className="btn btn-danger btn-sm"
                            title="Remove food"
                            disabled={saving}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {showFoodModal && (
        <div className="modal-overlay" onClick={closeFoodModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Add Food to {getMealTypeLabel(selectedMeal.mealType)} - Day {selectedMeal.dayNumber}
              </h2>
              <button onClick={closeFoodModal} className="btn-close">
                Close
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => handleSearchFood(e.target.value)}
                className="search-input"
                autoFocus
              />

              <div className="food-search-results">
                {foodDatabase.length > 0 ? (
                  foodDatabase.map((food) => (
                    <div
                      key={food.id}
                      className="food-search-item"
                    >
                      <div className="food-search-info">
                        <div className="food-search-name">{food.name}</div>
                        <div className="food-search-details">
                          {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g (per 100g)
                        </div>
                        <div className="food-search-ayurvedic">
                          Dosha: {food.dosha} | Virya: {food.virya}
                        </div>
                      </div>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddFood(food)}
                        disabled={saving}
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    {searchTerm ? 'No food items found' : 'Start typing to search...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietChartEditor;*/


