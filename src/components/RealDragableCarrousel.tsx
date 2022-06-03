import * as React from "react";
import Card from "./Card";
import styled from "styled-components";
import { slideProps } from "../common/dataTypes";
import TitleSlide from "./TitleSlide";
import Slider from "react-slick";
const RealDragableCarrousel: React.FC<slideProps> = ({
	slide,
}): JSX.Element => {
	const settings = {
		className: "center",
		infinite: false,
		centerPadding: "160px",
		slidesToShow: 3,
		initialSlide: 0,
		swipeToSlide: true,
		afterChange: function (index: number) {
			console.log(
				`Slider Changed to: ${index + 1}, background: #222; color: #bada55`
			);
		},

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 930,
				settings: {
					slidesToShow: 3,
				},
			},

			{
				breakpoint: 680,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 470,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div>
			<TitleSlide slide={slide} />

			<StyledCardCarrussel>
				<Slider {...settings}>
					{slide.cards.map((c, index) => (
						<Card card={c} key={c.id} />
					))}
				</Slider>
			</StyledCardCarrussel>
		</div>
	);
};
export default RealDragableCarrousel;

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
