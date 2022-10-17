import "./newLab.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { labsInputs } from "../../formSource";
import axios from "axios";

const NewLab = () => {
	const [file, setFile] = useState("");
	const [info, setInfo] = useState({});

	const handleChange = (e) => {
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");
		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/dyzekm6m8/image/upload",
				data
			);
			console.log(uploadRes.data);

			const { url } = uploadRes.data;

			const newLab = {
				...info,
				images: url
			};
			await axios.post("/labs", newLab);
		} catch (err) {
			console.log(err);
		}
	};

	console.log(info)
	return (
		<div className="new">
			<Sidebar />
			<div className="newContainer">
				<Navbar />
				<div className="top">
					<h1>Add new laboratory</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
							}
							alt=""
						/>
					</div>
					<div className="right">
						<form>
							<div className="formInput">
								<label htmlFor="file">
									Image: <DriveFolderUploadOutlinedIcon className="icon" />
								</label>
								<input
									type="file"
									id="file"
									onChange={(e) => setFile(e.target.files)}
									style={{ display: "none" }}
								/>
							</div>

							{labsInputs.map((input) => (
								<div className="formInput" key={input.id}>
									<label>{input.label}</label>
									<input
										id={input.id}
										onChange={handleChange}
										type={input.type}
										placeholder={input.placeholder}
									/>
								</div>
							))}
							<button onClick={handleClick}>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewLab;
