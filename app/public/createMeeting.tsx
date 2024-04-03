// This code should probably not exist in an individual page; as adding a new meeting 
 //   should be done from within a lead page 

 import React from 'react';


 export function RegisterLeadPage() {
  return (
    <>
      <h1>Register New Meeting</h1>
      <form id="meetingForm">
        <label htmlFor="title">Title:</label><br />
        <input type="text" id="title" name="title" required /><br /><br />

        <label htmlFor="agenda">Agenda:</label><br />
        <textarea id="agenda" name="agenda" rows={4} cols={50}></textarea><br /><br />

        <label htmlFor="startTime">Start Time:</label><br />
        <input type="datetime-local" id="startTime" name="startTime" required /><br /><br />

        <label htmlFor="endTime">End Time:</label><br />
        <input type="datetime-local" id="endTime" name="endTime" required /><br /><br />

        <label htmlFor="priority">Priority:</label><br />
        <select id="priority" name="priority" required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select><br /><br />

        <button type="button" onClick={registerMeeting}>Register Meeting</button>
      </form>
    </>
  );
}

function registerMeeting() {
  console.log('meeting registered');
}
