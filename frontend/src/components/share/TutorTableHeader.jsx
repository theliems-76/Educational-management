import React from 'react';

const TutorTableHeader = ({ selectedRows, handleRowSelect, teachers }) => {
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allTeacherIds = teachers.map((teacher) => teacher.id);
      handleRowSelect(allTeacherIds);
    } else {
      handleRowSelect([]);
    }
  };

  return (
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4 text-left">
          <input
            type="checkbox"
            checked={
              teachers.length > 0 && selectedRows.length === teachers.length
            }
            onChange={handleSelectAllClick}
          />
        </th>
        <th className="py-2 px-4 text-left">ID</th>
        <th className="py-2 px-4 text-left">Tên</th>
        <th className="py-2 px-4 text-left">Email</th>
        <th className="py-2 px-4 text-left">Ngày sinh</th>
        <th className="py-2 px-4 text-left">Giới tính</th>
        <th className="py-2 px-4 text-left">Trường Đại học</th>
        <th className="py-2 px-4 text-left">Lương/h</th>
        <th className="py-2 px-4 text-left">Chỉnh sửa</th>
      </tr>
    </thead>
  );
};

export default TutorTableHeader;