"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import "./lower-sections.css";
import { InteractivePlan } from "./GeneralPlan";

const content = {"rooms": [{"id": 7, "title": "One-story", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/1_floor_villa_living_88a62573a7_ec56d30b3e.webp", "alt": "Living of a 1 storey villa of Horizonte Village project, new development located in Mijas"}, "benefits": [{"id": 15, "title": "Home Automation", "description": "Control via smart home system of lighting and air conditioning", "top": "20", "left": "5"}, {"id": 16, "title": "Windows and Glasing", "description": "Exterior carpentry by Cortizo, Cor-Vision with double glazing and solar protection", "top": "20", "left": "80"}, {"id": 19, "title": "Underfloor Heating", "description": "All over the house except for the bedrooms, which have wood flooring ", "top": "80", "left": "76"}], "type": "villas"}, {"id": 12, "title": "Two-story", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/2_floor_villa_living_166b4c4352_e04f6e4e98.webp", "alt": "Living of a 2 storey villa of Horizonte Village project, new development located in Mijas"}, "benefits": [{"id": 28, "title": "Windows and Glasing", "description": "Exterior carpentry by Cortizo, Cor-Vision with double glazing and solar protection", "top": "42", "left": "12"}, {"id": 29, "title": "Kitchen Cupboard", "description": "Luxury Italian furniture - Scavolini products are fully certified as Made in Italy, designed for discerning clients ", "top": "54", "left": "37"}, {"id": 30, "title": "Underfloor Heating", "description": "All over the house except for the bedrooms, which have wood flooring ", "top": "80", "left": "52"}, {"id": 31, "title": "Elevator", "description": "Included in villa 4. Optional for other two-story villas", "top": "49", "left": "79"}, {"id": 32, "title": "Double volume", "description": "Double ceiling height 6.4m", "top": "14", "left": "53"}], "type": "villas"}, {"id": 13, "title": "Kitchen", "description": "Luxury Italian furniture - Scavolini products are fully certified as Made in Italy, designed for discerning clients ", "photo": {"original": "https://cdn.horizonte-village.com/Kitchen_4d20c68afb_61e1d234f8.webp", "alt": "kitchen of a 1 storey villa of Horizonte Village project, new development located in Mijas"}, "benefits": [{"id": 33, "title": "Appliances ", "description": "Siemens or similar ", "top": "46", "left": "12"}], "type": "villas"}, {"id": 14, "title": "Bedroom", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/Bedroom_a231f7fb0d_1551b559c1.webp", "alt": "Bedroom of villas of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "villas"}, {"id": 16, "title": "Bathroom", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/Bathroom_3_b2ca1c8a56_31fd34199a.webp", "alt": "Bathroom of villa of Horizonte Village project, new development located in Mijas"}, "benefits": [{"id": 34, "title": "Bathrooms fixtures", "description": "Villeroy & Boch or similar", "top": "14", "left": "69"}], "type": "villas"}, {"id": 15, "title": "Basement", "description": "All villas have basements. All basements comes with walls and finishing. Equipped bathrooms, laundry room with washer and dryer", "photo": {"original": "https://cdn.horizonte-village.com/Basement_1_8c1b070d6a_9fc77d5e8b.webp", "alt": "Basement of villa of Horizonte Village project, new development located in Mijas"}, "benefits": [{"id": 35, "title": "Ceiling high ", "description": "2.80", "top": "13", "left": "72"}], "type": "villas"}, {"id": 23, "title": "Living ", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/41_29f4a7aa88_fcda839569.webp", "alt": "Living of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}, {"id": 24, "title": "Living 2", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/21_954cc9d021_6fb8c34695.webp", "alt": "Living of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}, {"id": 17, "title": "Kitchen", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/12_50a6b93622_e33acc81f9.webp", "alt": "Kitchen of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}, {"id": 20, "title": "Bedroom", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/1_c94fa6a3ed_7dae784900.webp", "alt": "Bedroom of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}, {"id": 25, "title": "Bedroom II", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/2_1596aac66c_2f60b886a2.webp", "alt": "Bedroom of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}, {"id": 26, "title": "Bedroom's View", "description": null, "photo": {"original": "https://cdn.horizonte-village.com/66_f21ceaa9dd_1464b274dc.webp", "alt": "Living of residences of Horizonte Village project, new development located in Mijas"}, "benefits": [], "type": "residences"}], "amenities": [{"id": 1, "title": "Clubhouse", "description": "The event and meeting areas offer a versatile space for hosting various occasions, from business meetings to social gatherings, providing residents with a convenient venue to connect and socialize", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39225_1_01b30d14a5_921387b7c5.webp", "alt": "clubhouse of the new development Horizonte Village, located in Mijas "}, "type": "villas"}, {"id": 4, "title": "Private Swimming Pool", "description": "Our upscale pool offers a unique relaxation experience with breathtaking views of the Spanish coastline.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39227_8f389816e7_caab54d654.webp", "alt": "Pool in Horizonte Village "}, "type": "villas"}, {"id": 3, "title": "Outdoor Gym", "description": "The outdoor gym provides a refreshing outdoor workout experience, encouraging residents to engage in physical activity amidst nature.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39224_294a05c6ef_be9543598b.webp", "alt": "outdoor gym of the new development Horizonte Village, located in Mijas "}, "type": "villas"}, {"id": 6, "title": "Playground ", "description": "The playground creates a safe and fun environment for children to play and explore, fostering a sense of community and family- friendly living within the villas and apartment complex.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39225_9fbab2d4c6_2ffcb11cc3.webp", "alt": "playground of the new development Horizonte Village, located in Mijas "}, "type": "villas"}, {"id": 7, "title": "Coworking", "description": "The coworking space promotes a collaborative and dynamic work environment, allowing individuals to network, exchange ideas, and work efficiently in a professional setting.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39228_789041c103_d85fc44338.webp", "alt": "coworking of the new development Horizonte Village, located in Mijas "}, "type": "villas"}, {"id": 14, "title": "Clubhouse", "description": "The event and meeting areas offer a versatile space for hosting various occasions, from business meetings to social gatherings, providing residents with a convenient venue to connect and socialize", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39225_1_01b30d14a5_921387b7c5.webp", "alt": "clubhouse of the new development Horizonte Village, located in Mijas "}, "type": "residences"}, {"id": 2, "title": "Residencial swimming pool", "description": "Our upscale pool offers a unique relaxation experience with breathtaking views of the Spanish coastline.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39227_8f389816e7_caab54d654.webp", "alt": "Pool in Horizonte Village "}, "type": "residences"}, {"id": 15, "title": "Outdoor Gym", "description": "The outdoor gym provides a refreshing outdoor workout experience, encouraging residents to engage in physical activity amidst nature.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39224_294a05c6ef_be9543598b.webp", "alt": "outdoor gym of the new development Horizonte Village, located in Mijas "}, "type": "residences"}, {"id": 16, "title": "Playground ", "description": "The playground creates a safe and fun environment for children to play and explore, fostering a sense of community and family- friendly living within the villas and apartment complex.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39225_9fbab2d4c6_2ffcb11cc3.webp", "alt": "playground of the new development Horizonte Village, located in Mijas "}, "type": "residences"}, {"id": 17, "title": "Coworking", "description": "The coworking space promotes a collaborative and dynamic work environment, allowing individuals to network, exchange ideas, and work efficiently in a professional setting.", "photo": {"original": "https://cdn.horizonte-village.com/Rectangle_39228_789041c103_d85fc44338.webp", "alt": "coworking of the new development Horizonte Village, located in Mijas "}, "type": "residences"}], "articles": [{"title": "<p><span style=\"white-space:pre-wrap;\">What </span><i><span style=\"white-space:pre-wrap;\">to do</span></i><span style=\"white-space:pre-wrap;\"> in the south&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">of</span></i><span style=\"white-space:pre-wrap;\"> spain during&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">the</span></i><span style=\"white-space:pre-wrap;\"> day?</span></p>", "text": "<p>The Costa del Sol, renowned for its mild climate and stunning views, offers a variety of exciting destinations for day trips. Whether you're into art, nature, or active adventures, there's something for everyone here. Let’s explore five incredible locations perfect for a day trip.</p><p>&nbsp;1. <strong>Centro Pompidou Málaga</strong> — Art and Culture<br>Start your day with a visit to the Centro Pompidou Málagaб located in a modern and vibrant building. This is a branch of the famous Paris museum, showcasing contemporary and avant-garde paintings, photography, and sculptures. The center also hosts temporary exhibitions and events that immerse visitors in the art world of the 20th and 21st centuries. It’s a perfect way to spend a cultural morning in the capital of the Costa del Sol.</p><p>2. <strong>Nerja Caves</strong> — A Natural Wonder<br>After indulging in culture, head to Nerja to explore the renowned Nerja Caves. These are among the most impressive natural formations in Spain, featuring gigantic stalactites and stalagmites, underground halls, and amphitheaters that transport you to another dimension. For history buffs, the caves also hold archaeological findings dating back to prehistoric times.</p><p>3. <strong>Real Club de Golf Sotogrande</strong> — A Golfer’s Paradise<br>If you're a golf enthusiast or want to try your hand at this elegant sport, visit the Real Club de Golf Sotogrande. It’s one of the oldest and most prestigious golf courses on the Costa del Sol. The club not only offers a unique golfing experience on a scenic course but also top-notch facilities with views of the Mediterranean Sea. It's an ideal spot to relax and enjoy a day outdoors.</p><p>4. <strong>Caminito del Rey</strong> — An Adventure for the Brave<br>For those who love adrenaline and active adventures, a hike along the Caminito del Rey is perfect. This scenic trail winds through the Gaitanes Gorge, offering breathtaking views of cliffs and rivers. Once considered one of the most dangerous paths in the world, it's now fully safe but still provides an unforgettable experience. Ideal for thrill-seekers and nature lovers alike.</p><p>5. <strong>Tarifa</strong> — Wind and Waves<br>End your day in Tarifa, the southernmost city in Spain, famous for its beaches and winds, which create ideal conditions for kitesurfing and windsurfing. It’s a great spot for those who want to try water sports or simply relax on the vast sandy beaches. Nature lovers can also take a coastal walk and, on a clear day, even catch a glimpse of Africa across the sea.</p><p><br>So, the Costa del Sol offers a wide range of day trip options, from cultural immersion in Málaga and exploring natural wonders in Nerja to active adventures in Tarifa. These locations will leave you with unforgettable memories and ensure your day on the coast is both rich and exciting.</p>", "author": "Horizonte Team", "position": "2024", "tags": ["Leisure", "Real Estate", "Malaga"], "photos": [{"original": "https://cdn.horizonte-village.com/centro_pompidou_malaga_A6143601_c_area_Turismo_Ayuntamiento_Malaga_20e9149b32_e270eedc7d.webp", "alt": "Centro Pompidou located in Malaga"}, {"original": "https://cdn.horizonte-village.com/1200px_Cuevas_de_Nerja_1d6c23f5ca_447c18230a.webp", "alt": "Nerja Caves"}, {"original": "https://cdn.horizonte-village.com/Sotogrande_07_Aerial_Approach_Web_8f8de64b42_be3ce038d7.webp", "alt": "Golf Club located in Sotogrande"}, {"original": "https://cdn.horizonte-village.com/Rectangle_39260_77ad2d66e3_72d7531e6e.webp", "alt": "Caminito del rey"}, {"original": "https://cdn.horizonte-village.com/tarifa_kitesurfers_6_b958_a7ff35ecac_55a4578c81.webp", "alt": "beach on Tarifa"}]}, {"title": "<p><span style=\"white-space:pre-wrap;\">What </span><i><span style=\"white-space:pre-wrap;\">to do</span></i><span style=\"white-space:pre-wrap;\"> in the south&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">of</span></i><span style=\"white-space:pre-wrap;\"> spain during&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">the</span></i><span style=\"white-space:pre-wrap;\"> night?</span></p>", "text": "<p>The Costa del Sol isn’t just about sun, sand, and daytime activities. When the sun sets, this vibrant region transforms into a hub of exciting nightlife experiences, offering something for every type of night owl. From live music under candlelight to fine dining and stargazing, here are five must-visit nighttime destinations for an unforgettable evening on the Costa del Sol.</p><p>1. <strong>Candlelight Concert at Art Villa Padierna</strong> — A Magical Musical Experience<br>For a truly enchanting evening, head to Art Villa Padierna and experience one of their famous Candlelight Concerts. These intimate performances feature classical music played by talented musicians, all set in a magical atmosphere illuminated by hundreds of candles. Whether it's a string quartet playing Vivaldi or a piano solo of Beethoven, this is the perfect way to enjoy an elegant and relaxing night.</p><p>2. <strong>Puente Romano</strong> — Glamorous Dining and Nightlife<br>For those seeking glamour and sophistication, Puente Romano in Marbella is a must-visit. This luxurious resort is home to some of the best restaurants, bars, and nightclubs on the Costa del Sol. You can start your evening with a world-class dinner at one of the many renowned eateries, then head over to La Suite nightclub or one of the stylish cocktail lounges for a night of dancing and mingling with the Marbella elite.</p><p>3. <strong>Observatory </strong>— Stargazing and Celestial Wonders<br>For something truly unique, why not spend the evening under the stars at an Observatory? The Costa del Sol, with its clear skies and minimal light pollution in certain areas, offers excellent stargazing opportunities. Whether you're an astronomy enthusiast or just looking for a peaceful night of contemplation, visiting an observatory provides an incredible chance to see planets, constellations, and even distant galaxies through high-powered telescopes.</p><p>4. <strong>Michelin-Star Restaurant</strong> — Gourmet Evenings<br>For food lovers, dining at a Michelin-starred restaurant is a must when visiting the Costa del Sol. There are several prestigious venues offering exquisite gourmet experiences where you can indulge in creative dishes crafted by some of the world's top chefs. Whether it's Dani García's culinary magic in Marbella or Skina's intimate dining experience, a Michelin-starred dinner is the ultimate treat for a luxurious night out.</p><p>5. <strong>Flamenco Show</strong> — Passion and Tradition<br>No night on the Costa del Sol would be complete without experiencing the passion and intensity of Flamenco. There are numerous venues across the region, from intimate tablaos to larger theaters, where you can watch this traditional Andalusian art form. Flamenco’s rhythmic guitar, powerful singing, and passionate dancing will leave you captivated. For an authentic night of Spanish culture, this is an absolute must.</p><p><br>So, the Costa del Sol offers a diverse and vibrant nightlife that caters to all tastes. Whether you’re looking to relax at a candlelit concert, enjoy fine dining, dance the night away, or gaze at the stars, there’s always something special waiting after dark. Your evenings here will be just as memorable as your days.</p>", "author": "Horizonte Team", "position": "2024", "tags": ["Night Life", "Real Estate", "Malaga"], "photos": [{"original": "https://cdn.horizonte-village.com/2022_12_08_Scottish_Rite_Theatre_PEORIA_INDIANAPOLIS_US_16_1_1024x681_01833729c5_172ed23e95.webp", "alt": "Candlelight Concert at Art Villa Padierna"}, {"original": "https://cdn.horizonte-village.com/Puente_Romano_Beach_Resort_Marbella_Exterior_8da79dbad1_6c00f625c3.webp", "alt": "Puente Romano beach resort in Marbella"}, {"original": "https://cdn.horizonte-village.com/hero_slider_image12x_c67960a2da_16be8e8844.webp", "alt": ""}, {"original": "https://cdn.horizonte-village.com/Rectangle_39258_2bbac894af_5eaf37e2a6.webp", "alt": "Micheline restaurant"}, {"original": "https://cdn.horizonte-village.com/Rectangle_39261_b1c2f7c56c_e75f5d8e50.webp", "alt": "Flamenco "}]}, {"title": "<p><span style=\"white-space:pre-wrap;\">What </span><i><span style=\"white-space:pre-wrap;\">to do</span></i><span style=\"white-space:pre-wrap;\"> in the south&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">of</span></i><span style=\"white-space:pre-wrap;\"> spain during&nbsp;</span></p><p><i><span style=\"white-space:pre-wrap;\">the</span></i><span style=\"white-space:pre-wrap;\"> weekends?</span></p>", "text": "<p>If you're looking to spice up your weekends, the Costa del Sol is the perfect starting point for exciting trips. In this blog, we'll explore five unique destinations for a weekend getaway, whether you're seeking mountain adventures, cultural discoveries, or culinary delights.</p><p>1. <strong>Sierra Nevada</strong> — Snowy Peaks and Outdoor Activities<br>For mountain sports enthusiasts and nature lovers, a trip to the Sierra Nevada is ideal. This mountain range in Andalusia transforms into a popular ski and snowboard resort in winter, while in summer, it offers hiking, climbing, and breathtaking panoramic views. Located just a few hours' drive from the Costa del Sol, Sierra Nevada is the perfect destination for an active weekend in the great outdoors.</p><p>2. <strong>Sevilla</strong> — The Heart of Andalusian Culture<br>If you're looking to immerse yourself in Andalusian culture and architecture, head to Seville. This city is known for its magnificent landmarks, such as the Alcázar, Sevilla Cathedral with its Giralda bell tower, and the famous Plaza de España. Sevilla is also the birthplace of flamenco, so don't miss the chance to catch a lively performance. In just one weekend, you can enjoy the city's rich history, vibrant streets, and delicious cuisine.</p><p>3. <strong>La Rioja</strong> — Wine Tourism and Scenic Landscapes<br>If you appreciate fine wine and scenic landscapes, take a trip to the La Rioja region. This renowned wine-producing area is located a bit further north and offers the opportunity to visit famous bodegas (wineries), taste local wine varieties, and enjoy the beauty of endless vineyards. It's the perfect choice for those looking to relax and savor the tranquil charm of rural Spain.</p><p>4. <strong>San Sebastian</strong> — A Gastronomic Paradise by the Coast<br>San Sebastian, situated on the Bay of Biscay, is a true gem for food lovers and nature enthusiasts. The city is famous for its beautiful beaches and Michelin-starred restaurants. Spend your weekend indulging in pintxos (traditional Basque tapas) and exploring the historic city center. Strolling along the waterfront and enjoying the local culinary delights will leave you with unforgettable memories.</p><p>5. <strong>Morocco</strong> — An Exotic Adventure in One Weekend<br>For those craving a completely different atmosphere, a trip to **Morocco** offers an unforgettable experience. Just a few hours away by ferry or plane, you'll find yourself on another continent. The cities of Tangier, Fez, or Marrakech offer a unique blend of Eastern culture, colorful markets, and exotic cuisine. In just one weekend, you can immerse yourself in the vibrant atmosphere of medinas and feel the exotic charm of this fascinating region.</p><p><br>So, the Costa del Sol opens the door to countless exciting weekend trips. Whether you want to ski in the Sierra Nevada, wander the historic streets of Sevilla, or explore the culture of Morocco, each of these destinations offers something unique and thrilling.</p>", "author": "Horizonte Team", "position": "2024", "tags": ["Weekend", "Real Estate", "Malaga"], "photos": [{"original": "https://cdn.horizonte-village.com/f_elconfidencial_com_original_014_844_62f_01484462f968b465d577011e12fa3725_2ef75ce0bb_bbf5896565.webp", "alt": "People skiing in the Sierra Nevada"}, {"original": "https://cdn.horizonte-village.com/Vivir_en_Sevilla_02_4c29a9f261_b27e8268f2.webp", "alt": "plaza in Sevilla"}, {"original": "https://cdn.horizonte-village.com/vinedos_larioja_c_1_Carlos_Gimenez_Saenz_CGS_2_83f5a39b15_df4cdc7f0e.webp", "alt": "grape fields in La Rioja"}, {"original": "https://cdn.horizonte-village.com/csm_Architektur_San_Sebastian_1_9daf635238_555de4b84f_7f06e4e3c3.webp", "alt": "San Sebastian city"}, {"original": "https://cdn.horizonte-village.com/HERO_REPUBMOROCCO_shutterstock_499250707_92a10ffa1c_5c06c5a18b.webp", "alt": "Morocco city"}]}], "progress": [{"id": 1, "preview": {"title": "Start of urbanization works", "date": "2025-06-14", "photo": {"original": "https://cdn.horizonte-village.com/124/DSC_1399_d7dcd688dc.jpg", "alt": ""}}, "details": {"title": "<p>2th Quarter of 2025</p>", "description": "", "date": "2025-06-14", "media": [{"original": "https://cdn.horizonte-village.com/124/DSC_1399_d7dcd688dc.jpg", "alt": "", "isVideo": false}, {"original": "https://cdn.horizonte-village.com/124/DSC_1468_1_1_1eb2978cef.jpg", "alt": "", "isVideo": false}, {"original": "https://cdn.horizonte-village.com/124/DSC_1434_885b76d917.jpg", "alt": "", "isVideo": false}, {"original": "https://cdn.horizonte-village.com/124/DSC_1366_c92816fd0c.jpg", "alt": "", "isVideo": false}, {"original": "https://cdn.horizonte-village.com/124/DSC_1483_dd440e22ed.jpg", "alt": "", "isVideo": false}]}}, {"id": 2, "preview": {"title": "Start of construction works", "date": "2025-08-07", "photo": {"original": "https://cdn.horizonte-village.com/124/DSC_1366_c92816fd0c.jpg", "alt": ""}}, "details": {"title": "<p><span style=\"white-space:pre-wrap;\">3nd Quarter of 2025</span></p>", "description": "", "date": "2025-08-07", "media": [{"original": "https://cdn.horizonte-village.com/124/DSC_1366_c92816fd0c.jpg", "alt": "", "isVideo": false}]}}], "logo": "<svg width=\"224\" height=\"224\" viewBox=\"0 0 224 224\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M89.1699 204.197V19.8037H94.6225V128.682H129.804V19.8037H135.256V204.213H129.804V133.187H94.6225V204.213H89.1699V204.197Z\" fill=\"#DFD8CF\"/>\n<path d=\"M169.679 109.195C169.679 140.962 143.933 166.708 112.166 166.708C80.3982 166.708 54.6523 140.962 54.6523 109.195C54.6523 77.4275 80.3982 51.6816 112.166 51.6816C143.933 51.6816 169.679 77.4275 169.679 109.195ZM148.959 72.4016C127.575 51.002 93.7532 50.1486 73.4283 70.4734C53.1035 90.7983 53.9569 124.62 75.3565 146.02C96.7561 167.419 130.578 168.273 150.903 147.948C171.228 127.623 170.359 93.8012 148.975 72.4016H148.959Z\" fill=\"#DFD8CF\"/>\n</svg>\n"};

const asset = (url: string) => `/reference-assets/${url.split("/").pop()}`;
type Category = "villas" | "residences";

function RoundButton({ children, onClick, label, className = "", expanded, controls }: { children: React.ReactNode; onClick?: () => void; label: string; className?: string; expanded?: boolean; controls?: string }) {
  return <button className={`lower-round ${className}`} onClick={onClick} aria-label={label} aria-expanded={expanded} aria-controls={controls}>{children}</button>;
}

export default function LowerSections({ category: externalCategory }: { category?: Category }) {
  const root = useRef<HTMLDivElement>(null);
  const amenitiesTrack = useRef<HTMLDivElement>(null);
  const dragDistance = useRef(0);
  const roomMotion = useRef<gsap.core.Timeline | null>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const progressTrack = useRef<HTMLDivElement>(null);
  const [detailRoomIndex, setDetailRoomIndex] = useState(0);
  const [roomChanging, setRoomChanging] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [category, setCategory] = useState<Category>(externalCategory || "villas");
  const [roomIndex, setRoomIndex] = useState(0);
  const [hotspot, setHotspot] = useState<number | null>(null);
  const [activeAmenity, setActiveAmenity] = useState<number | null>(null);
  const [amenityProgress, setAmenityProgress] = useState(0);
  const [journalTab, setJournalTab] = useState<"guide" | "progress">("guide");
  const [article, setArticle] = useState<number | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [requestReady, setRequestReady] = useState(false);
  const [emailHref, setEmailHref] = useState("");
  const rooms = content.rooms.filter(room => room.type === category);
  const amenities = content.amenities.filter(item => item.type === category);
  const currentRoom = rooms[Math.min(detailRoomIndex, rooms.length - 1)];

  useEffect(() => { if (externalCategory) { setCategory(externalCategory); setRoomIndex(0); } }, [externalCategory]);
  useEffect(() => {
    const updateCategory = (event: Event) => {
      const detail = (event as CustomEvent<Category | { category: Category }>).detail;
      const value = typeof detail === "string" ? detail : detail?.category;
      if (value === "villas" || value === "residences") { setCategory(value); setRoomIndex(0); setHotspot(null); setActiveAmenity(null); }
    };
    window.addEventListener("category-change", updateCategory);
    return () => window.removeEventListener("category-change", updateCategory);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("lower-default", "0.16,1,0.3,1");
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      // Original Ab(): characters scale from 1.7, 0.5s, edge stagger 0.015.
      gsap.utils.toArray<HTMLElement>(".lower-reveal").forEach(el => {
        const split = new SplitText(el, { type: "words,chars", tag: "span" });
        splits.push(split);
        gsap.set([...split.words, ...split.chars], { display: "inline-block" });
        const animation = gsap.timeline({ scrollTrigger: { trigger: el, start: "top bottom", toggleActions: "play none none none" } });
        split.words.forEach(word => {
          if (!word.children.length) return;
          animation.fromTo(word.children, { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: .5, ease: "lower-default", stagger: { each: .015, from: "edges" } }, `previous+=${Math.random() * .5}`);
        });
      });
      if (window.matchMedia("(min-width: 1024px)").matches) {
        gsap.utils.toArray<HTMLElement>(".lower-parallax").forEach(el => {
          gsap.fromTo(el, { yPercent: -20 }, { yPercent: 20, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
        });
      }
    }, root);
    return () => { ctx.revert(); splits.forEach(split => split.revert()); };
  }, []);
  useEffect(() => {
    roomMotion.current?.kill();
    setRoomIndex(0); setDetailRoomIndex(0); setRoomChanging(false); setHotspot(null);
    const photos = root.current?.querySelectorAll<HTMLElement>(".lower-room-image");
    photos?.forEach((photo, index) => {
      gsap.set(photo, { xPercent: 0, zIndex: index === 0 ? 3 : -1 });
      gsap.set(photo.firstElementChild, { scaleX: 1, scaleY: 1, xPercent: 0 });
    });
    amenitiesTrack.current?.scrollTo({ left: 0 });
  }, [category]);
  useEffect(() => {
    if (activeAmenity === null) return;
    const card = amenitiesTrack.current?.children[activeAmenity] as HTMLElement | undefined;
    const description = card?.querySelector<HTMLElement>(".lower-amenity-description");
    if (!description) return;
    let split: SplitText | undefined;
    let animation: gsap.core.Tween | undefined;
    // Original Space.T waits for the 0.5s circle collapse, then Hb(text,100).
    const timer = window.setTimeout(() => {
      gsap.set(description, { opacity: 1 });
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        split = new SplitText(description, { type: "lines" });
        animation = gsap.from(split.lines, { yPercent: 100, autoAlpha: 0, duration: .8, stagger: .05, ease: "lower-default" });
      }
    }, 500);
    const closeOutside = (event: PointerEvent) => { if (!card?.contains(event.target as Node)) setActiveAmenity(null); };
    document.addEventListener("pointerdown", closeOutside);
    return () => { window.clearTimeout(timer); animation?.kill(); split?.revert(); gsap.set(description, { clearProps: "opacity" }); document.removeEventListener("pointerdown", closeOutside); };
  }, [activeAmenity, category]);
  useEffect(() => {
    const close = () => setHotspot(null);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);
  useEffect(() => {
    ScrollTrigger.refresh();
    if (journalTab !== "progress") return;
    setProgressIndex(0);
    const track = progressTrack.current;
    if (!track) return;
    let start = 0, initial = 0, dragging = false;
    const down = (event: PointerEvent) => { if (event.pointerType !== "mouse" || event.button !== 0) return; start = event.clientX; initial = track.scrollLeft; dragging = true; dragDistance.current = 0; track.classList.add("is-dragging"); };
    const move = (event: PointerEvent) => { if (!dragging) return; const delta = event.clientX - start; dragDistance.current = Math.max(dragDistance.current, Math.abs(delta)); track.scrollLeft = initial - delta; if (Math.abs(delta) > 5) event.preventDefault(); };
    const up = () => { dragging = false; track.classList.remove("is-dragging"); };
    const nativeDrag = (event: DragEvent) => event.preventDefault();
    track.addEventListener("pointerdown", down); track.addEventListener("dragstart", nativeDrag); window.addEventListener("pointermove", move, { passive: false }); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    return () => { track.removeEventListener("pointerdown", down); track.removeEventListener("dragstart", nativeDrag); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
  }, [journalTab]);
  useEffect(() => {
    const track = amenitiesTrack.current;
    if (!track) return;
    let startX = 0, initialScroll = 0, dragging = false;
    let momentum: gsap.core.Animation | undefined;
    let samples: { x: number; time: number }[] = [];
    const position = { value: track.scrollLeft };
    const children = Array.from(track.children);
    const applyPosition = () => {
      const bounded = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, position.value));
      track.scrollLeft = bounded;
      gsap.set(children, { x: bounded - position.value });
    };
    const down = (event: PointerEvent) => {
      dragDistance.current = 0;
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      momentum?.kill();
      startX = event.clientX; initialScroll = position.value = track.scrollLeft;
      gsap.set(children, { x: 0 });
      samples = [{ x: event.clientX, time: performance.now() }];
      dragging = true;
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      dragDistance.current = Math.max(dragDistance.current, Math.abs(distance));
      if (dragDistance.current <= 5) return;
      samples.push({ x: event.clientX, time: performance.now() }); samples = samples.slice(-2);
      track.classList.add("is-dragging");
      const maximum = track.scrollWidth - track.clientWidth;
      const raw = initialScroll - distance;
      // Swiper's default edge resistance uses an exponent of 0.85.
      position.value = raw < 0 ? -Math.pow(-raw, .85) : raw > maximum ? maximum + Math.pow(raw - maximum, .85) : raw;
      applyPosition(); event.preventDefault();
    };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false; track.classList.remove("is-dragging");
      const maximum = track.scrollWidth - track.clientWidth;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const [previous, latest] = samples;
      const elapsed = latest && previous ? latest.time - previous.time : 0;
      const sampled = elapsed > 0 ? (previous.x - latest.x) / elapsed / 2 : 0;
      const velocity = event.type !== "pointercancel" && !reduce && Math.abs(sampled) >= .02 && elapsed <= 150 && performance.now() - (latest?.time || 0) <= 300 ? sampled : 0;
      const projected = position.value + velocity * 1000;
      const boundary = Math.max(0, Math.min(maximum, projected));
      const overshoot = velocity ? Math.sign(projected - boundary) * Math.min(Math.abs(projected - boundary), Math.abs(velocity) * 20) : 0;
      const destination = boundary + overshoot;
      const duration = velocity ? Math.abs((destination - position.value) / velocity) / 1000 : 0;
      const timeline = gsap.timeline({ onUpdate: applyPosition });
      if (duration) timeline.to(position, { value: destination, duration, ease: "lower-swiper" });
      if (position.value < 0 || position.value > maximum || overshoot) timeline.to(position, { value: boundary, duration: reduce ? 0 : .3, ease: "lower-swiper" });
      momentum = timeline;
    };
    CustomEase.create("lower-swiper", ".25,.1,.25,1");
    const stopMomentum = () => { momentum?.kill(); position.value = track.scrollLeft; gsap.set(children, { x: 0 }); };
    const nativeDrag = (event: DragEvent) => event.preventDefault();
    track.addEventListener("pointerdown", down); track.addEventListener("dragstart", nativeDrag);
    track.addEventListener("wheel", stopMomentum, { passive: true });
    window.addEventListener("pointermove", move, { passive: false }); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    return () => {
      momentum?.kill(); gsap.set(children, { x: 0 });
      track.removeEventListener("wheel", stopMomentum); track.removeEventListener("pointerdown", down); track.removeEventListener("dragstart", nativeDrag);
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
    };
  }, [category]);
  useEffect(() => {
    if (article === null && progress === null) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const modal = root.current?.querySelector<HTMLElement>(".lower-modal");
    modal?.querySelector<HTMLButtonElement>(".lower-modal-close")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setArticle(null); setProgress(null); }
      if (event.key === "Tab" && modal) {
        const focusable = Array.from(modal.querySelectorAll<HTMLElement>('button, a[href], input, [tabindex="0"]'));
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", escape); previousFocus?.focus({ preventScroll: true }); };
  }, [article, progress]);

  function changeRoom(index: number) {
    if (index === roomIndex || roomChanging) return;
    setHotspot(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setRoomIndex(index); setDetailRoomIndex(index); const photos = root.current?.querySelectorAll<HTMLElement>(".lower-room-image"); photos?.forEach((photo, i) => gsap.set(photo, { zIndex: i === index ? 3 : -1 })); return; }
    const photos = root.current?.querySelectorAll<HTMLElement>(".lower-room-image");
    if (!photos) return;
    const outgoing = photos[roomIndex], incoming = photos[index];
    setRoomIndex(index); setRoomChanging(true);
    gsap.set(outgoing, { zIndex: 2, transformOrigin: "right center" });
    gsap.set(incoming, { zIndex: 3, transformOrigin: "left center" });
    roomMotion.current = gsap.timeline({ onComplete: () => { gsap.set(outgoing, { zIndex: -1 }); setRoomChanging(false); } })
      .fromTo(outgoing, { xPercent: 0 }, { xPercent: -100, duration: 1.1, ease: "power2.out" }, 0)
      .fromTo(outgoing.firstElementChild, { scaleX: 1, scaleY: 1, xPercent: 0 }, { scaleX: 2.2, scaleY: 1.2, xPercent: 30, duration: 1.1, ease: "power2.out" }, 0)
      .fromTo(incoming, { xPercent: 100 }, { xPercent: 0, duration: 1.1, ease: "power2.out" }, 0)
      .fromTo(incoming.firstElementChild, { scaleX: 2.2, scaleY: 1.2, xPercent: -30 }, { scaleX: 1, scaleY: 1, xPercent: 0, duration: 1.1, ease: "power2.out" }, 0);
    const points = root.current?.querySelectorAll(".lower-hotspot");
    if (points?.length) gsap.to(points, { opacity: 0, duration: .4, stagger: .1, ease: "lower-default", onComplete: () => setDetailRoomIndex(index) });
    const description = root.current?.querySelector(".lower-room-description");
    if (description) gsap.to(description, { yPercent: 20, autoAlpha: 0, duration: .4, ease: "lower-default" });
    if (!points?.length) setDetailRoomIndex(index);
  }
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const points = root.current?.querySelectorAll(".lower-hotspot");
      const description = root.current?.querySelector(".lower-room-description");
      if (points?.length) gsap.fromTo(points, { opacity: 0 }, { opacity: 1, duration: .4, stagger: .1, ease: "lower-default", clearProps: "opacity" });
      if (description) gsap.fromTo(description, { yPercent: 20, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .4, ease: "lower-default", clearProps: "all" });
    }, root);
    return () => ctx.revert();
  }, [detailRoomIndex]);
  function positionTooltip(x: number, y: number) {
    if (tooltip.current) gsap.set(tooltip.current, { x, y });
  }
  function moveProgress(direction: number) {
    const track = progressTrack.current;
    if (!track) return;
    const next = Math.max(0, Math.min(content.progress.length - 1, progressIndex + direction));
    const step = (track.children[1] as HTMLElement)?.offsetLeft - (track.children[0] as HTMLElement)?.offsetLeft;
    if (step) {
      // Native mandatory snapping otherwise cancels the intermediate scrollLeft
      // values of the 700ms Swiper-style arrow transition, especially on mobile.
      track.classList.add("is-dragging");
      const restoreSnap = () => track.classList.remove("is-dragging");
      gsap.to(track, { scrollLeft: next * step, duration: .7, ease: "lower-default", overwrite: "auto", onComplete: restoreSnap, onInterrupt: restoreSnap });
    }
  }
  function changeCategory(value: Category) {
    setCategory(value); setRoomIndex(0); setHotspot(null); setActiveAmenity(null);
    window.dispatchEvent(new CustomEvent("category-change", { detail: value }));
  }
  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = `Hello Horizonte Village,\n\nI would like to request a call about ${category}.\n\nName: ${values.get("name")}\nPhone: ${values.get("phone")}`;
    setEmailHref(`mailto:info@horizonte-village.com?subject=${encodeURIComponent("Request a call — Horizonte Village")}&body=${encodeURIComponent(body)}`);
    setRequestReady(true);
  }
  const categorySwitch = <div className="lower-category-switch" aria-label="Property category">{(["villas", "residences"] as const).map(value => <button key={value} onClick={() => changeCategory(value)} aria-pressed={category === value}>{value}</button>)}</div>;

  return <div className="lower-sections" ref={root}>
    <section id="interior" className="lower-interior" data-header-color="light" aria-label="Interiors">
      <div className="lower-room-images"><div className="lower-room-parallax lower-parallax">
        {rooms.map((room, index) => <div key={room.id} className={`lower-room-image ${index === roomIndex ? "is-active" : ""}`} aria-hidden={index !== roomIndex}><div className="lower-room-image-inner"><img src={asset(room.photo.original)} alt={room.photo.alt || room.title} loading="lazy" /></div></div>)}
        <div className="lower-room-shade" />
        <div className="lower-interior-label">{categorySwitch}<span>Interior</span></div>
        {currentRoom.benefits.map((benefit, index) => <div key={benefit.id} className={`lower-hotspot ${hotspot === index ? "is-open" : ""}`} style={{ left: `${benefit.left}%`, top: `${benefit.top}%` }} onPointerEnter={event => { if (event.pointerType === "mouse") { positionTooltip(event.clientX, event.clientY); setHotspot(index); } }} onPointerMove={event => { if (event.pointerType === "mouse") positionTooltip(event.clientX, event.clientY); }} onPointerLeave={event => { if (event.pointerType === "mouse") setHotspot(null); }}>
          <RoundButton label={`Details: ${benefit.title}`} expanded={hotspot === index} controls="lower-room-tooltip" onClick={() => { setHotspot(hotspot === index ? null : index); const point = root.current?.querySelectorAll<HTMLElement>(".lower-hotspot")[index]?.getBoundingClientRect(); if (point) positionTooltip(point.right, point.top); root.current?.querySelectorAll<HTMLElement>(".lower-mobile-benefits > div")[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" }); }}>{hotspot === index ? "−" : "+"}</RoundButton>
        </div>)}
      </div></div>
      <div ref={tooltip} id="lower-room-tooltip" className={`lower-hotspot-tooltip ${hotspot !== null ? "is-open" : ""}`} aria-hidden={hotspot === null}><div className="lower-hotspot-card"><h3>{hotspot !== null ? currentRoom.benefits[hotspot]?.title : ""}</h3><p>{hotspot !== null ? currentRoom.benefits[hotspot]?.description : ""}</p></div></div>
      <div className={`lower-room-navigation ${roomChanging ? "is-changing" : ""}`}>{rooms.map((room, index) => <button key={room.id} className={index === roomIndex ? "is-active" : ""} aria-pressed={index === roomIndex} onClick={() => changeRoom(index)}>{room.title}</button>)}</div>
      {currentRoom.description && <p className="lower-room-description">{currentRoom.description}</p>}
      <div className="lower-mobile-benefits">{currentRoom.benefits.map(benefit => <div key={benefit.id}><h3>{benefit.title}</h3><p>{benefit.description}</p></div>)}</div>
    </section>

    <section id="amenities" className="lower-amenities" data-header-color="dark">
      <h2 className="lower-display lower-amenities-heading lower-reveal">blend <i>of</i> modern amenities designed <i>to</i> enhance lifestyle</h2>
      <div className="lower-amenity-controls"><div>{categorySwitch}<span>Private space</span></div><div className="lower-track-progress"><span style={{ width: `${100 / 3 + amenityProgress * (200 / 3)}%` }} /></div></div>
      <div className="lower-amenities-track" ref={amenitiesTrack} onClickCapture={event => { if (event.detail !== 0 && dragDistance.current > 5) { event.preventDefault(); event.stopPropagation(); dragDistance.current = 0; } }} onScroll={event => { const el = event.currentTarget; const card = el.children[0] as HTMLElement; const visible = window.innerWidth > 1024 ? 3 : 1.26; const active = Math.round(el.scrollLeft / card.offsetWidth); setAmenityProgress(Math.min(1, ((active + 1) / (amenities.length - visible + 1) * 100 - 100 / 3) / (200 / 3))); }}>
        {amenities.map((item, index) => <button className={`lower-amenity ${activeAmenity === index ? "is-active" : ""}`} key={item.id} onClick={() => setActiveAmenity(activeAmenity === index ? null : index)} aria-expanded={activeAmenity === index}>
          <p className="lower-amenity-description">{item.description}</p><div className="lower-amenity-mark" dangerouslySetInnerHTML={{ __html: content.logo }} />
          <div className="lower-amenity-photo"><img src={asset(item.photo.original)} alt={item.photo.alt || item.title} loading="lazy" /></div>
          <div className="lower-amenity-footer"><h3>{item.title}</h3><span className="lower-round">+</span></div>
        </button>)}
      </div>
      <div className="lower-amenity-arrows"><RoundButton label="Previous amenities" onClick={() => amenitiesTrack.current?.scrollBy({ left: -400, behavior: "smooth" })}>←</RoundButton><RoundButton label="Next amenities" onClick={() => amenitiesTrack.current?.scrollBy({ left: 400, behavior: "smooth" })}>→</RoundButton></div>
    </section>

    <InteractivePlan embedded />

    <section id="journal" className="lower-journal" data-header-color="dark">
      <div className="lower-journal-heading"><button className={`lower-display ${journalTab === "guide" ? "is-active" : ""}`} aria-pressed={journalTab === "guide"} onClick={() => setJournalTab("guide")}><span className="lower-reveal">Costa del Sol Guide</span>{" "}<i>and</i></button><button className={`lower-display ${journalTab === "progress" ? "is-active" : ""}`} aria-pressed={journalTab === "progress"} onClick={() => setJournalTab("progress")}><span className="lower-reveal">Construction progress</span></button></div>
      {journalTab === "guide" ? <div className="lower-editorial"><p className="lower-editorial-description">Experience serene mountain living close to the vibrant city for the best of both worlds</p><div className="lower-article-grid">
        {content.articles.map((item, index) => <button className="lower-article" key={index} onClick={() => setArticle(index)}>
          <div className="lower-article-photo"><img src={asset(item.photos[0].original)} alt={`Costa del Sol ${item.tags[0]} guide`} loading="lazy" /></div>
          <h3 dangerouslySetInnerHTML={{ __html: item.title }} /><p className="lower-article-author">— {item.author}, <span>{item.position}</span></p>
          <div className="lower-article-footer"><div className="lower-article-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="lower-round lower-article-open">+</span></div>
        </button>)}
      </div></div> : <div className="lower-progress"><div className="lower-progress-guide">▼</div><div className="lower-progress-slider"><button className="lower-progress-prev" aria-label="Previous construction update" disabled={progressIndex === 0} onClick={() => moveProgress(-1)} /><button className="lower-progress-next" aria-label="Next construction update" disabled={progressIndex === content.progress.length - 1} onClick={() => moveProgress(1)} /><div className="lower-progress-track" ref={progressTrack} onClickCapture={event => { if (event.detail !== 0 && dragDistance.current > 5) { event.preventDefault(); event.stopPropagation(); dragDistance.current = 0; } }} onScroll={event => { const track = event.currentTarget; const first = track.children[0] as HTMLElement, second = track.children[1] as HTMLElement; if (second) setProgressIndex(Math.round(track.scrollLeft / (second.offsetLeft - first.offsetLeft))); }}>{content.progress.map((item, index) => <button className={`lower-progress-card ${progressIndex === index ? "is-active" : ""}`} key={item.id} onClick={() => setProgress(index)}><h3>{item.preview.title}</h3><div><img src={asset(item.preview.photo.original)} alt={item.preview.title} loading="lazy" /><span className="lower-round">+</span><small>{item.details.media.length} photos</small></div><p>{new Date(`${item.preview.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p></button>)}</div></div><div className="lower-progress-guide lower-progress-guide-bottom">▲</div><div className="lower-progress-timeline"><div className="lower-progress-timeline-inner" style={{ transform: `translateX(${-progressIndex * 144 + .5}px)` }}><div className={`lower-progress-timeline-start ${progressIndex === 0 ? "is-active" : ""}`}><span>{new Date(`${content.progress[0].preview.date}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "numeric", year: "2-digit" })}</span></div>{content.progress.slice(1).map((item, index) => <div key={item.id} className={`lower-progress-timeline-segment ${progressIndex === index + 1 ? "is-active" : ""}`}>{Array.from({ length: 16 }, (_, n) => <i key={n} />)}<span>{new Date(`${item.preview.date}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "numeric", year: "2-digit" })}</span></div>)}</div></div></div>}
    </section>

    <section id="contact" className={`lower-feedback ${journalTab === "guide" ? "is-cut" : ""}`} data-header-color="light">
      <div className="lower-feedback-photo"><img className="lower-parallax" src="/reference-assets/Gen_plan_1_c41a75f279_8f2ed8588a.webp" alt="Horizonte Village nestled in the hills of Mijas" loading="lazy" /></div>
      <div id="contact-form" className="lower-contact-form">
        <h2 className="lower-display lower-form-title lower-reveal">Trust us <i>to</i> guide <i>you</i></h2>
        <div className="lower-form-description"><p>Our specialist will contact you as soon as possible.</p><p className="lower-display"><i>to your</i><br />future home</p></div>
        <form onSubmit={submitRequest}><label><span className="lower-sr-only">Your name</span><input name="name" placeholder="Type your Name..." autoComplete="name" required minLength={2} /></label><label><span className="lower-sr-only">Your phone number</span><input name="phone" type="tel" placeholder="Your Phone Number..." autoComplete="tel" required minLength={4} /></label><button type="submit" className="lower-request-button">Request</button></form>
        {requestReady && <p className="lower-request-ready" role="status">Your request is prepared locally and has not been sent. <a href={emailHref}>Send it through your email app ↗</a></p>}
        <p className="lower-form-disclaimer">By sending your request, you&apos;re agreeing to our <a href="/privacy-policy">privacy policy</a>. We promise to keep your personal information safe and secure.</p>
      </div>
    </section>

    <footer className="lower-footer" data-header-color="light"><div className="lower-footer-top"><p>Contact<br /><span>Sales office</span></p><div><a className="lower-footer-phone" href="tel:+34951870700">+34 (951) 870-700</a><a className="lower-footer-email" href="mailto:info@horizonte-village.com">info@horizonte-village.com</a></div></div><a href="#home" className="lower-footer-logo" aria-label="Back to top" dangerouslySetInnerHTML={{ __html: content.logo }} /><div className="lower-footer-bottom"><div><p className="lower-footer-address">Mijas, Malaga, Spain</p><div className="lower-socials"><a className="lower-pill" href="https://maps.app.goo.gl/o7gUF37F7n7ttuNx6" target="_blank" rel="noreferrer">See on map ↗</a><a className="lower-round" href="https://www.facebook.com/profile.php?id=61562396430757" aria-label="Facebook" target="_blank" rel="noreferrer"><img src="/reference-assets/facebook_5788af98af.svg" alt="" /></a><a className="lower-round" href="https://www.instagram.com/horizonte.village" aria-label="Instagram" target="_blank" rel="noreferrer"><img src="/reference-assets/instagram_3a032063b5.svg" alt="" /></a><a className="lower-round" href="https://wa.me/+34951870700" aria-label="WhatsApp" target="_blank" rel="noreferrer"><img src="/reference-assets/whatsapp_a6d988a847.svg" alt="" /></a></div></div><div className="lower-footer-select"><a className="lower-pill" href="/selection?category=villas">Select villas ↗</a><a className="lower-pill" href="/selection?category=residences">Select residences ↗</a></div></div><div className="lower-copyright"><p>©Horizonte — {new Date().getFullYear()} all rights reserved</p><div><a href="/privacy-policy">Privacy policy</a><a href="/terms-of-use">Terms of use</a></div><p>Made by <a href="https://thefirstthelast.agency/" target="_blank" rel="noreferrer">The first the last</a></p></div></footer>

    {article !== null && <div className="lower-modal" role="dialog" aria-modal="true" aria-label="Costa del Sol guide"><button className="lower-modal-backdrop" aria-label="Close article" onClick={() => setArticle(null)} /><article className="lower-article-modal"><RoundButton label="Close article" className="lower-modal-close" onClick={() => setArticle(null)}>×</RoundButton><h2 className="lower-display" dangerouslySetInnerHTML={{ __html: content.articles[article].title }} /><p className="lower-article-author">— {content.articles[article].author}, {content.articles[article].position}</p><div className="lower-article-modal-text" dangerouslySetInnerHTML={{ __html: content.articles[article].text }} />{content.articles[article].photos.map((photo, index) => <img key={index} src={asset(photo.original)} alt={photo.alt || "Costa del Sol"} loading="lazy" />)}<button className="lower-pill" onClick={() => { setArticle(null); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>Request a call ↗</button></article></div>}
    {progress !== null && <div className="lower-modal" role="dialog" aria-modal="true" aria-label="Construction progress"><button className="lower-modal-backdrop" aria-label="Close construction progress" onClick={() => setProgress(null)} /><article className="lower-article-modal"><RoundButton label="Close construction progress" className="lower-modal-close" onClick={() => setProgress(null)}>×</RoundButton><h2 className="lower-display" dangerouslySetInnerHTML={{ __html: content.progress[progress].details.title }} />{content.progress[progress].details.media.map((media, index) => <img key={index} src={asset(media.original)} alt="Construction progress at Horizonte Village" />)}</article></div>}
  </div>;
}
