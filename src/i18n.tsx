import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "EN" | "FR";

const STORAGE_KEY = "lang";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav / header
  "nav.home": "Home",
  "nav.flights": "Flights",
  "nav.hotels": "Hotels",
  "nav.contact": "Contact",
  "nav.language": "Language",
  "nav.message": "Message",

  // Hero (B.Trip-style headline)
  "hero.badge": "Trusted by 2.4M travellers worldwide",
  "hero.b.line1": "Search",
  "hero.b.line1Accent": "Your",
  "hero.b.line2": "Destination And",
  "hero.b.line3": "Book",
  "hero.b.line3Accent": "Your Flights",
  "hero.b.social":
    "people already joined Raees Niazi Travel to make their travel easy. Book your service today!",
  "hero.title1": "Where you meet",
  "hero.title2": "the world.",
  "hero.subtitle":
    "Find cheap flights, hotels and travel deals worldwide. Compare and book with confidence.",
  "hero.scroll": "Scroll",

  // Search panel
  "search.tab.flights": "Flights",
  "search.tab.hotels": "Hotels",
  "search.tab.cars": "Car Rental",
  "search.trip.round": "Round trip",
  "search.trip.oneway": "One way",
  "search.trip.multi": "Multi-city",
  "search.label.from": "From",
  "search.label.to": "To",
  "search.label.depart": "Depart",
  "search.label.return": "Return",
  "search.label.travellers": "Travellers",
  "search.label.destination": "Destination",
  "search.label.checkin": "Check-in",
  "search.label.checkout": "Check-out",
  "search.label.guests": "Guests & Rooms",
  "search.label.pickup": "Pick-up location",
  "search.label.dropoff": "Drop-off location",
  "search.label.pickupDate": "Pick-up date",
  "search.label.dropoffDate": "Drop-off date",
  "search.travellers.opt1": "1 Adult, Economy",
  "search.travellers.opt2": "2 Adults, Economy",
  "search.travellers.family": "2 Adults + 2 Kids",
  "search.travellers.business": "1 Adult, Business",
  "pax.cabin.economy": "Economy Class",
  "pax.cabin.business": "Business Class",
  "pax.adult": "Adult",
  "pax.adult.age": "12+ years",
  "pax.child": "Child",
  "pax.child.age": "2–12 years",
  "pax.infant": "Infant",
  "pax.infant.age": "Under 2 years",
  "pax.infant.rule": "Infants cannot exceed number of adults.",
  "pax.done": "Done",
  "pax.traveller": "Traveller",
  "pax.travellers": "Travellers",
  "pax.decrease": "Decrease",
  "pax.increase": "Increase",
  "search.guests.opt1": "1 Adult, 1 Room",
  "search.guests.opt2": "2 Adults, 1 Room",
  "search.guests.family": "2 Adults + 2 Kids, 1 Room",
  "search.guests.group": "4 Adults, 2 Rooms",
  "hotel.adult": "Adult",
  "hotel.adult.age": "18+ years",
  "hotel.child": "Child",
  "hotel.child.age": "0–17 years",
  "hotel.rooms": "Rooms",
  "hotel.rooms.sub": "Number of bedrooms",
  "hotel.rooms.rule":
    "Each room needs at least one adult. Most hotels allow up to 4 guests per room.",
  "hotel.guest": "Guest",
  "hotel.guests": "Guests",
  "hotel.room": "Room",
  "hotel.roomsWord": "Rooms",
  "search.directOnly": "Direct flights only",
  "search.addNearby": "Add nearby airports",
  "search.alert.missingAirports": "Please enter departure and destination",
  "howItWorks.button": "How it works",
  "howItWorks.caption": "Watch how to find the cheapest flights in seconds",
  "howItWorks.close": "Close video",
  "howVideo.eyebrow": "See it in action",
  "howVideo.sectionTitle": "Booking your trip, simplified.",
  "howVideo.title": "Booking your next trip, simplified.",
  "howVideo.subtitle": "Search hundreds of airlines and travel providers in one place. Compare prices instantly. Book with confidence.",
  "howVideo.feature.search": "Search 100+ airlines worldwide",
  "howVideo.feature.compare": "Compare prices side by side",
  "howVideo.feature.book": "Book securely on Trip.com",
  "howVideo.cta": "Start Searching",
  "howVideo.note": "Free to use \u2014 no signup required",
  "howVideo.liveBadge": "Live demo",
  "howItWorks.placeholderTitle": "Your explainer video will appear here",
  "howItWorks.placeholderHint": "Once your YouTube video is ready, paste its ID into the component file and it will play here automatically.",
  "search.cta.flights": "Search",
  "search.cta.hotels": "Search",
  "search.cta.cars": "Search",
  "search.trustLine": "Compare prices from 100+ airlines instantly",
  "search.scarcity":
    "Prices change frequently — book early for the best deals.",
  "search.chip.partners": "Trusted travel partners",
  "search.chip.secure": "Secure redirection",
  "search.chip.fees": "No hidden fees",
  "search.placeholder.cityAirport": "City or airport",
  "search.placeholder.destination": "City, hotel, or area",
  "search.placeholder.location": "Airport, city, or address",
  "search.swap": "Swap origin and destination",

  // Disclaimer (shared body)
  "disclaimer.label": "Disclaimer:",
  "disclaimer.body":
    "Raees Niazi Travel is an independent travel comparison website. We do not sell tickets directly. All bookings are completed through trusted third-party providers. Prices and availability are subject to change on partner websites. We may earn a commission from our partners at no extra cost to you.",
  "disclaimer.inquiries": "For inquiries, contact us at",
  "disclaimer.or": "or",

  // How it works
  "how.eyebrow": "Simple, Fast, Free",
  "how.title": "How it works",
  "how.subtitle": "Three steps between you and your next adventure.",
  "how.stepLabel": "Step",
  "how.step.search.title": "Search",
  "how.step.search.desc": "Enter your destination and travel dates.",
  "how.step.compare.title": "Compare",
  "how.step.compare.desc":
    "We compare prices from trusted travel partners.",
  "how.step.book.title": "Book",
  "how.step.book.desc":
    "Complete your booking securely on partner websites.",
  "how.cta.button": "How it works 🔥",

  // Intro video player
  "introVideo.headline": "Find Cheapest Flights Worldwide ✈️",
  "introVideo.outroCta": "Book your flight now",
  "introVideo.skip": "Skip intro",
  "introVideo.replay": "Play demo",

  // Why choose us
  "why.eyebrow": "Why Choose Us",
  "why.title": "Booked the smart way.",
  "why.subtitle":
    "Four reasons travellers keep coming back to Raees Niazi Travel — from the first search to the final boarding pass.",
  "why.f.price.title": "Best Price Guarantee",
  "why.f.price.desc":
    "Find a lower fare elsewhere within 24 hours and we'll refund the difference. No fine print.",
  "why.f.partners.title": "Trusted Partners",
  "why.f.partners.desc":
    "Direct contracts with 500+ airlines and 1.4M hotels worldwide — every booking is verified.",
  "why.f.support.title": "24/7 Support",
  "why.f.support.desc":
    "Real humans on call around the clock, in English, French, Dari and Pashto. Always.",
  "why.f.secure.title": "Secure Booking",
  "why.f.secure.desc":
    "256-bit encryption, IATA-accredited, and full refund protection on every cancellable fare.",

  // Cheap flights worldwide
  "cheap.eyebrow": "Cheap Flights Worldwide",
  "cheap.title":
    "One search. Hundreds of airlines. Always the lowest fare.",
  "cheap.body":
    "We compare live prices across 1,200+ airlines and online travel agents — full-service carriers, low-cost airlines, and the hidden routes most search engines miss. From Kabul to Sydney, Marrakech to Tokyo, we'll find you the cheapest seat in seconds and show you exactly what you're paying for.",
  "cheap.point1": "Live prices, no hidden booking fees",
  "cheap.point2": "Mix and match airlines for the best price",
  "cheap.point3": "Transparent baggage and cabin breakdown",
  "cheap.point4": "Pay in your local currency",
  "cheap.cta": "Start searching",
  "cheap.liveDeal": "Live deal",
  "cheap.dealMeta": "Round trip · Departs Friday",
  "cheap.savedLabel": "Saved by travellers in 2025",
  "cheap.airlinesLabel": "Airlines compared",
  "cheap.partnersTitle": "Trusted partners we book with",

  // Destinations
  "dest.eyebrow": "Top Routes from Kabul",
  "dest.title": "Popular destinations",
  "dest.subtitle":
    "Live prices on the most-booked routes from Hamid Karzai International. Tap any card to compare deals from our trusted travel partners.",
  "dest.custom": "Custom search",
  "dest.from": "From",
  "dest.perPerson": "/person",
  "dest.searchFlights": "Search flights",
  "dest.blurb.paris": "City of light, museums and Seine-side cafés.",
  "dest.blurb.istanbul":
    "Where two continents meet over a cup of çay.",
  "dest.blurb.dubai":
    "Skyline of the future, golden desert at sunset.",
  "dest.blurb.frankfurt":
    "Germany's financial heart, on the river Main.",

  // Trust boost
  "trust.eyebrow": "Why travellers trust us",
  "trust.title": "Book with total peace of mind",
  "trust.item1": "Powered by trusted travel partners",
  "trust.item2": "Secure booking through verified platforms",
  "trust.item3": "No hidden fees",
  "trust.item4": "Real-time price comparison",

  // CTA
  "cta.title": "Ready when you are.",
  "cta.subtitle":
    "Talk to a real travel expert in minutes. No bots, no hold-music — just someone who knows airfare like the back of their boarding pass.",
  "cta.whatsapp": "Chat on WhatsApp",
  "cta.browse": "Browse all deals",

  // FAQ
  "faq.eyebrow": "Got questions?",
  "faq.title": "Frequently Asked Questions",
  "faq.subtitle":
    "Everything you need to know before you book — straight answers, no fine print.",
  "faq.q1": "How does Raees Niazi Travel work?",
  "faq.a1":
    "Raees Niazi Travel is a travel comparison platform. We help you find the best prices for flights, hotels, and car rentals by connecting you with trusted travel partners.",
  "faq.q2": "Do you sell flight tickets directly?",
  "faq.a2":
    "No. We do not sell tickets directly. All bookings are completed securely on our partner websites.",
  "faq.q3": "How do you make money?",
  "faq.a3":
    "We may earn a small commission from our affiliate partners when you complete a booking through our links. This does not increase the price you pay.",
  "faq.q4": "Is my personal data safe?",
  "faq.a4":
    "Yes. We do not store sensitive personal data. Some information may be processed by our trusted partners in accordance with their own privacy policies.",
  "faq.disclaimer.title": "Travel Disclaimer",

  // Footer
  "footer.tagline":
    "Where you meet the world. Compare flights, hotels and travel deals worldwide using trusted partners — bookable in seconds.",
  "footer.contact": "Contact",
  "footer.whatsapp": "Chat on WhatsApp",
  "footer.location": "Business location: France",
  "footer.alsoWa":
    "You can also contact us via WhatsApp using the button above.",
  "footer.col.company": "Company",
  "footer.col.legal": "Legal",
  "footer.col.explore": "Explore",
  "footer.link.about": "About",
  "footer.link.contact": "Contact",
  "footer.link.privacy": "Privacy Policy",
  "footer.link.terms": "Terms",
  "footer.link.flights": "Flights",
  "footer.link.hotels": "Hotels",
  "footer.link.routes": "Popular routes",
  "footer.copyright": "All rights reserved.",
};

