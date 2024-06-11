import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParticipantsPage = ({ tourId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, [tourId]);

  const fetchParticipants = async () => {
    const response = await axios.get(`/api/tours/${tourId}/participants`);
    setParticipants(response.data);
  };

  const handleConfirm = async (id) => {
    await axios.put(`/api/participants/${id}/confirm`);
    fetchParticipants();
  };

  return (
    <div>
      <h2>Participants</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant.id}>
            {participant.user_id} - {participant.is_confirmed ? 'Confirmed' : 'Pending'}
            {!participant.is_confirmed && <button onClick={() => handleConfirm(participant.id)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsPage;
