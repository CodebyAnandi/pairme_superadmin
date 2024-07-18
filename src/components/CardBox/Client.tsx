// import { mdiTrendingDown, mdiTrendingNeutral, mdiTrendingUp } from '@mdi/js'
import React from 'react'
// import { Client } from '../../interfaces'
import CardBox from '.'
import PillTag from '../PillTag'
// import UserAvatar from '../UserAvatar'


const ReportCard = ({ latestFiveReport }) => {
  const pillColor = () => {
    // Define color logic based on report status or type
    // Example: return 'success' or 'danger' based on conditions
    return 'info'; // Placeholder color
  };

  const pillIcon = 'mdi-alert-circle-outline'; // Example icon for the pill tag

  return (
    <CardBox className="mb-12 last:mb-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          {/* <UserAvatar className="w-12 h-12 md:mr-6 mb-6 md:mb-0" username={latestFiveReport.reportedBy} /> */}
          <div className="text-center md:text-left overflow-hidden">
            <h4 className="text-xl text-ellipsis">{latestFiveReport.reportedBy}</h4>
            <p className="text-gray-500 dark:text-slate-400">
             <b>Reported to:</b>  {latestFiveReport.reportedTo}
              <br />
               <b>Reason:</b> {latestFiveReport.reason}
            </p>
          </div>
        </div>

        <PillTag color={pillColor()} label="Reported" />
      </div>
    </CardBox>
  );
};

export default ReportCard;
