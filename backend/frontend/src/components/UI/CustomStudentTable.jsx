import React from 'react';
import CustomStudentTableHeader from './CustomStudentTableHeader';
import CustomStudentTableRow from './CustomStudentTableRow';

const CustomStudentTable = ({ students, selectedRows, handleRowSelect }) => {
  return (
    <div className="overflow-auto max-h-[400px] min-w-full">
      <table className="w-full">
        <CustomStudentTableHeader />
        <tbody>
          {students.map((student) => (
            <CustomStudentTableRow
              key={student.id}
              student={student}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomStudentTable;