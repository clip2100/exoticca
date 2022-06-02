import * as React from "react";
import Card from "./Card";
import styled from "styled-components";
import { slideProps } from "../common/dataTypes";
import TitleSlide from "./TitleSlide";

const DragableCarrousel: React.FC<slideProps> = ({ slide }): JSX.Element => {
	//const [isDown, setIsDown] = React.useState(false);
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

	/*For Touch*/
	const handleTouchDown = (e: any) => {
		let x = Math.trunc(e.touches[0].clientX);
		setXPos(x);
		setxDrag(xPosPrev);
		//setIsDown(true);
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

	/*For Click*/
	// const handleMouseDown = (e: any) => {
	// 	console.log(e.clientX);
	// 	let x = e.clientX;
	// 	setXPos(x);
	// 	setxDrag(xPosPrev);
	// 	setIsDown(true);
	// };
	// const handleMouseMove = (e: any) => {
	// 	if (!isDown) return;
	// 	let x = e.clientX;
	// 	let increment = x - xPos;
	// 	setxDrag(increment);
	// 	setxFinal(increment + xPosPrev);
	// };
	// const handleMouseEnd = (e: any) => {
	// 	setIsDown(false);
	// 	setxPosPrev(xDrag + xPosPrev);
	// 	if (xFinal > 10) {
	// 		setxFinal(0);
	// 		setxPosPrev(0);
	// 	}
	// 	const maxRight = -1 * step * (slide.cards.length - cardsShowing);
	// 	if (xFinal < maxRight) {
	// 		setxFinal(maxRight);
	// 		setxPosPrev(maxRight);
	// 	}
	//};

	return (
		<div>
			<TitleSlide slide={slide} />

			<StyledCardCarrussel>
				<div
					onTouchStart={(e) => handleTouchDown(e)}
					onTouchMove={(e) => handleTouchMove(e)}
					onTouchEnd={(e) => handleTouchEnd(e)}
					/* 	onMouseDown={(e) => handleMouseDown(e)}
					onMouseMove={(e) => handleMouseMove(e)}
					onMouseLeave={(e) => handleMouseEnd(e)}
					onMouseUp={(e) => handleMouseEnd(e)}
					onMouseOut={(e) => handleMouseEnd(e)} */
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
