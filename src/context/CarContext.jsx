import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError ] = useState(null)
  const { user } = useContext(AuthContext);


useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/cars/myCars", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) setVehicles(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchVehicles();
}, [user]);


const addVehicle = async (formData) => {
  setLoading(true);
  setError(null);

  let data = null;

  try {
    const res = await fetch("http://localhost:3000/api/v1/cars/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    data = await res.json();

    if (res.ok) {
      setVehicles((prev) => [...prev, data.vehicle]);
    } else {
      setError(data.message || "Error al añadir el vehículo");
    }

  } catch (err) {
    console.error(err);
    setError(err.message || "Error en la petición");
  } finally {
    setLoading(false);
  }
};

  return (
    <CarContext.Provider value={{ vehicles, loading, addVehicle, error, setError}}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);
