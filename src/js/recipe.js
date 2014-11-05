'use strict';

function Recipe() {
    return {
        id: 1,
        title: 'Spaghetti Carbonara',
        steps: [{
            instruction: 'The construction of the Wall happened during a period known as the Age of Heroes, which was about 8000 years before the events of the current story. All that modern Westerosi know about this period are legends passed down through the ages. Westerosi historians have no idea how valid these legends are.',
            img: {
                src: './images/Chocolate_Cake.png',
                width: "535",
                height: "400", 
                alt: "Chocolate Cake + recipe",
                attribution: {
                    link: 'https://www.flickr.com/photos/rore/241563759',
                    licence: 'https://creativecommons.org/licenses/by-sa/2.0/',
                    logo: './images/cc_logo.svg',
                    originator: 'rore'
                }
            }
        }, {
            instruction: 'Den Sauerteig, das Koch- und das Quellstück, und alle restlichen Zutaten in die Küchenmaschine geben und 5 – 7 Minuten kneten. Danach den Teig in eine gut gefettete Kastenform (1 Kg), die mit Sonnenblumenkernen ausgesteut ist,  geben und für 60 Minuten zur Gare stellen. Vorher auch noch oben mit Sonnenblumenkernen bestreuen.',
            img: './images/Spaghetti-Bolognese-1.jpg'
        }]
    };
}