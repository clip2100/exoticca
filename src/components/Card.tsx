import * as React from "react";
import styled from "styled-components";

import { cardProps } from "./../common/dataTypes";
/* 
interface imagesProps {
	desktop: string;
	tablet: string;
	mobile: string;
}

interface priceDetailProps {
	fromPrice: number;
	fromPriceBeautify: string;
	discountSaved: number;
	oldPriceBeautify: string;
	pricingPercentage: number;
	pricePerNight: string;
}

type DataType = {
	id: number;
	title: string;
	destination: string;
	images: imagesProps[];
	days: number;
	url: string;
	map: any;
	highlights: any;
	includes: any;
	priceDetail: priceDetailProps;
	tags: any;
	crafterDetail: any;
	hasPrivateTour: boolean;
	hasSoloTraveller: boolean;
	headLine: any;
	tagHeadLine: any[];
	isLandOnly: boolean;
	isValid: boolean;
	extraNights: number;
};

interface dataProps {
	data: DataType;
}
 */
const Card: React.FC<cardProps> = ({ card }): JSX.Element => {
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
		<StyledCard>
			<a /* href={card.url} */>
				<div>
					<StyledDiscount>
						-{card.priceDetail.pricingPercentage}%
					</StyledDiscount>

					<StyledImageContainer>
						<StyledImage
							className="card-img-top"
							src={
								windowDimension.winWidth >= 1024
									? card.images[0].desktop
									: windowDimension.winWidth >= 680
									? card.images[0].tablet
									: card.images[0].mobile
							}
							alt={card.destination}
						/>
						<div className="image-text">
							<div className="image-title">{card.destination}</div>
							<div className="image-subtitle">{card.days} Days</div>
						</div>
					</StyledImageContainer>
					<StyledDetailsContainer>
						<div className="details">{card.title}</div>
						<div className="prince-container">
							<div className="text-from">From:</div>
							<div className="text-old-price">
								{card.priceDetail.oldPriceBeautify}
							</div>
							<div className="text-final-price">
								{card.priceDetail.fromPriceBeautify}
							</div>
						</div>
					</StyledDetailsContainer>
				</div>
			</a>
		</StyledCard>
	);
};
export default Card;

const StyledCard = styled.div`
	text-align: center;
	border-radius: 7px;
	outline: none;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	background: white;
	float: left;
	width: 300px;

	box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
		0px 2px 1px -1px rgb(0 0 0 / 12%);
`;

const StyledDiscount = styled.div`
	position: absolute;
	left: 8px;
	top: 8px;
	padding: 8px;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	font-weight: bold;
	font-size: 1rem;
	line-height: 24px;
	color: rgb(232, 203, 145);
	z-index: 1;
	background: rgb(42, 42, 42);
	border-radius: 4px;
	z-index: 10;
`;

const StyledImageContainer = styled.div`
	position: relative;
	background: black;
	font-size: 1.5rem;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 400;
	line-height: 1.33;
	letter-spacing: 0em;
	height: 275px;

	.image-text {
		position: absolute;
		bottom: 0px;
		left: 0px;
		padding: 16px;
		width: 100%;
		color: white;
		z-index: 5;
		text-align: initial;
		box-sizing: border-box;
	}
	.image-title {
		font-weight: bold;
		font-size: 1.5rem;
	}
	.image-subtitle {
		font-size: 1rem;
		font-weight: 500;
		font-style: normal;
	}
`;

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 1;
	display: block;

	mask-image: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 1) 65%,
		rgba(0, 0, 0, 0)
	);
`;

const StyledDetailsContainer = styled.div`
	padding: 16px;
	color: black;
	background-color: white;
	text-align: initial;
	.details {
		font-size: 1rem;
		min-height: 44px;
		margin-bottom: 10px;
		line-height: 1.3;
	}

	.prince-container {
		display: flex;
		column-gap: 4px;
		width: 100%;
		-webkit-box-align: baseline;
		align-items: baseline;
		.text-from {
			font-size: 0.875rem;
		}
		.text-old-price {
			text-decoration: line-through;
			font-size: 1rem;
			font-weight: bold;
			line-height: 1.17;
		}
		.text-final-price {
			font-size: 1.5rem;
			font-weight: bold;
			line-height: 1.17;
		}
	}
`;
