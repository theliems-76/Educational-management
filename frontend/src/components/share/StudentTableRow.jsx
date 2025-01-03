import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const StudentTableRow = ({ student, selectedRows, handleRowSelect, handleOpenEditModal }) => {
    return (
        <tr
            key={student.id}
            className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowSelect(student.id)}
            style={{
                backgroundColor: selectedRows.includes(student.id)
                    ? "#f0f0f0"
                    : "white",
            }}
        >
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.id}
            </td>
            <td
                className="text-blue-800 text-base font-semibold py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.name}
                <div className="text-gray-500 text-sm">{student.phoneNumber}</div>
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.gender}
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.dateOfBirth}
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.grade}
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.school}
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                {student.extraClasses && student.extraClasses.map(extraClass => (
                    <span key={extraClass} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">
                        {extraClass}
                    </span>
                ))}
            </td>
            <td
                className="text-gray-700 text-base font-normal py-2 px-4"
                style={{ fontFamily: "Roboto" }}
            >
                 <button
                    className="text-blue-500 hover:underline flex items-center"
                    onClick={() => handleOpenEditModal(student)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                    Chỉnh sửa
                </button>
            </td>
        </tr>
    );
};

export default StudentTableRow;