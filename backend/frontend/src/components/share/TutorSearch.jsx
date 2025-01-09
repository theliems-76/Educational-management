import React from "react";

const TutorSearch = ({ searchQuery, handleSearch }) => {
  return (
    <input
        type="text"
       placeholder="Tìm kiếm..."
       className="border border-gray-300 rounded px-3 py-1"
       style={{ width: '200px' }}
        onChange = {handleSearch}
      />
  );
};
export default TutorSearch;