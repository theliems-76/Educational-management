import React from 'react';

const CustomStudentTableHeader = () => {
  return (
    <thead>
      <tr className="bg-[#f2f4f8]">
        <th className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12">
          <input type="checkbox" disabled /> {/* Ô checkbox header để disabled */}
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
          style={{ fontFamily: 'Roboto' }}
        >
          ID
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/6"
          style={{ fontFamily: 'Roboto' }}
        >
          Họ Tên
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
          style={{ fontFamily: 'Roboto' }}
        >
          Giới Tính
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/6"
          style={{ fontFamily: 'Roboto' }}
        >
          Ngày Sinh
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
          style={{ fontFamily: 'Roboto' }}
        >
          Lớp
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
          style={{ fontFamily: 'Roboto' }}
        >
          Trường Học
        </th>
        <th
          className="text-gray-700 text-base font-normal text-left py-2 px-4 w-1/12"
          style={{ fontFamily: 'Roboto' }}
        >
          Lớp học thêm
        </th>
      </tr>
    </thead>
  );
};

export default CustomStudentTableHeader;