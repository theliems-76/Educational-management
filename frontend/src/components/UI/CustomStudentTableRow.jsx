import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const CustomStudentTableRow = ({
  student,
  selectedRows,
  handleRowSelect,
  handleOpenEditModal,
}) => {
  return (
    <tr
      key={student.idStudent}
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={() => handleRowSelect(student.idStudent)}
      style={{
        backgroundColor: selectedRows.includes(student.idStudent)
          ? '#f0f0f0'
          : 'white',
      }}
    >
      <td className="py-2 px-4">
        <input
          type="checkbox"
          checked={selectedRows.includes(student.idStudent)}
          onChange={() => handleRowSelect(student.idStudent)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.idStudent}
      </td>
      <td
        className="text-blue-800 text-base font-semibold py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.user.username}
        <div className="text-gray-500 text-sm">{student.user.phone}</div>
      </td>
      <td className="text-gray-700 text-base font-normal py-2 px-4" style={{ fontFamily: 'Roboto' }}>
        {student.user.email}
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
        {student.dob}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        {student.classOfSchool}
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
        {student.classStudents &&
          student.classStudents.map((extraClass, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
            >
              {extraClass}
            </span>
          ))}
      </td>
      <td
        className="text-gray-700 text-base font-normal py-2 px-4"
        style={{ fontFamily: 'Roboto' }}
      >
        <button
          className="text-blue-500 hover:underline flex items-center"
          onClick={(event) => {
            event.stopPropagation();
            handleOpenEditModal(student);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
          Chỉnh sửa
        </button>
      </td>
    </tr>
  );
};

export default CustomStudentTableRow;