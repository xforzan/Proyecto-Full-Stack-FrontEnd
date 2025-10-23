import "./Vehicle.css";
import { useCars } from "../../context/CarContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Vehicle = () => {
  const { _id } = useParams();
  const { vehicles } = useCars();
  const [car, setCar] = useState(null);
  const [carNotFound, setCarNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vehicles || vehicles.length === 0) return
    const vehicle = vehicles.find((v) => v._id === _id);
    if (vehicle) {
      setCar(vehicle);
    } else {
      setCarNotFound(true);
    }
    setLoading(false);
  }, [vehicles, _id]);

  if (loading) return <Loading />;
  if (carNotFound) return <main className="mainVehicle"><p style={{margin:"auto"}}>Coche no encontrado</p></main>;

  const specs = car.specs;

  return (
    <main className="mainVehicle">
      <h2>{specs?.longType || "N/A"}</h2>

      <section className="vehicleContainer">
        <img className="vehicleImage" src={car.images?.[2]} alt="Car-Image" />

        <section className="vehicleSpecifications">

          <section className="vehicleSection">
            <h3>Detalles del vehículo</h3>
            <div className="detailsWrapper">
              <p className="dataItem"><span className="label">Marca:</span> {specs?.marca || "N/A"}</p>
              <p className="dataItem"><span className="label">Modelo:</span> {specs?.modelo || "N/A"}</p>
              <p className="dataItem"><span className="label">Versión:</span> {specs?.version || "N/A"}</p>
              <p className="dataItem"><span className="label">Carrocería:</span> {specs?.carroceria || "N/A"}</p>
            </div>
          </section>

          <section className="vehicleSection">
            <h3>Motor y Transmisión</h3>
            <div className="detailsWrapper">
              <p className="dataItem"><span className="label">Motor:</span> {specs?.motor || "N/A"}</p>
              <p className="dataItem"><span className="label">Combustible:</span> {specs?.combustible || "N/A"}</p>
              <p className="dataItem"><span className="label">Cambio:</span> {specs?.cambio || "N/A"}</p>
              <p className="dataItem"><span className="label">Cilindros:</span> {specs?.cilindros || "N/A"}</p>
              <p className="dataItem"><span className="label">Tracción:</span> {specs?.traccion || "N/A"}</p>
            </div>
          </section>

          <section className="vehicleSection">
            <h3>Rendimiento</h3>
            <div className="detailsWrapper">
              <p className="dataItem"><span className="label">Potencia:</span> {specs?.potenciaKW} kW / {specs?.potenciaCV} CV</p>
              <p className="dataItem"><span className="label">Par máximo:</span> {specs?.parNm} Nm</p>
              <p className="dataItem"><span className="label">Aceleración:</span> {specs?.aceleracion} s</p>
              <p className="dataItem"><span className="label">Velocidad máxima:</span> {specs?.velocidadMax} Km/h</p>
            </div>
          </section>

          <section className="vehicleSection">
            <h3>Neumáticos</h3>
            <div className="detailsWrapper">
              <p className="dataItem"><span className="label">Delantero:</span> {specs?.neumaticoDelantero}</p>
              <p className="dataItem"><span className="label">Trasero:</span> {specs?.neumaticoTrasero}</p>
            </div>
          </section>

          <section className="vehicleSection" id="emissionsSection">
            <h4>Emisiones de CO₂ g/km</h4>
            <div className="listGroupContainer">
              <ol className="listGroup">
                <li>Hasta 120</li>
                <li>120 - 140</li>
                <li>140 - 155</li>
                <li>155 - 165</li>
                <li>165 - 190</li>
                <li>190 - 225</li>
                <li>225 +</li>
              </ol>
              <div className={`indicator indicator-${specs?.claseEmisiones}`}>
                <span>Las emisiones de CO₂ del vehículo</span>
                <span className="emissions">
                  <strong className="emissionValue">{specs?.emisionesCO2} g/km</strong>
                  <span className="emissionClass"> Clase <strong className="emissionClassValue" style={{ backgroundColor: specs?.colorEmisiones }} > {specs?.claseEmisiones} </strong> </span>
                </span>
              </div>
            </div>
          </section>

        </section>
      </section>
    </main>
  );
};

export default Vehicle;
