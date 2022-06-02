import * as React from "react";
import styled from "styled-components";
import { slideProps } from "../common/dataTypes";
const TitleSlide: React.FC<slideProps> = ({ slide }): JSX.Element => {
	const backpack = require("../img/backpack.PNG");
	const [windowDimension, detectHW] = React.useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	React.useEffect(() => {
		window.addEventListener("resize", detectSize);
		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimension]);
	return (
		<div>
			{windowDimension.winWidth >= 680 ? (
				<StyledTitle>
					<div className="image-container">
						<img src={backpack}></img>
					</div>

					<div className="title-container">
						<div className="title"> {slide.name}</div>
						<div className="sub-title">{slide.description}</div>
					</div>
					<div className="button-container">
						<button className="button-trips"> See more trips</button>

						<div className="text-trips">
							<span>
								<small>{slide.cards.length}</small> available trips
							</span>
						</div>
					</div>
				</StyledTitle>
			) : (
				<StyledTitleMobile>
					<div className="image-container">
						<img src={backpack}></img>
					</div>

					<div className="title-container">
						<div className="title"> {slide.name}</div>
						<div className="text-trips">
							{slide.cards.length} available trips
						</div>
					</div>
				</StyledTitleMobile>
			)}
		</div>
	);
};

export default TitleSlide;

const StyledTitle = styled.h1`
	font-size: 1rem;
	padding: 0 2rem 0 2rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-wrap: wrap;
	align-items: end;
	max-width: 1920px;
	box-sizing: border-box;

	.image-container {
		margin-bottom: auto;
		padding: 0 10px 0 0;
	}
	img {
		width: 50px;
	}

	.title-container {
		flex-grow: 0;
		max-width: 65%;
		flex-basis: 65%;
	}

	.title {
		font-family: "Playfair Display", serif;
		font-size: 2.875rem;
		color: rgb(0, 0, 0);
		font-weight: 400;
		font-style: italic;
		line-height: 1;
		margin-top: 0px;
		margin-bottom: 8px;
		text-align: left;
	}
	.sub-title {
		font-size: 1rem;
	}

	.button-container {
		flex-grow: 0;
		max-width: 25%;
		flex-basis: 25%;
		align-items: center;
		justify-content: center;
		margin-bottom: auto;
	}

	button {
		display: block;
		border-radius: 4px;
		border: 1px solid rgb(42, 42, 42);
		background-color: white;
		font-size: 1rem;
		color: #2a2a2a;
		width: 100%;
		max-width: 220px;
		height: 48px;
		text-align: center;
		padding: 12px 0;
		font-weight: normal;
		cursor: pointer;
	}

	.text-trips {
		width: 100%;
		max-width: 220px;
		text-align: center;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		font-size: 0.875rem;
		text-align: left;
	}

	.text-trips::before,
	.text-trips::after {
		content: "";
		border-top: 1px solid rgb(42, 42, 42);
		margin: 0px 10px 0px 0px;
		flex: 1 0 10px;
	}
	.text-trips::before {
		margin: 0px 10px 0px 0px;
	}
	.text-trips::after {
		margin: 0px 0px 0px 10px;
	}
`;
const StyledTitleMobile = styled.h1`
	font-size: 1rem;
	padding: 0 2rem 0 2rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;

	align-items: end;
	max-width: 680px;
	box-sizing: border-box;

	.image-container {
		margin-bottom: auto;
		padding: 0 10px 0 0;
		position: absolute;
	}
	@media only screen and (min-width: 00px) {
		.image-container {
			padding: 0;
			position: relative;
			top: 0px;
		}
		img {
			width: 60px;
		}
	}
	@media only screen and (min-width: 500px) {
		img {
			min-width: 70px;
		}
	}

	.title-container {
		margin-top: auto;
		margin-bottom: auto;
		min-width: 250px;

		margin-left: auto;
		margin-right: auto;
	}

	.title {
		font-family: "Playfair Display", serif;
		font-size: 2.875rem;
		color: rgb(0, 0, 0);
		font-weight: 400;
		font-style: italic;
		line-height: 1;
		margin-top: 0px;
		margin-bottom: 8px;
		text-align: center;
	}

	.text-trips {
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: 1.25rem;
	}
`;
