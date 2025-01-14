import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import NavBar from "../../components/navbar/Nabvar.jsx";
import Reserve from "../../components/reserve/Reserve.jsx";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFecth";
import "./Resource.css";

const Resource = (startDate) => {
	const photos = [
		{
			src: "https://logosmarcas.net/wp-content/uploads/2020/12/MATLAB-Logo.png",
		},
	];

	

	const location = useLocation();
	const locationString = location.pathname.toString();
	const locationSplit = locationString.split("/");
	const cat = "/" + locationSplit[2];
	const id = locationSplit[3];
	const { categoria } = useContext(SearchContext);
	const fetch = location.state;
	console.log("fetch");
	console.log(location);

	// api url
	const find = cat.concat("/find/");
	const newUrl = find.concat(id).toString();


	const { data, loading, error } = useFetch(newUrl);
	console.log("data");
	console.log(data);

	// User verification
	const { email } = useContext(AuthContext)
	const navigate = useNavigate()
	const [openModal, setOpenModal] = useState(false)

	const handleClick = () => {
		if(email){
			setOpenModal(true)
		}else{
			navigate("/login")
		}
	}
	
	//Fecha
	console.log("startDate de recurso");
	console.log(location.state);

	return (
		<div>
			<NavBar />
			<Header type="list" />
			<div className="resourceContainer">
				{categoria === "labs" && (
					<div className="resourceWrapper">
						<h1 className="rosourceTitle">{data.type}</h1>
						<div className="resourceImages">
							{photos.map((photo) => (
								<div className="resourceImgWrapper">
									<img src={data.imagesv2} alt="foto" className="resourceImg" />
								</div>
							))}
						</div>

						<div className="resourceDetail">
							<div className="resourceDetailText">
								<h1 className="resourceTitle">{data.name}</h1>
								<p className="resourceDesc">{data.description}</p>
							</div>
							<div className="resourceDetailPrice">
								<h1>¿Quieres reservar este espacio?</h1>
								<span>Se localiza en Aulas</span>
								<h2>{data.location}</h2>
								<button onClick={handleClick}>¡Agenda ahora!</button>
							</div>
						</div>
					</div>
				)}

				{categoria === "software" && (
					<div className="resourceWrapper">
						<h1 className="rosourceTitle">Software</h1>
						<div className="resourceImages">
							{photos.map((photo) => (
								<div className="resourceImgWrapper">
									<img src={data.imagesv2} alt="foto" className="resourceImg" />
								</div>
							))}
						</div>

						<div className="resourceDetail">
							<div className="resourceDetailText">
								<h1 className="resourceTitle">{data.name}</h1>
								<p className="resourceDesc">{data.description}</p>
							</div>
							<div className="resourceDetailPrice">
								<h1>¿Quieres obtener este programa?</h1>
								<span>Puedes usarlo hasta:</span>
								<h2>{data.expireDate} días</h2>
								<button onClick={handleClick}>¡Agenda ahora!</button>
							</div>
						</div>
					</div>
				)}

				{categoria === "devices" && (
					<div className="resourceWrapper">
						<h1 className="rosourceTitle">Equipos de cómputo</h1>
						<div className="resourceImages">
							{photos.map((photo) => (
								<div className="resourceImgWrapper">
									<img src={data.imagesv2} alt="foto" className="resourceImg" />
								</div>
							))}
						</div>

						<div className="resourceDetail">
							<div className="resourceDetailText">
								<h1 className="resourceTitle">{data.name}</h1>
								<h3 className="resourceTitle">{data.brand}</h3>
								<h4 className="resourceTitle">Modelo {data.model}</h4>
								{callFun(data)}

								<p className="resourceDesc">{data.description}</p>
							</div>
							<div className="resourceDetailPrice">
								<h1>Puedes encontrar el equipo en el salón:</h1>
								<h2>{data.location}</h2>
								<button onClick={handleClick}>¡Agenda ahora!</button>
							</div>
						</div>
					</div>
				)}

				{categoria === "license" && (
					<div className="resourceWrapper">
						<h1 className="rosourceTitle">Licencias</h1>
						<div className="resourceImages">
							{photos.map((photo) => (
								<div className="resourceImgWrapper">
									<img src={data.imagesv2} alt="foto" className="resourceImg" />
								</div>
							))}
						</div>

						<div className="resourceDetail">
							<div className="resourceDetailText">
								<h1 className="resourceTitle">{data.name}</h1>
								<h4 className="resourceTitle">Version {data.version}</h4>
								<p className="resourceDesc">{data.description}</p>
							</div>
							<div className="resourceDetailPrice">
								<h1>¿Quieres obtener este programa?</h1>
								<span>Puedes usarlo hasta:</span>
								<h2>{data.expireDate} días</h2>
								<button onClick={handleClick}>¡Agenda ahora!</button>
							</div>
						</div>
					</div>
				)}
				{data.length === 0 || !data && (
					<div className="resourceWrapper">
						<h1 className="rosourceTitle">Lo sentimos, no encontramos lo que estás buscando</h1>
					</div>
				)}

				{openModal && <Reserve setOpen={setOpenModal} resourceId={id} data={data} categoria={categoria} />}

			
			</div>
		</div>
	);
};

export default Resource;

function callFun(data) {
	if (data.portable === true)
		return <h4 className="resourceTitle">Portatil</h4>;
	return <h4 className="resourceTitle">No es portátil</h4>;
}
