import React, { useEffect, useState } from "react";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const fetchImages = async () => {
		let url;
		url = `${mainUrl}${clientID}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos(data);
			setLoading(false);
			console.log(data);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};
	useEffect(() => {
		fetchImages();
	}, []);

	return <h2>stock photos starter</h2>;
}

export default App;
