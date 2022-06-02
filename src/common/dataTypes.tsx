import * as React from "react";

/* CARD */
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

type CardType = {
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
};

export interface cardProps {
	card: CardType;
}

/* SLIDES */
export type SlideType = {
	name: string;
	description: string;
	slug: string;
	type: string;
	title: string;
	icon: string;
	background: string;
	cards: CardType[];
};

export type SlidesType = {
	slides: SlideType[];
};

export interface slideProps {
	slide: SlideType;
}
export interface slidesProps {
	slides: SlideType[];
}

/* TOP SALES */
export type TopSalesType = {
	type: string;
	title: string;
	icon: string;
	background: string;
	cards: CardType[];
};
export interface topSalesProps {
	topSales: TopSalesType;
}

/* HERO */
interface imagesHeroProps {
	url: string;
	text: string;
}
export type HeroType = {
	image: imagesHeroProps[];
	title: string;
};
export interface heroProps {
	hero: HeroType;
}

/* DATA */
type dataType = {
	hero: HeroType;
	slides: SlidesType[];
	topSales: TopSalesType;
};
export interface dataProps {
	data: dataType;
}
