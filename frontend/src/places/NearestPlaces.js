import React, { useState } from "react";
import PlacesList from "./PlacesList";
import "./../App.css";

const NearestPlaces = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const PLACES_TYPES = [
    { 'Restaurant': 'restaurant' },
    { 'Bar': 'bar' },
    { 'Cafe': 'cafe' },
    { 'Hotel': 'lodging' },
    { 'Bank': 'bank' },
    { 'ATM': 'atm' },
    { 'Museum': 'museum' },
    { 'Store': 'store' },
    { 'Park': 'park' },
    { 'School': 'school' },
    { 'Hospital': 'hospital' },
    { 'Pharmacy': 'pharmacy' },
    { 'Post Office': 'post_office' },
    { 'Church': 'church' },
    { 'Gym': 'gym' },
    { 'Library': 'library' },
    { 'Shopping Mall': 'shopping_mall' },
    { 'Supermarket': 'supermarket' },
    { 'Zoo': 'zoo' },
    { 'Airport': 'airport' },
    { 'Train Station': 'train_station' },
    { 'Bus Station': 'bus_station' },
    { 'Taxi Stand': 'taxi_stand' },
    { 'Liquor Store': 'liquor_store' },
    { 'Grocery Store': 'grocery_or_supermarket' },
    { 'Parking': 'parking' },
    { 'Car Rental': 'car_rental' },
    { 'Spa': 'spa' },
    { 'Beauty Salon': 'beauty_salon' }
  ];


  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    performSearch();
  };

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5003/api/places?latitude=${latitude}&longitude=${longitude}&type=${placeType}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch places.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Search Nearest Places</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="latitude" className="label">
            Latitude:
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude" className="label">
            Longitude:
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="placeType" className="label">
            Place Type:
          </label>
          <select
            id="placeType"
            value={placeType}
            onChange={(e) => setPlaceType(e.target.value)}
            required
            className="select"
          >
            <option value="" disabled>
              Select place type
            </option>
            {PLACES_TYPES.map((place) => {
    const [key, value] = Object.entries(place)[0];
    return (
      <option key={value} value={value}>
        {key}
      </option>
    );
  })}

          </select>
        </div>
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <br />
      {(results.length > 0) && <PlacesList results={results} />}
    </div>
  );
};

export default NearestPlaces;
