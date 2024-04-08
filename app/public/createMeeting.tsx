// This code should probably not exist in an individual page; as adding a new meeting 
 //   should be done from within a lead page 
 import React, { useState } from 'react';

 export function RegisterMeeting() {
   const [formData, setFormData] = useState({
     title: '',
     agenda: '',
     startTime: '',
     endTime: '',
     priority: 'Low'
   });
 
   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value
     });
   };
 
   const handleSubmit = () => {
     fetch('/api/meetings', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })
     .then(response => {
       if (response.ok) {
         console.log('Meeting registered successfully');
         setFormData({
           title: '',
           agenda: '',
           startTime: '',
           endTime: '',
           priority: 'Low'
         });
       } else {
         console.error('Failed to register meeting');
       }
     })
     .catch(error => {
       console.error('Error registering meeting:', error);
     });
   };
 
   return (
     <>
       <h1>Register New Meeting</h1>
       <form id="meetingForm">
         <label htmlFor="title">Title:</label><br />
         <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br /><br />
 
         <label htmlFor="agenda">Agenda:</label><br />
         <textarea id="agenda" name="agenda" value={formData.agenda} onChange={handleChange} rows={4} cols={50}></textarea><br /><br />
 
         <label htmlFor="startTime">Start Time:</label><br />
         <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required /><br /><br />
 
         <label htmlFor="endTime">End Time:</label><br />
         <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required /><br /><br />
 
         <label htmlFor="priority">Priority:</label><br />
         <select id="priority" name="priority" value={formData.priority} onChange={handleChange} required>
           <option value="Low">Low</option>
           <option value="Medium">Medium</option>
           <option value="High">High</option>
         </select><br /><br />
 
         <button type="button" onClick={handleSubmit}>Register Meeting</button>
       </form>
     </>
   );
 }
 