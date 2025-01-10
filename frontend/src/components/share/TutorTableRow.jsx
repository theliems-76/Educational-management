import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const TutorTableRow = ({
  teacher,
  selectedRows,
  handleRowSelect,
  handleOpenEditModal,
}) => {
  return (
    <tr
      key={teacher.id}
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={() => handleRowSelect(teacher.id)}
      style={{
        backgroundColor: selectedRows.includes(teacher.id)
          ? '#f0f0f0'
          : 'white',
      }}
    >
      <td className="py-2 px-4">
        <input
          type="checkbox"
          checked={selectedRows.includes(teacher.id)}
          onChange={() => handleRowSelect(teacher.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.id}
      </td>
      <td
        className="text-blue-800 text-base font-semibold py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.username}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.email}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {/* Format ngày sinh cho đẹp (ví dụ: DD/MM/YYYY) */}
        {new Date(teacher.dob).toLocaleDateString('vi-VN')}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.gender}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.school}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {teacher.income}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        <button
          className="text-blue-500 hover:underline flex items-center"
          onClick={(event) => {
            event.stopPropagation();
            handleOpenEditModal(teacher);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
          Chỉnh sửa
        </button>
      </td>
    </tr>
  );
};

export default TutorTableRow;