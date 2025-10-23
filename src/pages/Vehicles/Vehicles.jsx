import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCars } from "../../context/CarContext"; 
import Loading from "../../components/Loading/Loading";
import "./Vehicles.css";

const Vehicles = () => {
  const navigate = useNavigate();
  const { vehicles, addVehicle, loading, error, setError } = useCars();
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error, setError]);

  const onSubmit = async (formData) => {
    await addVehicle(formData);
    reset();
    setShowModal(false);
  };

  const handleOpenModal = () => {
    reset();
    setShowModal(true);
  };

  if (loading) return <Loading />;

  return (
    <main className="vehicles-container">
      <h2>Mis Vehículos</h2>

      {vehicles.length === 0 ? (
        <>
          <p className="no-vehicles">No tienes vehículos. Añade alguno:</p>
          <button className="add-vehicle-btn" onClick={handleOpenModal}> Añadir vehículo </button>
        </>
      ) : (
        <>
          <section className="vehicles-list">
            {vehicles.map((v, index) => (
              <article key={index} className="vehicle-card-horizontal">
                <img src={ v.images && v.images[1] ? v.images[1] : "https://res.cloudinary.com/dileah1ig/image/upload/v1761238627/L_g8cri0.png"}
                  alt={`Vehículo ${v.vin}`}
                  className="vehicle-image-horizontal"
                />

                <section className="vehicle-info-horizontal">
                  <p className="carName">{v.specs.longType || "N/A"}</p>
                  <p className="carVin">{v.vin}</p>
                  <div className="carButtons">
                    <button onClick={() => navigate(`/schedule/${v._id}`)} className="tallerBtn"> Taller </button>
                    <button onClick={() => navigate(`/vehicle/${v._id}`)} className="verMasBtn"> Ver más</button>
                  </div>
                </section>

              </article>
            ))}
          </section>

          <button className="add-vehicle-btn" onClick={handleOpenModal}> Añadir otro vehículo </button>
        </>
      )}


      {showModal && (
        <aside className="modal-overlay" onClick={() => setShowModal(false)}>
          <section className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Añadir vehículo</h3>

            <form className="vehicle-form" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="VIN" {...register("vin", { required: "El VIN es obligatorio" })}/>
              {errors.vin && <span className="error">{errors.vin.message}</span>}

              <input type="number" placeholder="Kilometraje (km)" {...register("km", { required: "El kilometraje es obligatorio", min: 0,} )} />
              {errors.km && <span className="error">{errors.km.message}</span>}

              <div className="modal-buttons">
                <button type="submit">Guardar vehículo</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}> Cancelar </button>
              </div>
            </form>

          </section>
        </aside>
      )}
    </main>
  );
};

export default Vehicles;
