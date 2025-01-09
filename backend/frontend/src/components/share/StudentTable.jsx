import React from 'react';
import StudentTableHeader from './StudentTableHeader';
import StudentTableRow from './StudentTableRow';

const StudentTable = ({ students, selectedRows, handleRowSelect, handleOpenEditModal }) => {
  return (
    <div className="overflow-auto max-h-[400px] min-w-full">
      <table className="w-full">
        <StudentTableHeader />
        <tbody>
          {students.map((student) => (
            <StudentTableRow
              key={student.id}
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

export default StudentTable;