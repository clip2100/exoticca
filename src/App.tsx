import * as React from "react";
import axios from "axios";
import styled from "styled-components";

import Carrousel from "./components/Carrousel";
import DragableCarrousel from "./components/DragableCarrusel";
import RealDragableCarrousel from "./components/RealDragableCarrousel";
import mockCa from "./mock/mock-data-ca.json";
import mockEs from "./mock/mock-data-es.json";
import mockUK from "./mock/mock-data-uk.json";
import mockFr from "./mock/mock-data-fr.json";
import mockMx from "./mock/mock-data-mx.json";
import mockDe from "./mock/mock-data-de.json";

import { HeroType, TopSalesType, SlideType } from "./common/dataTypes";

export default function App() {
	const [marketValue, setMarketValue] = React.useState("ca");

	const [hero, setHero] = React.useState<HeroType>({ image: [], title: "" });
	const [slides, setSlides] = React.useState<SlideType[]>([]);
	const [topSales, setTopSales] = React.useState<TopSalesType>({
		type: "",
		title: "",
		icon: "",
		background: "",
		cards: [],
	});

	React.useEffect(() => {
		loadDataMock();
		//loadDataAPI();
	}, [slides]);

	const handleChange = (e: any) => {
		setMarketValue(e.target.value);
	};

	//API from Exoticca (doesn't work, blocked by CORS policy)
	const loadDataAPI = async () => {
		//Free API for online testing (this one works!)
		const api = "https://jsonplaceholder.typicode.com/posts";

		//API from Exoticca (doesn't work, blocked by CORS policy)
		const api2 = "https://api-mx.exoticca.com/api/home";

		try {
			/*Trying to fetch normally doesn't work */
			const newData = await axios.get(api2, {
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			console.log(newData);

			/*Trying to fetch with no-cors config, the response is 'opaque'*/
			const newDataNoCors = await fetch(api2, {
				method: "HEAD",
				mode: "no-cors",
			});
			console.log(newDataNoCors);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log("error message: ", error.message);
				//	return error.message;
			} else {
				console.log("unexpected error: ", error);
				//	return "An unexpected error occurred";
			}
		}
	};

	const loadDataMock = () => {
		let newData = mockCa;
		switch (marketValue) {
			case "uk":
				newData = mockUK;
				break;
			case "ca":
				newData = mockCa;
				break;
			case "es":
				newData = mockEs;
				break;
			case "fr":
				newData = mockFr;
				break;
			case "de":
				newData = mockDe;
				break;
			case "mx":
				newData = mockMx;
				break;

			default:
				newData = mockCa;
				break;
		}

		setSlides(newData.slides);
		//setHero(newData.hero);
		//setTopSales(newData.topSales);
	};

	return (
		<div>
			<Body>
				<StyledMarkets>
					<label htmlFor="market">Markets</label>

					<select name="market" id="market" onChange={(e) => handleChange(e)}>
						<option value="ca">Canada</option>
						<option value="uk">United Kingdom</option>
						<option value="fr">France</option>
						<option value="es">Spain</option>
						<option value="de">Germany</option>
						<option value="mx">Mexico</option>
					</select>
					<button onClick={loadDataMock}> Select </button>
				</StyledMarkets>
				<hr className="solid" />

				{/* {slides &&
				slides.length > 0 &&
				slides.map((slide) => (
					<Carrousel slide={slide} key={slide.description} />
				))} */}

				{slides && slides.length > 0 && (
					<DisplayForPC>
						<Carrousel slide={slides[0]} key={slides[0].description} />
					</DisplayForPC>
				)}

				{slides && slides.length > 0 && (
					<DisplayForTablet>
						{/* <DragableCarrousel slide={slides[0]} key={slides[0].description} /> */}
						<RealDragableCarrousel
							slide={slides[0]}
							key={slides[0].description}
						/>
					</DisplayForTablet>
				)}
			</Body>
		</div>
	);
}

const Body = styled.div`
	color: rgb(0, 0, 0);
	font-size: 1rem;
	line-height: 1.5rem;
	margin: 0;
	font-family: "Red Hat Text", sans-serif;
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	min-width: 360px;
	a {
		text-decoration: none;
		color: rgb(0, 0, 0);
	}
`;

const StyledMarkets = styled.div`
	width: 500px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: baseline;
	column-gap: 0.5rem;

	label {
		font-family: "Playfair Display", serif;
		font-size: 1.5rem;
		color: rgb(0, 0, 0);
		font-weight: 400;
		font-style: italic;
		line-height: 1;
		margin: 0 10px 0 0;
		text-align: left;
		align-self: center;
	}

	select {
		border-radius: 4px;

		background-color: white;
		height: 35px;
		font-weight: normal;
		width: 160px;
		text-align: center;
		align-self: flex-end;
	}

	button {
		border-radius: 4px;
		border: 1px solid rgb(42, 42, 42);
		background-color: white;
		font-size: 1rem;
		color: #2a2a2a;

		width: 100px;
		height: 35px;
		text-align: center;
		align-self: flex-end;
		font-weight: normal;
		cursor: pointer;
	}
`;
const DisplayForPC = styled.div`
	display: none;
	@media only screen and (min-width: 1024px) {
		display: block;
	}
`;
const DisplayForTablet = styled.div`
	display: block;
	@media only screen and (min-width: 1024px) {
		display: none;
	}
`;
