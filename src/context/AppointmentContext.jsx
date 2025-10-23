import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!user) return;
    if (appointments.length === 0) setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/v1/appointment/user", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) console.error("Error en la respuesta del servidor");

      const data = await res.json();
      const serverAppointments = data.message || [];

      setAppointments((prev) => {
        const newAppointments = serverAppointments.filter((a) => !prev.some((p) => p.id === a.id));
        const updatedAppointments = prev.filter((p) => serverAppointments.some((a) => a.id === p.id));
        return [...updatedAppointments, ...newAppointments];
      });
    } catch (err) {
      console.error("Error al cargar citas:", err);
      setError("No se pudieron cargar las citas");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };


  const createAppointment = async ({ vehicleId, fecha, hora }) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ vehicleId, fecha, hora }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear la cita");

      setAppointments((prev) => [...prev, data]);

      return { success: true, data };
    } catch (err) {
      console.error("Error al crear cita:", err);
      return { success: false, message: err.message };
    }
  };


  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/appointment/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 200) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
      } else {
        console.error("No se pudo eliminar la cita:", res.status);
      }
    } catch (err) {
      console.error("Error al cancelar cita:", err);
    }
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  return (
    <AppointmentContext.Provider
      value={{ appointments, loading, error, fetchAppointments, cancelAppointment,createAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
