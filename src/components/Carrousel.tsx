import * as React from "react";
import Card from "./Card";
import styled from "styled-components";
import { slideProps } from "../common/dataTypes";
//import useElemOnScreen from "../hooks/useElemOnScreen";

import TitleSlide from "./TitleSlide";
import { ReactComponent as Arrow } from "../img/right-arrow.svg";

const Carrousel: React.FC<slideProps> = ({ slide }): JSX.Element => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [showArrowLeft, setShowArrowLeft] = React.useState(false);
	const [showArrowRight, setShowArrowRight] = React.useState(true);
	const [windowDimension, detectHW] = React.useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const [viewPC, setviewPC] = React.useState(true);
	const backpack = require("../img/backpack.PNG");
	const step = 345;

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	React.useEffect(() => {
		window.addEventListener("resize", detectSize);
		const cardsShowing = Math.trunc(windowDimension.winWidth / step);

		if (slide.cards.length <= cardsShowing) {
			setShowArrowRight(false);
			setShowArrowLeft(false);
		} else {
			if (activeIndex > 1) setShowArrowLeft(true);
			if ((activeIndex + step) / 300 <= slide.cards.length - cardsShowing)
				setShowArrowRight(true);
		}
		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimension]);

	const settings = {
		class: "carousel-content",
		centerMode: true,
		infinite: false,

		slidesToShow: 3,
		initialSlide: 1,
		speed: 500,

		pauseOnFocus: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 350,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
		],
		// pauseOnFocus: true,
		// responsive: true,
		// variableWidth: true,
	};

	const swipeRight = () => {
		const cardsShowing = Math.trunc(windowDimension.winWidth / step);
		console.log(activeIndex, slide.cards.length, cardsShowing);
		if ((activeIndex + step) / 300 > slide.cards.length - cardsShowing) {
			setShowArrowRight(false);
		}
		setActiveIndex(activeIndex + step);
		setShowArrowLeft(true);
	};

	const swipeLeft = () => {
		setShowArrowRight(true);
		if (activeIndex - step >= 0) {
			setActiveIndex(activeIndex - step);

			if (activeIndex - step === 0) setShowArrowLeft(false);
		} else {
			setShowArrowLeft(false);
		}
	};

	return (
		<div>
			<TitleSlide slide={slide} />

			<StyledCardCarrussel>
				{showArrowLeft && (
					<StyledArrowLeft onClick={swipeLeft}>
						<div className="round-container">
							<div className="arrow-container">
								<Arrow className="arrow-icon" />
							</div>
						</div>
					</StyledArrowLeft>
				)}

				<div
					className="carrussel-track"
					style={{ transform: `translateX(-${activeIndex}px)` }}
				>
					{slide.cards.map((c, index) => (
						<Card card={c} key={c.id} />
					))}
				</div>

				{showArrowRight && (
					<StyledArrow>
						<div className="round-container" onClick={swipeRight}>
							<div className="arrow-container">
								<Arrow className="arrow-icon-right" />
							</div>
						</div>
					</StyledArrow>
				)}
			</StyledCardCarrussel>
		</div>
	);
};

export default Carrousel;

const StyledCardCarrussel = styled.div`
	background: white;
	position: relative;
	display: block;
	overflow: hidden;
	align-self: center;

	.carrussel-track {
		display: flex;
		column-gap: 2.5rem;
		padding: 2rem;
		width: 3390px;
		margin-left: auto;
		margin-right: auto;
		transition: transform 0.5s ease;
	}
`;

const StyledArrow = styled.div`
	right: -15px;
	opacity: 1;
	position: absolute;
	z-index: 10;
	top: 30%;
	overflow: hidden;
	width: 56px;
	padding: 6px;
	cursor: pointer;
	.round-container {
		background: rgb(255, 255, 255);
		height: 25px;
		width: 25px;
		border-radius: 50%;
		padding: 32px 44px 28px 22px;
	}
	.arrow-container {
	}

	.arrow-icon-left {
		transform: rotateZ(90deg);
	}
`;

const StyledArrowLeft = styled.div`
	left: -5px;
	opacity: 1;
	position: absolute;
	z-index: 10;
	top: 30%;
	overflow: hidden;
	width: 56px;
	padding: 6px;
	transform: rotateZ(180deg);
	cursor: pointer;
	.round-container {
		background: rgb(255, 255, 255);
		height: 25px;
		width: 25px;
		border-radius: 50%;
		padding: 32px 44px 28px 22px;
	}
`;
