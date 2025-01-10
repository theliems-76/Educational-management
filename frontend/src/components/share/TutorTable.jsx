import React from 'react';
import TutorTableHeader from './TutorTableHeader';
import TutorTableRow from './TutorTableRow';

const TutorTable = ({ teachers, selectedRows, handleRowSelect, handleOpenEditModal }) => {
  return (
    <div className="overflow-auto max-h-[400px] min-w-full">
      <table className="w-full">
        <TutorTableHeader
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          teachers={teachers}
        />
        <tbody>
          {teachers.map((teacher) => (
            <TutorTableRow
              key={teacher.id}
              teacher={teacher}
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

export default TutorTable;