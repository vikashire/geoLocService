import React from "react";
import "./PlacesList.css";

const PlacesList = ({ results }) => {
    return (
        <div className="results-container">
            <h2 className="results-header">Search Results</h2>
            {results.length === 0 ? (
                <p className="no-results">No results found.</p>
            ) : (
                <ul className="results-list">
                    {results.map((result, index) => (
                        <li key={index} className="result-item">
                            <img
                                src={result.icon}
                                alt={`${result.name} Icon`}
                                className="result-icon"
                            />
                            <div>
                                <h3 className="result-name">{result.name}</h3>
                                <p className="result-address">{result.address}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlacesList;