const fr: Dict = {
  // Nav / header
  "nav.home": "Accueil",
  "nav.flights": "Vols",
  "nav.hotels": "Hôtels",
  "nav.contact": "Contact",
  "nav.language": "Langue",
  "nav.message": "Message",

  // Hero
  "hero.badge": "Plébiscité par 2,4 M de voyageurs dans le monde",
  "hero.b.line1": "Trouvez",
  "hero.b.line1Accent": "Votre",
  "hero.b.line2": "Destination Et",
  "hero.b.line3": "Réservez",
  "hero.b.line3Accent": "Vos Vols",
  "hero.b.social":
    "voyageurs ont déjà choisi Raees Niazi Travel pour des voyages sans souci. Réservez le vôtre aujourd'hui !",
  "hero.title1": "Là où vous rencontrez",
  "hero.title2": "le monde.",
  "hero.subtitle":
    "Trouvez des vols, hôtels et offres de voyage à bas prix dans le monde entier. Comparez et réservez en toute confiance.",
  "hero.scroll": "Faites défiler",

  // Search panel
  "search.tab.flights": "Vols",
  "search.tab.hotels": "Hôtels",
  "search.tab.cars": "Location de voiture",
  "search.trip.round": "Aller-retour",
  "search.trip.oneway": "Aller simple",
  "search.trip.multi": "Multi-destinations",
  "search.label.from": "Départ",
  "search.label.to": "Arrivée",
  "search.label.depart": "Aller",
  "search.label.return": "Retour",
  "search.label.travellers": "Voyageurs",
  "search.label.destination": "Destination",
  "search.label.checkin": "Arrivée",
  "search.label.checkout": "Départ",
  "search.label.guests": "Voyageurs et chambres",
  "search.label.pickup": "Lieu de prise en charge",
  "search.label.dropoff": "Lieu de retour",
  "search.label.pickupDate": "Date de prise en charge",
  "search.label.dropoffDate": "Date de retour",
  "search.travellers.opt1": "1 Adulte, Économique",
  "search.travellers.opt2": "2 Adultes, Économique",
  "search.travellers.family": "2 Adultes + 2 Enfants",
  "search.travellers.business": "1 Adulte, Affaires",
  "pax.cabin.economy": "Classe Économique",
  "pax.cabin.business": "Classe Affaires",
  "pax.adult": "Adulte",
  "pax.adult.age": "12 ans et +",
  "pax.child": "Enfant",
  "pax.child.age": "2–12 ans",
  "pax.infant": "Bébé",
  "pax.infant.age": "Moins de 2 ans",
  "pax.infant.rule":
    "Le nombre de bébés ne peut pas dépasser le nombre d'adultes.",
  "pax.done": "Valider",
  "pax.traveller": "Voyageur",
  "pax.travellers": "Voyageurs",
  "pax.decrease": "Diminuer",
  "pax.increase": "Augmenter",
  "search.guests.opt1": "1 Adulte, 1 Chambre",
  "search.guests.opt2": "2 Adultes, 1 Chambre",
  "search.guests.family": "2 Adultes + 2 Enfants, 1 Chambre",
  "search.guests.group": "4 Adultes, 2 Chambres",
  "hotel.adult": "Adulte",
  "hotel.adult.age": "18 ans et +",
  "hotel.child": "Enfant",
  "hotel.child.age": "0–17 ans",
  "hotel.rooms": "Chambres",
  "hotel.rooms.sub": "Nombre de chambres",
  "hotel.rooms.rule":
    "Chaque chambre nécessite au moins un adulte. La plupart des hôtels acceptent jusqu'à 4 personnes par chambre.",
  "hotel.guest": "Voyageur",
  "hotel.guests": "Voyageurs",
  "hotel.room": "Chambre",
  "hotel.roomsWord": "Chambres",
  "search.directOnly": "Vols directs uniquement",
  "search.addNearby": "Ajouter les aéroports proches",
  "search.alert.missingAirports": "Veuillez saisir un départ et une destination",
  "howItWorks.button": "Comment ça marche",
  "howItWorks.caption": "Découvrez comment trouver les vols les moins chers en quelques secondes",
  "howItWorks.close": "Fermer la vidéo",
  "howVideo.eyebrow": "Voir en action",
  "howVideo.sectionTitle": "Réserver votre voyage, simplifié.",
  "howVideo.title": "Réservez votre prochain voyage, en toute simplicité.",
  "howVideo.subtitle": "Recherchez des centaines de compagnies aériennes et d'agences de voyage au même endroit. Comparez les prix instantanément. Réservez en toute confiance.",
  "howVideo.feature.search": "Recherchez parmi 100+ compagnies aériennes",
  "howVideo.feature.compare": "Comparez les prix côte à côte",
  "howVideo.feature.book": "Réservez en toute sécurité sur Trip.com",
  "howVideo.cta": "Commencer la recherche",
  "howVideo.note": "Gratuit \u2014 sans inscription",
  "howVideo.liveBadge": "Démo en direct",
  "howItWorks.placeholderTitle": "Votre vidéo explicative apparaîtra ici",
  "howItWorks.placeholderHint": "Dès que votre vidéo YouTube sera prête, collez son identifiant dans le fichier du composant et elle s'affichera ici automatiquement.",
  "search.cta.flights": "Rechercher",
  "search.cta.hotels": "Rechercher",
  "search.cta.cars": "Rechercher",
  "search.trustLine":
    "Comparez les prix de plus de 100 compagnies aériennes instantanément",
  "search.scarcity":
    "Les prix changent souvent — réservez tôt pour les meilleures offres.",
  "search.chip.partners": "Partenaires de voyage de confiance",
  "search.chip.secure": "Redirection sécurisée",
  "search.chip.fees": "Aucuns frais cachés",
  "search.placeholder.cityAirport": "Ville ou aéroport",
  "search.placeholder.destination": "Ville, hôtel ou quartier",
  "search.placeholder.location": "Aéroport, ville ou adresse",
  "search.swap": "Inverser le départ et l'arrivée",

  // Disclaimer
  "disclaimer.label": "Avertissement :",
  "disclaimer.body":
    "Raees Niazi Travel est un site indépendant de comparaison de voyages. Nous ne vendons pas de billets directement. Toutes les réservations sont effectuées via des prestataires tiers de confiance. Les prix et la disponibilité peuvent être modifiés sur les sites de nos partenaires. Nous pouvons percevoir une commission de nos partenaires sans coût supplémentaire pour vous.",
  "disclaimer.inquiries": "Pour toute demande, contactez-nous à",
  "disclaimer.or": "ou",

  // How it works
  "how.eyebrow": "Simple, rapide, gratuit",
  "how.title": "Comment ça marche",
  "how.subtitle": "Trois étapes entre vous et votre prochaine aventure.",
  "how.stepLabel": "Étape",
  "how.step.search.title": "Recherchez",
  "how.step.search.desc":
    "Saisissez votre destination et vos dates de voyage.",
  "how.step.compare.title": "Comparez",
  "how.step.compare.desc":
    "Nous comparons les prix de nos partenaires de voyage de confiance.",
  "how.step.book.title": "Réservez",
  "how.step.book.desc":
    "Finalisez votre réservation en toute sécurité sur les sites de nos partenaires.",
  "how.cta.button": "Comment ça marche 🔥",

  // Intro video player
  "introVideo.headline": "Trouvez les vols les moins chers dans le monde ✈️",
  "introVideo.outroCta": "Réservez votre vol maintenant",
  "introVideo.skip": "Passer l'intro",
  "introVideo.replay": "Lire la démo",

  // Why choose us
  "why.eyebrow": "Pourquoi nous choisir",
  "why.title": "Réservé en toute intelligence.",
  "why.subtitle":
    "Quatre raisons pour lesquelles les voyageurs reviennent toujours chez Raees Niazi Travel — de la première recherche à la dernière carte d'embarquement.",
  "why.f.price.title": "Garantie du meilleur prix",
  "why.f.price.desc":
    "Trouvez un tarif inférieur ailleurs sous 24 h et nous vous remboursons la différence. Sans petits caractères.",
  "why.f.partners.title": "Partenaires de confiance",
  "why.f.partners.desc":
    "Contrats directs avec plus de 500 compagnies aériennes et 1,4 M d'hôtels dans le monde — chaque réservation est vérifiée.",
  "why.f.support.title": "Support 24/7",
  "why.f.support.desc":
    "De vraies personnes au téléphone à toute heure, en français, anglais, dari et pachto. Toujours.",
  "why.f.secure.title": "Réservation sécurisée",
  "why.f.secure.desc":
    "Chiffrement 256 bits, accréditation IATA et protection complète sur chaque tarif annulable.",

  // Cheap flights worldwide
  "cheap.eyebrow": "Vols pas chers dans le monde",
  "cheap.title":
    "Une recherche. Des centaines de compagnies. Toujours le tarif le plus bas.",
  "cheap.body":
    "Nous comparons les prix en direct sur plus de 1 200 compagnies aériennes et agences de voyages en ligne — compagnies traditionnelles, low-cost et les itinéraires cachés que la plupart des moteurs oublient. De Kaboul à Sydney, de Marrakech à Tokyo, nous vous trouverons le siège le moins cher en quelques secondes et vous montrerons exactement ce que vous payez.",
  "cheap.point1": "Prix en direct, sans frais de réservation cachés",
  "cheap.point2": "Combinez les compagnies pour le meilleur prix",
  "cheap.point3": "Détail transparent des bagages et de la cabine",
  "cheap.point4": "Payez dans votre devise locale",
  "cheap.cta": "Commencer la recherche",
  "cheap.liveDeal": "Offre en direct",
  "cheap.dealMeta": "Aller-retour · Départ vendredi",
  "cheap.savedLabel": "Économisés par les voyageurs en 2025",
  "cheap.airlinesLabel": "Compagnies comparées",
  "cheap.partnersTitle": "Partenaires de confiance avec qui nous réservons",

  // Destinations
  "dest.eyebrow": "Itinéraires populaires depuis Kaboul",
  "dest.title": "Destinations populaires",
  "dest.subtitle":
    "Prix en direct sur les itinéraires les plus réservés au départ de l'aéroport international Hamid Karzai. Touchez une carte pour comparer les offres de nos partenaires de voyage de confiance.",
  "dest.custom": "Recherche personnalisée",
  "dest.from": "Dès",
  "dest.perPerson": "/personne",
  "dest.searchFlights": "Rechercher des vols",
  "dest.blurb.paris":
    "Ville lumière, musées et cafés en bord de Seine.",
  "dest.blurb.istanbul":
    "Là où deux continents se rencontrent autour d'un çay.",
  "dest.blurb.dubai":
    "Skyline du futur, désert doré au coucher du soleil.",
  "dest.blurb.frankfurt":
    "Le cœur financier de l'Allemagne, sur le Main.",

  // Trust boost
  "trust.eyebrow": "Pourquoi les voyageurs nous font confiance",
  "trust.title": "Réservez en toute tranquillité",
  "trust.item1": "Propulsé par nos partenaires de voyage de confiance",
  "trust.item2": "Réservation sécurisée via des plateformes vérifiées",
  "trust.item3": "Aucuns frais cachés",
  "trust.item4": "Comparaison de prix en temps réel",

  // CTA
  "cta.title": "Prêts quand vous l'êtes.",
  "cta.subtitle":
    "Parlez à un vrai expert voyage en quelques minutes. Pas de bots, pas de musique d'attente — juste quelqu'un qui connaît les tarifs aériens sur le bout des doigts.",
  "cta.whatsapp": "Discuter sur WhatsApp",
  "cta.browse": "Voir toutes les offres",

  // FAQ
  "faq.eyebrow": "Des questions ?",
  "faq.title": "Questions fréquentes",
  "faq.subtitle":
    "Tout ce que vous devez savoir avant de réserver — des réponses claires, sans petits caractères.",
  "faq.q1": "Comment fonctionne Raees Niazi Travel ?",
  "faq.a1":
    "Raees Niazi Travel est une plateforme de comparaison de voyages. Nous vous aidons à trouver les meilleurs prix pour les vols, hôtels et locations de voiture en vous mettant en relation avec nos partenaires de voyage de confiance.",
  "faq.q2": "Vendez-vous des billets d'avion directement ?",
  "faq.a2":
    "Non. Nous ne vendons pas de billets directement. Toutes les réservations sont effectuées en toute sécurité sur les sites de nos partenaires.",
  "faq.q3": "Comment gagnez-vous de l'argent ?",
  "faq.a3":
    "Nous pouvons percevoir une petite commission de nos partenaires affiliés lorsque vous finalisez une réservation via nos liens. Cela n'augmente pas le prix que vous payez.",
  "faq.q4": "Mes données personnelles sont-elles en sécurité ?",
  "faq.a4":
    "Oui. Nous ne stockons pas de données personnelles sensibles. Certaines informations peuvent être traitées par nos partenaires de confiance conformément à leurs propres politiques de confidentialité.",
  "faq.disclaimer.title": "Avertissement de voyage",

  // Footer
  "footer.tagline":
    "Là où vous rencontrez le monde. Comparez les vols, hôtels et offres de voyage dans le monde entier via des partenaires de confiance — réservable en quelques secondes.",
  "footer.contact": "Contact",
  "footer.whatsapp": "Discuter sur WhatsApp",
  "footer.location": "Lieu d'activité : France",
  "footer.alsoWa":
    "Vous pouvez également nous contacter via WhatsApp en utilisant le bouton ci-dessus.",
  "footer.col.company": "Entreprise",
  "footer.col.legal": "Mentions légales",
  "footer.col.explore": "Explorer",
  "footer.link.about": "À propos",
  "footer.link.contact": "Contact",
  "footer.link.privacy": "Politique de confidentialité",
  "footer.link.terms": "Conditions",
  "footer.link.flights": "Vols",
  "footer.link.hotels": "Hôtels",
  "footer.link.routes": "Itinéraires populaires",
  "footer.copyright": "Tous droits réservés.",
};

const dictionaries: Record<Lang, Dict> = { EN: en, FR: fr };

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "EN";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "EN" || v === "FR") return v;
  } catch {
    // ignore
  }
  return "EN";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang.toLowerCase();
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === "EN" ? "FR" : "EN")),
    [],
  );

  const t = useCallback(
    (key: string) => {
      const dict = dictionaries[lang];
      return dict[key] ?? dictionaries.EN[key] ?? key;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
