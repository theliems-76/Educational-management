import React from 'react';

const CustomStudentTableRow = ({ student, selectedRows, handleRowSelect }) => {
  const isSelected = selectedRows.includes(student.id);

  const handleCheckboxChange = (event) => {
    event.stopPropagation(); // Ngăn chặn click vào checkbox kích hoạt onClick của cả hàng
    handleRowSelect(student.id);
  };

  return (
    <tr
      key={student.id}
      className="border-b border-gray-200 hover:bg-gray-100"
    >
      <td className="text-gray-700 text-base font-normal py-2 px-4 w-1/12">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.id}
      </td>
      <td
        className="text-blue-800 text-base font-semibold py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.name}
        <div className="text-gray-500 text-sm">{student.phoneNumber}</div>
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.gender}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.dateOfBirth}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.grade}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.school}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.extraClasses &&
          student.extraClasses.map((extraClass) => (
            <span
              key={extraClass}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
            >
              {extraClass}
            </span>
          ))}
      </td>
    </tr>
  );
};

export default CustomStudentTableRow;