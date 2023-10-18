import { useState } from 'react';
import Calendar from 'react-calendar';


function Calender() {
  const [value, onChange] = useState>(Date());

  return (
    <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    }}>
      <Calendar style={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
      }} onChange={onChange} value={value} />
    </div>
  );
}

export default Calendar