import React from "react";

const TutorSearch = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Tìm kiếm theo ID hoặc tên..."
      className="border border-gray-300 rounded px-3 py-2"
      style={{ width: '200px' }}
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default TutorSearch;