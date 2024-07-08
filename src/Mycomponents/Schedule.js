// components/Schedule.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css'
import { format } from 'date-fns';
const Schedule = ({ Keyprop }) => {
  console.log(Keyprop)
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    club_id: '',
    club_name: '',
    domain_id: '',
    domain_name: '',
    event_description: '',
    date: '',
    venue: '',
  });
  const [searchDate, setSearchDate] = useState('');
  const [searchedEvents, setSearchedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events/all');
      // Filter events based on club_id
      //const filteredEvents = response.data.filter((event) => event.club_id === '5');
      //setEvents(filteredEvents);
      console.log(response.data)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };
  

  const handleAddEvent = async () => {
   
    try {
      await axios.post('http://localhost:3000/events/add', newEvent);
      setNewEvent({
        event_name: '',
        club_id: '',
        club_name: '',
        domain_id: '',
        domain_name: '',
        event_description: '',
        date: '',
        venue: '',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error.message);
    }


  };

  const handleDeleteEvent = async (eventName) => {
    try {
      await axios.delete(`http://localhost:3000/events/${eventName}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const handleSearchByDate = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/events/search?date=${searchDate}`);
      console.log(searchDate,"datrer");
      console.log(response);
      if(response.data != null){
        setSearchedEvents(response.data);
        return
      }
      // Filter searched events based on club_id
      // const filteredSearchedEvents = response.data.filter((event) => event.club_id === '5');
     
    } catch (error) {
      console.error('Error searching events by date:', error.message);
    }
  };
  
  return (
    <div>
      <h1 className="display-4">Schedule</h1>
        
        
      {Keyprop == 1 && (
        <div>
          <h2>Add Event</h2>
          <form>
            <div className='registration-container'>
            {/* Add input fields for each event property */}
            <label>
              Event Name:
              <input
                type="text"
                value={newEvent.event_name}
                onChange={(e) => setNewEvent({ ...newEvent, event_name: e.target.value })}
              />
            </label>
            <br />

            <label>
              Club ID:
              <input
                type="text"
                value={newEvent.club_id}
                onChange={(e) => setNewEvent({ ...newEvent, club_id: e.target.value })}
              />
            </label>
            <br />

            <label>
              Club Name:
              <input
                type="text"
                value={newEvent.club_name}
                onChange={(e) => setNewEvent({ ...newEvent, club_name: e.target.value })}
              />
            </label>
            <br />

            <label>
              Domain ID:
              <input
                type="text"
                value={newEvent.domain_id}
                onChange={(e) => setNewEvent({ ...newEvent, domain_id: e.target.value })}
              />
            </label>
            <br />

            <label>
              Domain Name:
              <input
                type="text"
                value={newEvent.domain_name}
                onChange={(e) => setNewEvent({ ...newEvent, domain_name: e.target.value })}
              />
            </label>
            <br />

            <label>
              Event Description:
              <input
                type="text"
                value={newEvent.event_description}
                onChange={(e) => setNewEvent({ ...newEvent, event_description: e.target.value })}
              />
            </label>
            <br />

            <label>
              Date:
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </label>
            <br />

            <label>
              Venue:
              <input
                type="text"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
              />
            </label>
            <br />

            
            <button type="button" onClick={handleAddEvent}>
              Add Event
            </button>
            </div>
          </form>
          <div style={{ textAlign: 'center' }}>
          <h2>All Events</h2>
          <ul>
            {events.map((event) => (
              
              <li key={event._id}>
                <table style={{ width: '60%' }} className='center'>
                <tr><th>{event.event_name}</th> </tr>
               <tr>{new Date(event.date).toLocaleDateString("en-GB")}</tr>
               <tr>{event.event_description}</tr>
              <tr>{event.venue}</tr>
                <button type="button" onClick={() => handleDeleteEvent(event.event_name)}>
                  Delete
                </button>
                </table>
              </li>

            ))}
          </ul>
              <hr></hr><br></br><br></br>
        </div></div>
      )}
      
      
      <h2>  Search Events</h2>
      <div className='registration-container'>
      
        <label>Search by date</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button type="button" onClick={handleSearchByDate}>
          Search
        </button>
      </div>
      <div className='container-fluid'>
      
        <ul>
          {searchedEvents.map((event) => (
            <li key={event._id}>
              <table className='table'>
              <tr><th>{event.event_name}</th> </tr>
              
               <tr>{new Date(event.date).toLocaleDateString("en-GB")}</tr>
               <tr>{event.event_description}</tr>
              <tr>{event.venue}</tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
            <br/><br/><hr></hr>
              <div>
   
        <div className=' container-lg'>       
        <h2>All Events</h2>
        
        <ul>
        <table className="table table-striped-columns">
              <thead>
            <tr>
              <th>Eventname</th>
              <th>Date</th>
              <th>Description</th>
              <th>Venue</th>
            </tr>
            </thead>
            <tbody>
          {events.map((event) => (
            
            <tr key={event._id}>
              
              <td>{event.event_name} </td>
              <td>{new Date(event.date).toLocaleDateString("en-GB")}</td> 
              <td>{event.event_description}</td>
              <td>{event.venue}</td>
              
             
              
            </tr>
            
          ))}
         </tbody>
            </table>
        </ul>
        </div> 
      </div>
    </div> 
      
  );
};

export default Schedule;
