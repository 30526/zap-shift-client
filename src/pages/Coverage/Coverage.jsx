import React from "react";
import { FiSearch } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const serviceCenters = useLoaderData();
  return (
    <div className="min-h-screen px-4 md:px-20 py-4 bg-gray-50 my-10 rounded-2xl">
      <h3 className="text-4xl font-bold text-secondary my-10">
        We are available in 64 districts
      </h3>
      <div className="relative flex items-center w-full max-w-xs sm:max-w-md group">
        {/* Search Icon */}
        <FiSearch className="absolute left-4 text-accent text-base sm:text-lg pointer-events-none group-focus-within:text-secondary transition-colors" />

        {/* Input Field */}
        <input
          type="search"
          className="w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-24 sm:pr-28 text-[10px] sm:text-xs font-medium bg-white border-none rounded-full shadow-sm focus:ring-2 focus:ring-primary/20 outline-none text-dark placeholder:text-accent"
          placeholder="Search your district"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 sm:px-6 text-[10px] sm:text-xs font-bold transition-all rounded-full bg-primary text-secondary hover:brightness-105 active:scale-95"
        >
          Search
        </button>
      </div>
      <div className="w-full bg-gray-200 h-[4px] rounded-full my-10"></div>
      <h3 className="text-2xl font-bold text-secondary">
        We deliver almost all over Bangladesh
      </h3>
      <div className="w-full h-[400px] my-4">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full rounded-2xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker position={[center.latitude, center.longitude]} key={index}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                <strong>Service Areas:</strong> {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
