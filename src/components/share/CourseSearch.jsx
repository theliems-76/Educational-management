import React from "react";

const CourseSearch = ({ searchQuery, handleSearchChange }) => {
  return (
    <input
        type="text"
        placeholder="Tìm kiếm lớp học..."
        className="border border-gray-300 rounded px-3 py-1"
        style={{ width: '200px' }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
  );
};
export default CourseSearch;