import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState("");

	const fetchImages = async () => {
		let url;

		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;

		if (query) {
			url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
		} else {
			url = `${mainUrl}${clientID}${urlPage}`;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setPhotos((oldPhotos) => {
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhotos, ...data.results];
				} else {
					return [...oldPhotos, ...data];
				}
			});
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};
	useEffect(() => {
		fetchImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);
	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!loading &&
				window.scrollY + window.innerHeight >= document.body.scrollHeight
			) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});
		return () => window.removeEventListener("scroll", event);
	}, [loading]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
	};

	return (
		<main>
			<section className="search">
				<form className="search-form" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search"
						className="form-input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" className="submit-btn">
						<FaSearch />
					</button>
				</form>
			</section>
			<section className="photos">
				<div className="photos-center">
					{photos.map((img, index) => (
						<Photo key={index} {...img} />
					))}
				</div>
				{loading && <h2 className="loading">Loading...</h2>}
			</section>
		</main>
	);
}

export default App;
