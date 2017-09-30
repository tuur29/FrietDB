import { Injectable } from '@angular/core';

@Injectable() 
export class GlobalsService {
	title: string;

  // Temporary static data
  shops: any[] = [
  {
  	id: 1,
  	name: 'Frituur Patat',
  	image: 'http://www.frituurlatem.be/fotos/header.jpg',
  	description: `
  	Frituur Patat serveert een groot assortiment gefrituurde snacks. Wij zijn de enige in Oostakker die bovendien échte Bicky burgers maakt. Bekijk onze frieten en snacks.

  	Wij hebben in huis:
  	- Frieten
  	- Snacks
  	- Belegde broodjes
  	- Warme schotels
  	`,
  	street: 'Eeenheeelelaaangeestraaatnaaam',
  	number: '1',
  	municipality: "Gemeente",
  	telephone: '04 00 00 00 00',
  	email: 'friet@shop.be',
  	website: 'www.frituurpatat.be',
  	lat: 51.4,
  	lng: 7.9,
  },
  {
  	id: 2,
  	name: 'Frietshop',
  	street: 'Straat2',
  	number: '334',
  	municipality: "Gemeente",
  	lat: 51.373858,
  	lng: 7.215982,
  },
  {
  	id: 3,
  	name: 'Frituur Nadine',
  	street: 'Straat3',
  	number: '2',
  	municipality: "Gemeente",
  	lat: 51.723858,
  	lng: 7.895982,
  },
  {
  	id: 4,
  	name: 'Langs de waterkant',
  	street: 'Straat4',
  	number: '55',
  	municipality: "Gemeente",
  	lat: 51.925,
  	lng: 8,
  }];

  snacks: any[] = [
  {
  	id: 0,
  	name: 'Kipkorn',
  	type: 'Snack',
  	image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
  	link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
  },
  {
  	id: 1,
  	name: 'Hamburger',
  	type: 'Snack',
  	image: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
  	favorite: true
  },
  {
  	id: 2,
  	name: 'Klein pakje',
  	type: 'Frieten',
  },
  {
  	id: 3,
  	name: 'Sate',
  	type: 'Snack',
  	link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
  },
  {
  	id: 4,
  	name: 'Lucifer',
  	type: 'Snack',
  	image: 'http://www.vanhoofonline.be/uploads/Producten/MoraLucifer.gif',
  	link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
  	favorite: true
  },
  {
  	id: 5,
  	name: 'Joppie',
  	type: 'Saus',
  	image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
  	link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
  },
  {
  	id: 6,
  	name: 'Ketchup',
  	type: 'Saus',
  	favorite: true
  }];
}
