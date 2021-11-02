import React from "react";

//export const API = process.env.NODE_ENV === "production" ? "https://movie-mern.herokuapp.com/api/movies/"
//	: "http://localhost:5000/api/movies/";


function toBase64(arr) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(
	   arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
 }
 
 

export const API =  "http://localhost:5000/api/movies/";


export const Movie = props => (
	<tr>
		<td>{props.movie.titleId}</td>
		<td>{props.movie.name}</td>
		<td>{props.movie.reviews_num}</td>
		<td>{props.movie.signature}</td>
		<td>{props.movie.signature_per}</td>
		<td>{props.movie.signature_percentile}</td>
		<td>{props.movie.signature_zscore}</td>
		<td>{props.movie.tsne_glyph}</td>
		<td>{props.movie.plot}</td>
		<td>{props.movie.movie_rating}</td>
		<td>{props.movie.movie_directors}</td>
		<td>{props.movie.movie_writers}</td>
		<td>{props.movie.movie_stars}</td>
		<td>{props.movie.movie_genres}</td>
		<td>{props.movie.release_year}</td>
		<td>{props.movie.poster}</td>
	</tr>
/*
	<tr>
		<td>{props.movie.rssa_id}</td>
		<td>{props.movie.movie_id}</td>
		<td>{props.movie.imdb_id}</td>
		<td>{props.movie.title}</td>
		<td>{props.movie.year}</td>
		<td>{props.movie.runtime}</td>
		<td>{props.movie.genre}</td>
		<td>{props.movie.aveRating}</td>
		<td>{props.movie.director}</td>
		<td>{props.movie.writer}</td>
		<td>{props.movie.description}</td>
		<td>{props.movie.cast}</td>
		<td>
			<img src={props.movie.poster} alt={props.movie.title} width="100"/>
		</td>
	</tr>
	*/
);