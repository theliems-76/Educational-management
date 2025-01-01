import React from 'react';
import TutorTableRow from "./TutorTableRow";
import TutorTableHeader from "./TutorTableHeader";

const TutorTable = ({ tutors, selectedRows, handleRowSelect, handleOpenEditModal }) => {
    return (
        <div className="overflow-auto max-h-[400px] min-w-full">
            <table className="w-full">
              <TutorTableHeader />
                <tbody>
                  {tutors.map((tutor) => (
                         <TutorTableRow
                              key={tutor.id}
                              tutor={tutor}
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