import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate  = useNavigate()
  return (
    <main className='mainHome'>
    <div className='imgContainer'>
      <h2>Pide cita en <br/>tu taller de confianza</h2>
    </div>
      <div className='scheduleAppointment'>

        <h3>Pide tu cita ya mismo</h3>
        <button onClick={()=> navigate("/vehicles")}>Pedir cita</button>

    </div>

    </main>
  );
};

export default Home 
