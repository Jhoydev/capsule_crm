import React from 'react';

function Map() {
    return (
        <div className="map bg-gray-100 p-4 text-left">
            <h3 className="text-lg font-bold">Map</h3>
            <img src="map-image.jpg" alt="Map" className="w-full h-auto mt-2" />
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">STREET VIEW</button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 ml-2">DIRECTIONS</button>
        </div>
    );
}

export default Map;
