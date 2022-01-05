import React from "react";

//export const API = process.env.NODE_ENV === "production" ? "https://movie-mern.herokuapp.com/api/movies/"
//	: "http://localhost:5000/api/movies/";
 

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
);

export const APIACTION =  'http://localhost:4000/useractions/create';

export const Action = props => (
	<tr>
		<td>{props.action.page}</td>
		<td>{props.movie.user}</td>
		<td>{props.movie.action}</td>
		<td>{props.movie.value}</td>	
	</tr>
);