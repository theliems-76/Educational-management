import React from 'react';

const CustomStudentTableHeader = ({ selectedRows, handleRowSelect, students }) => {
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const allStudentIds = students.map((student) => student.idStudent);
          handleRowSelect(allStudentIds);
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
                  students.length > 0 && selectedRows.length === students.length
                }
                onChange={handleSelectAllClick}
              />
            </th>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Tên đăng nhập</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Giới tính</th>
            <th className="py-2 px-4 text-left">Ngày sinh</th>
            <th className="py-2 px-4 text-left">Lớp</th>
            <th className="py-2 px-4 text-left">Trường học</th>
            <th className="py-2 px-4 text-left">Lớp học thêm</th>
            <th className="py-2 px-4 text-left">Hành động</th>
          </tr>
        </thead>
      );
    };
    
    export default CustomStudentTableHeader;