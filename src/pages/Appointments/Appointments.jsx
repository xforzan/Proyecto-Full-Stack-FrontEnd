import './Appointments.css';
import { useAppointments } from "../../context/AppointmentContext";
import { useCars } from '../../context/CarContext';
import Loading from "../../components/Loading/Loading";
import { useEffect } from 'react';

const Appointments = () => {
  const { appointments, loading, cancelAppointment, fetchAppointments } = useAppointments();
  const { vehicles } = useCars();

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Loading />;

  if (!appointments || appointments.length === 0) {
    return <main className="appointments-container"><p className="no-appointments">No tienes citas programadas.</p></main>;
  }

  return (
    <main className="appointments-container">
      <h2>Mis Citas</h2>

      <section className="appointments-list">
        {appointments.map((appt, index) => {
          const privateProps = appt.extendedProperties?.private || {};
          const car = vehicles.find(v => v.vin === privateProps.vin);
          const carImg = car?.images?.[0] || "https://res.cloudinary.com/dileah1ig/image/upload/v1761238627/L_g8cri0.png";
          const date = appt.start?.dateTime ? new Date(appt.start.dateTime) : null;

          return (
            <article key={appt.id || index} className="appointment-card-horizontal">
              <img src={carImg} alt={privateProps.marcaModelo || "Imagen del vehículo"} className="appointment-car-image-horizontal"/>
              <section className="appointment-info-horizontal">
                <section className="appointment-data">
                  <h2 className="appointment-vehicle">{car?.specs?.longType || "Desconocido"}</h2>
                  <p className="appointment-vin">{privateProps.vin || "Desconocido"}</p>
                  <span className={`appointment-status ${privateProps.status?.toLowerCase() || "pendiente"}`}>
                    {privateProps.status || "Pendiente"}
                  </span>

                  {date ? (
                    <>
                      <p className="appointment-time">
                        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="appointment-date">
                        {date.toLocaleDateString(undefined, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="appointment-time">Fecha no disponible</p>
                  )}
                </section>

                <div className="appointment-buttons">
                  <button onClick={() => cancelAppointment(appt.id)} className="verMasBtn2"> Cancelar cita </button>
                </div>
              </section>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default Appointments;
