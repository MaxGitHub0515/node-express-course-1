
import React from 'react'
// HARDCODED FOR NOW
const Conversation = () => {
  return (
   <>
    <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
      {/* alter hardcoded online satus */}
      <div className="avatar online ">
        <div className="w-12 rounded-full">
          <img src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
           alt="User Avatar" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className='flex gap-5 justify-betweenk'>
          <p className='font-bold text-gray-200'>Jane Doe</p>
          <span className='text-xl'>😓</span>
        </div>
      </div>
    </div>
    <div className='divider my-0 py-0 h-1'></div>
   </>
  )
}

export default Conversation