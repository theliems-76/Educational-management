import React from 'react';

const StudentTableHeader = ({ selectedRows, handleRowSelect, students }) => {
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
        <th className="py-2 px-4 text-left">Họ Tên</th>

                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
                    style={{ fontFamily: "Roboto" }}
                >
                    Giới Tính
                </th>
                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/6"
                    style={{ fontFamily: "Roboto" }}
                >
                    Ngày Sinh
                </th>
                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
                    style={{ fontFamily: "Roboto" }}
                >
                    Lớp
                </th>
                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
                    style={{ fontFamily: "Roboto" }}
                >
                    Trường Học
                </th>
                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
                    style={{ fontFamily: "Roboto" }}
                >
                    Lớp học thêm
                </th>
                <th
                    className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
                    style={{ fontFamily: "Roboto" }}
                >
                    Chỉnh Sửa
                </th>
            </tr>
        </thead>
    );
};

export default StudentTableHeader;