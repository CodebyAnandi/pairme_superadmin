import React from 'react'
import CardBox from '.' // Adjust the path as per your project structure

const CardBoxTransaction = ({ latestFiveUser }) => {
  // console.log('.........', latestFiveUser)
  return (
    <CardBox className="mb-6 last:mb-0">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-6 last:mb-0">
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {/* Assuming you have an appropriate profile image */}
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${latestFiveUser.profileImage || process.env.DEFOULTIMAGE}`}
              alt={latestFiveUser.name || 'Default Name'}
            />
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold">{latestFiveUser.name}</h4>
              <p className="text-gray-500 dark:text-slate-400">
                <b>Email:</b> {latestFiveUser.email}
                <br />
                <b>Phone:</b> {latestFiveUser.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxTransaction
