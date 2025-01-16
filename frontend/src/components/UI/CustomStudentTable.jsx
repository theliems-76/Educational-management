import React from 'react';
import CustomStudentTableHeader from './CustomStudentTableHeader';
import CustomStudentTableRow from './CustomStudentTableRow';

const CustomStudentTable = ({ students, selectedRows, handleRowSelect, handleOpenEditModal }) => {
  return (
    <div className="overflow-auto max-h-[400px] min-w-full">
      <table className="w-full">
        <CustomStudentTableHeader selectedRows={selectedRows} handleRowSelect={handleRowSelect} students={students} />
        <tbody>
          {students.map((student) => (
            <CustomStudentTableRow
              key={student.idStudent}
              student={student}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleOpenEditModal={handleOpenEditModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomStudentTable;