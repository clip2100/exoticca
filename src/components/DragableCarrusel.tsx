import * as React from "react";
import Card from "./Card";
import styled from "styled-components";
import { slideProps } from "../common/dataTypes";
//import useElemOnScreen from "../hooks/useElemOnScreen";

import TitleSlide from "./TitleSlide";
import { ReactComponent as Arrow } from "../img/right-arrow.svg";

const DragableCarrousel: React.FC<slideProps> = ({ slide }): JSX.Element => {
	const backpack = require("../img/backpack.PNG");
	const [isDown, setIsDown] = React.useState(false);

	const [xPos, setXPos] = React.useState(0);
	const [xPosPrev, setxPosPrev] = React.useState(0);
	const [xDrag, setxDrag] = React.useState(0);
	const [xFinal, setxFinal] = React.useState(0);
	const [cardsShowing, setCardsShowing] = React.useState(0);

	const [windowDimension, detectHW] = React.useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});
	const step = 345;

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	React.useEffect(() => {
		window.addEventListener("resize", detectSize);
		setCardsShowing(Math.trunc(windowDimension.winWidth / 320));

		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimension]);

	const handleTouchDown = (e: any) => {
		let x = Math.trunc(e.touches[0].clientX);
		setXPos(x);
		setxDrag(xPosPrev);
		setIsDown(true);
	};

	const handleTouchMove = (e: any) => {
		let x = Math.trunc(e.touches[0].clientX);
		let increment = x - xPos;
		setxDrag(increment);
		setxFinal(increment + xPosPrev);
	};
	const handleTouchEnd = (e: any) => {
		setxPosPrev(xDrag + xPosPrev);
		if (xFinal > 10) {
			setxFinal(0);
			setxPosPrev(0);
		}
		const maxRight = -1 * step * (slide.cards.length - cardsShowing);
		if (xFinal < maxRight) {
			setxFinal(maxRight);
			setxPosPrev(maxRight);
		}
	};

	const handleMove = (e: any) => {
		if (isDown) {
			const increment = e.pageX - xPos;
			console.log(increment);
			//setDragOnX(increment);
		}
	};

	/* 	const [activeIndex, setActiveIndex] = React.useState(0);
	const [showArrowLeft, setShowArrowLeft] = React.useState(false);
	const [showArrowRight, setShowArrowRight] = React.useState(true);



	const [viewPC, setviewPC] = React.useState(true);


	const swipeRight = () => {
		setActiveIndex(activeIndex + 10);
		console.log(activeIndex);
		setShowArrowLeft(true);
	};

	const swipeLeft = () => {
		if (activeIndex - 10 >= 0) {
			setActiveIndex(activeIndex - 10);

			if (activeIndex - 10 === 0) setShowArrowLeft(false);
		} else {
			setShowArrowLeft(false);
		}
	}; */

	return (
		<div>
			<TitleSlide slide={slide} />

			<StyledCardCarrussel>
				<div
					/* onDragEnter={(e) => handleDown(e)}
                    onDragEnd={(e) => handleMove(e)}

                    onTouchStart={(e) => handleDown(e)} */
					//onMouseDownCapture={(e) => handleDown(e)}
					onTouchStart={(e) => handleTouchDown(e)}
					onTouchMove={(e) => handleTouchMove(e)}
					onTouchEnd={(e) => handleTouchEnd(e)}

					/* onMouseMove={(e) => handleMove(e)}
					onMouseUp={() => setIsDown(false)}
					onMouseLeave={() => setIsDown(false)} */
				>
					<div
						className="carrussel-track"
						style={{ transform: `translateX(${xFinal}px)` }}
					>
						{slide.cards.map((c, index) => (
							<Card card={c} key={c.id} />
						))}
					</div>
				</div>
			</StyledCardCarrussel>
		</div>
	);
};

export default DragableCarrousel;

const StyledCardCarrussel = styled.div`
	background: white;
	position: relative;
	display: block;
	overflow: hidden;
	align-self: center;
	cursor: pointer;

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
