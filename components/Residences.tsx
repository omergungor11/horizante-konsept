"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveButton from "./WaveButton";
import "./residences.css";

type Category = "villas" | "residences";
const exteriorPhotos = [
  {
    "src": "/reference-assets/Villa_e296e3f0dc_13_47_39_afb9006789.webp",
    "alt": "View from 1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/1_floor_villa_night_rose_sky_eeca58ca64_f90dd80d3d.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/2_floors_villa_road_ba04a652e1_c44fbc0e7a.webp",
    "alt": "2 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/Back_villa_9ce76d4030_854e522308.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/1_floor_villa_44f9dab1b8_61b5bf9247.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/2_floor_villa_14f51c9970_04e6d564f7.webp",
    "alt": "2 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/Sunrise_residences_01c0436df2_560ad987a3.webp",
    "alt": "Residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/Penthouse_2234957cd2_4fc5bf010c.webp",
    "alt": "Seaview from residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/Residences_block_2_37ee8a5803_6b044d0b5d.webp",
    "alt": "Residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/1_no_m_508a82df02_8b04b915e9.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/3_2c32d9084a_16e0e4a7b7.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/4_569726825a_d0af65ec20.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/6_no_woman_4adabb4cd5_1fec58f525.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/7_0b6f504f75_601a930745.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  }
];
const places = [
  {
    "id": 1,
    "title": "Malaga Airport (AGP)",
    "distance": "17",
    "text": "min drive by car",
    "src": "/reference-assets/malaga_airport_800px_opt_808fb16555_c2f41566df.webp",
    "x": 13.958333333333334,
    "y": 46.50349650349651
  },
  {
    "id": 2,
    "title": "Malaga Train Station \u201cMaria Zambrano\u201d",
    "distance": "25",
    "text": "min drive by car",
    "src": "/reference-assets/maria_zambrano_train_platform_min_91f4b1669e_5c2669fee7.webp",
    "x": 12.083333333333334,
    "y": 45.54195804195804
  },
  {
    "id": 7,
    "title": "Playa De Carvajal",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/2239019114b65704ffbb9877c7699b62_c6d9cd1aa8_13_41_22_1c1d864bcf.webp",
    "x": 32.013888888888886,
    "y": 42.74475524475525
  },
  {
    "id": 8,
    "title": "Golf Torrequebrada",
    "distance": "15",
    "text": "min drive by car",
    "src": "/reference-assets/img_3931_1309042857_64f7af6688_01a515ee63.webp",
    "x": 29.166666666666668,
    "y": 42.30769230769231
  },
  {
    "id": 11,
    "title": "QuironSalud Fuengirola",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/image00007_95cae00a26_00a61116bc.webp",
    "x": 37.84722222222222,
    "y": 45.54195804195804
  },
  {
    "id": 12,
    "title": "Shopping Mall Miramar",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/shopping_centre_miramar_8dbc2fe9b3_13_41_22_cc1c3c3548.webp",
    "x": 42.22222222222222,
    "y": 47.81468531468531
  },
  {
    "id": 14,
    "title": "Marbella",
    "distance": "20",
    "text": "min drive by car",
    "src": "/reference-assets/marbella_club_beach_37a76796fc_ae996b9e31.webp",
    "x": 49.30555555555556,
    "y": 50.0
  },
  {
    "id": 6,
    "title": "Restaurant SOLLO (One Michelin Star)",
    "distance": "5",
    "text": "min drive by car",
    "src": "/reference-assets/sollo_FIL_Eminimizer_f3e7cf10c5_13_41_22_297995cc41.webp",
    "x": 33.125,
    "y": 42.91958041958042
  },
  {
    "id": 3,
    "title": "Malaga Fortress \u201cAlcazaba\u201d",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/MVC_110390222_Gibralfaro_Malaga_Andalucia_com_d950c33a29_d18c04c920.webp",
    "x": 7.916666666666666,
    "y": 47.63986013986014
  },
  {
    "id": 4,
    "title": "Malaga Museum of Pablo Picasso",
    "distance": "35",
    "text": " min drive by car",
    "src": "/reference-assets/HOME_01_2448_X1440_7f2a58901a_8311246d59_af0ced3ef4.webp",
    "x": 5.555555555555555,
    "y": 46.32867132867133
  },
  {
    "id": 5,
    "title": "Outlet Village \u201cPlaza Mayor\u201d",
    "distance": "15",
    "text": "min drive by car",
    "src": "/reference-assets/plazamayor_ku6_D_U904746647790w_G_1248x770_Diario_Sur_acdb85fb3b_13_41_22_ddb2b943fb.webp",
    "x": 14.444444444444443,
    "y": 45.10489510489511
  },
  {
    "id": 9,
    "title": "Butterfly Park Benalmadena",
    "distance": "5",
    "text": "min drive by car",
    "src": "/reference-assets/2515_1484165511_ca9c276fee_ce7e420ef2.webp",
    "x": 30.416666666666664,
    "y": 45.8041958041958
  },
  {
    "id": 10,
    "title": "Golf Club Villa Padierna",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/06a7de67cb8cbe61de13d2bb08397804_1_1_5684c439fd.webp",
    "x": 52.77777777777778,
    "y": 50.349650349650354
  },
  {
    "id": 13,
    "title": "Theme Park \u201cAventura Amazonia\u201d",
    "distance": "20",
    "text": "min drive by car",
    "src": "/reference-assets/5_1_8317017151_3de2475fc1.webp",
    "x": 47.36111111111111,
    "y": 49.21328671328671
  },
  {
    "id": 15,
    "title": "Marbella Club Hotel",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/mch_mar_2018347_a1_opt_wide_7ff23d4bb5_5f79b7f80e.webp",
    "x": 50.97222222222222,
    "y": 51.048951048951054
  },
  {
    "id": 16,
    "title": "Puente Romano resort",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/sea_grill_swimming_pool_d36d35a987_a8c82fa0f1.webp",
    "x": 51.31944444444444,
    "y": 52.09790209790209
  },
  {
    "id": 17,
    "title": "Puerto Banus",
    "distance": "35",
    "text": "min drive by car",
    "src": "/reference-assets/346109_Puerto_Banus_Marina_252ecd6acf_13_41_22_7ab61acfe6.webp",
    "x": 54.02777777777777,
    "y": 51.48601398601399
  },
  {
    "id": 18,
    "title": "Zoo Selwo Aventura",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/selwo_pack_78ce90cfd6_e4bea37c34.webp",
    "x": 52.63888888888889,
    "y": 51.83566433566433
  },
  {
    "id": 19,
    "title": "Estepona",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/arc_25058_g_51044a4fbb.webp",
    "x": 62.56944444444444,
    "y": 50.349650349650354
  },
  {
    "id": 20,
    "title": "Sotogrande",
    "distance": "1",
    "text": "hour drive by car",
    "src": "/reference-assets/147433_076c6b839a_13_41_22_fbb6cc1123.webp",
    "x": 75.0,
    "y": 45.19230769230769
  },
  {
    "id": 21,
    "title": "Gibraltar",
    "distance": "70",
    "text": "min drive by car",
    "src": "/reference-assets/aerial_view_of_our_marina_5c64199633_522276e01f.webp",
    "x": 80.34722222222223,
    "y": 41.43356643356643
  },
  {
    "id": 22,
    "title": "Tarifa",
    "distance": "85",
    "text": "min drive by car",
    "src": "/reference-assets/gr_cms_media_featured_images_playas_de_tarifa_f00c1559_6111_4501_a819_edc6d348ae8e_portada_4e622ad4c8_13_41_22_cab5fd63c4.webp",
    "x": 93.61111111111111,
    "y": 41.43356643356643
  }
];
const mapRoutes = [{"id": 1, "viewBox": "0 0 254 31", "d": "M253 11L245.469 3.82777C243.841 2.27749 241.256 2.37257 239.747 4.03824L217.138 28.986C215.33 30.9804 212.109 30.6564 210.734 28.3421L204.409 17.6886C204.139 17.2341 203.782 16.8375 203.358 16.5219L183.919 2.0561C183.015 1.38346 181.87 1.1232 180.764 1.3393L140.5 9.20833L106.815 12.3763C105.961 12.4566 105.104 12.2601 104.37 11.8159L89.1825 2.6236C87.6073 1.6702 85.5848 1.91522 84.2828 3.21717L78.2353 9.26469C77.1706 10.3294 75.5983 10.706 74.1668 10.2392L54.702 3.89196C53.9197 3.63687 53.0778 3.62923 52.2911 3.87008L30.2468 10.6183C29.4366 10.8664 28.7261 11.3653 28.2177 12.0431L20.9031 21.7959C20.321 22.5721 19.4765 23.1102 18.5271 23.3101L1 27"}, {"id": 2, "viewBox": "0 0 318 51", "d": "M317 11L309.469 3.82777C307.841 2.27749 305.256 2.37257 303.747 4.03824L281.138 28.986C279.33 30.9804 276.109 30.6564 274.734 28.3421L268.409 17.6886C268.139 17.2341 267.782 16.8375 267.358 16.5219L247.919 2.0561C247.015 1.38346 245.87 1.1232 244.764 1.3393L204.5 9.20833L170.815 12.3763C169.961 12.4566 169.104 12.2601 168.37 11.8159L153.182 2.6236C151.607 1.6702 149.585 1.91522 148.283 3.21717L142.235 9.26469C141.171 10.3294 139.598 10.706 138.167 10.2392L118.702 3.89196C117.92 3.63687 117.078 3.62923 116.291 3.87008L94.2468 10.6183C93.4366 10.8664 92.7261 11.3653 92.2177 12.0431L84.5476 22.2698C84.1872 22.7504 83.7231 23.1437 83.1899 23.4204L32.8216 49.5548C31.678 50.1482 30.3187 50.1544 29.1698 49.5716L3.21609 36.4067C0.356758 34.9563 0.280339 30.8998 3.08302 29.3428L5.5 28"}, {"id": 3, "viewBox": "0 0 342 51", "d": "M341 11L333.469 3.82777C331.841 2.27749 329.256 2.37257 327.747 4.03824L305.138 28.986C303.33 30.9804 300.109 30.6564 298.734 28.3421L292.409 17.6886C292.139 17.2341 291.782 16.8375 291.358 16.5219L271.919 2.0561C271.015 1.38346 269.87 1.1232 268.764 1.3393L228.5 9.20833L194.815 12.3763C193.961 12.4566 193.104 12.2601 192.37 11.8159L177.182 2.6236C175.607 1.6702 173.585 1.91522 172.283 3.21717L166.235 9.26469C165.171 10.3294 163.598 10.706 162.167 10.2392L142.702 3.89196C141.92 3.63687 141.078 3.62923 140.291 3.87008L118.247 10.6183C117.437 10.8664 116.726 11.3653 116.218 12.0431L108.548 22.2698C108.187 22.7504 107.723 23.1437 107.19 23.4204L56.8216 49.5548C55.678 50.1482 54.3187 50.1544 53.1698 49.5716L21.3784 33.4456C20.8017 33.153 20.306 32.7229 19.9352 32.1931V32.1931C18.4533 30.0761 15.3676 29.9385 13.7031 31.9151L10.4848 35.7368C9.56577 36.8282 8.13503 37.3474 6.73 37.0994L0.5 36"}, {"id": 4, "viewBox": "0 0 380 51", "d": "M379 11L371.469 3.82777C369.841 2.27749 367.256 2.37257 365.747 4.03824L343.138 28.986C341.33 30.9804 338.109 30.6564 336.734 28.3421L330.409 17.6886C330.139 17.2341 329.782 16.8375 329.358 16.5219L309.919 2.0561C309.015 1.38346 307.87 1.1232 306.764 1.3393L266.5 9.20833L232.815 12.3763C231.961 12.4566 231.104 12.2601 230.37 11.8159L215.182 2.6236C213.607 1.6702 211.585 1.91522 210.283 3.21717L204.235 9.26469C203.171 10.3294 201.598 10.706 200.167 10.2392L180.702 3.89196C179.92 3.63687 179.078 3.62923 178.291 3.87008L156.247 10.6183C155.437 10.8664 154.726 11.3653 154.218 12.0431L146.548 22.2698C146.187 22.7504 145.723 23.1437 145.19 23.4204L94.8216 49.5548C93.678 50.1482 92.3187 50.1544 91.1698 49.5716L59.3784 33.4456C58.8017 33.153 58.306 32.7229 57.9352 32.1931V32.1931C56.4533 30.0761 53.3676 29.9385 51.7031 31.9151L48.4848 35.7368C47.5658 36.8282 46.135 37.3474 44.73 37.0994L38.5 36L12.8728 33.1525C11.9834 33.0537 11.0865 33.256 10.3256 33.727L1 39.5"}, {"id": 5, "viewBox": "0 0 249 31", "d": "M248 11L240.469 3.82777C238.841 2.27749 236.256 2.37257 234.747 4.03824L212.138 28.986C210.33 30.9804 207.109 30.6564 205.734 28.3421L199.409 17.6886C199.139 17.2341 198.782 16.8375 198.358 16.5219L178.919 2.0561C178.015 1.38346 176.87 1.1232 175.764 1.3393L135.5 9.20833L101.815 12.3763C100.961 12.4566 100.104 12.2601 99.3697 11.8159L84.1825 2.6236C82.6073 1.6702 80.5848 1.91522 79.2828 3.21717L73.2353 9.26469C72.1706 10.3294 70.5983 10.706 69.1668 10.2392L49.702 3.89196C48.9197 3.63687 48.0778 3.62923 47.2911 3.87008L25.2468 10.6183C24.4366 10.8664 23.7261 11.3653 23.2177 12.0431L18.3922 18.4771C16.7363 20.685 13.3948 20.5922 11.864 18.2959L8.21971 12.8296C8.07359 12.6104 7.90619 12.4062 7.71993 12.2199L1.5 6"}, {"id": 6, "viewBox": "0 0 25 18", "d": "M25 17H4.10908C2.84956 17 1.73135 16.194 1.33305 14.9992V14.9992C0.859498 13.5785 1.53494 12.0296 2.89821 11.4099L10.2726 8.05793C11.0688 7.69598 11.7245 7.083 12.1392 6.31286L15 1"}, {"id": 7, "viewBox": "0 0 25 12", "d": "M25 11H4.10908C2.84956 11 1.73135 10.194 1.33305 8.99915V8.99915C0.859498 7.5785 1.53494 6.02957 2.89821 5.4099L11.5 1.5"}, {"id": 8, "viewBox": "0 0 50 9", "d": "M48.5 7.5L44.8702 2.78128C44.0193 1.67508 42.6533 1.09236 41.2659 1.24372L16.6133 3.93309C16.2068 3.97744 15.796 3.9592 15.395 3.87901L1 1"}, {"id": 9, "viewBox": "0 0 17 9", "d": "M15.5 7.5L12.3456 3.39926C11.2539 1.98003 9.35199 1.4592 7.68952 2.12419L0.5 5"}, {"id": 10, "viewBox": "0 0 249 70", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L181.473 46.6782C182.14 47.212 182.619 47.9454 182.839 48.7711L185.902 60.2577C186.272 61.6443 187.356 62.7266 188.743 63.0938L202.303 66.6832C203.083 66.8896 203.907 66.8554 204.667 66.5852L224.636 59.4851C225.517 59.1716 226.481 59.1771 227.359 59.5005L235.5 62.5L248 68.5"}, {"id": 11, "viewBox": "0 0 17 9", "d": "M16 7.5L12.8456 3.39926C11.7539 1.98003 9.85199 1.4592 8.18952 2.12419L1 5"}, {"id": 12, "viewBox": "0 0 77 49", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H76.5"}, {"id": 13, "viewBox": "0 0 155 55", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.858 44.7754C126.283 44.9241 126.73 45 127.18 45H154.5"}, {"id": 14, "viewBox": "0 0 184 55", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L182.5 47.5"}, {"id": 15, "viewBox": "0 0 211 75", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L181.473 46.6782C182.14 47.212 182.619 47.9454 182.839 48.7711L185.902 60.2577C186.272 61.6443 187.356 62.7266 188.743 63.0938L202.374 66.702C203.109 66.8966 203.774 67.2968 204.29 67.8557L209.5 73.5"}, {"id": 16, "viewBox": "0 0 204 68", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L181.473 46.6782C182.14 47.212 182.619 47.9454 182.839 48.7711L185.902 60.2577C186.272 61.6443 187.356 62.7266 188.743 63.0938L203.5 67"}, {"id": 17, "viewBox": "0 0 236 68", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L181.473 46.6782C182.14 47.212 182.619 47.9454 182.839 48.7711L185.902 60.2577C186.272 61.6443 187.356 62.7266 188.743 63.0938L202.303 66.6832C203.083 66.8896 203.907 66.8554 204.667 66.5852L224.636 59.4851C225.517 59.1716 226.481 59.1771 227.359 59.5005L235.5 62.5L248.5 67"}, {"id": 18, "viewBox": "0 0 249 68", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.718 44.7261C126.234 44.9068 126.781 44.9797 127.327 44.9403L173.437 41.6128C174.442 41.5403 175.437 41.8496 176.224 42.4789L181.473 46.6782C182.14 47.212 182.619 47.9454 182.839 48.7711L185.902 60.2577C186.272 61.6443 187.356 62.7266 188.743 63.0938L202.303 66.6832C203.083 66.8896 203.907 66.8554 204.667 66.5852L224.636 59.4851C225.517 59.1716 226.481 59.1771 227.359 59.5005L235.5 62.5"}, {"id": 19, "viewBox": "0 0 370 61", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.777 44.7469C126.255 44.9141 126.76 44.9891 127.266 44.9679L209.076 41.5387C209.684 41.5132 210.29 41.6267 210.847 41.8706L218 45L230.253 50.1839C230.746 50.3925 231.276 50.5 231.811 50.5H260.718C261.552 50.5 262.365 50.7605 263.043 51.2451L267.957 54.7549C268.635 55.2395 269.448 55.5 270.282 55.5H321.94C322.311 55.5 322.681 55.5518 323.039 55.6539L335.961 59.3461C336.319 59.4482 336.689 59.5 337.06 59.5H369.5"}, {"id": 20, "viewBox": "0 0 554 64", "d": "M1 1L9.01223 11.8401C9.33406 12.2755 9.74094 12.641 10.2082 12.9146L27.6826 23.1434C29.0842 23.9639 30.8429 23.8554 32.1331 22.8688L33.6194 21.7323C35.9165 19.9756 39.2612 21.162 39.9381 23.9735L44.9203 44.6688C44.9733 44.8891 45.0472 45.1039 45.141 45.3102V45.3102C46.2313 47.7089 49.4561 48.1392 51.1372 46.1102L59.4769 36.0452C60.875 34.3578 63.3705 34.1095 65.0737 35.4883L71.3993 40.609C72.1115 41.1855 72.9999 41.5 73.9161 41.5H75.2505C76.0641 41.5 76.8584 41.7481 77.5273 42.2112L93.7791 53.4625C95.1211 54.3915 96.8928 54.412 98.2559 53.5144L114.847 42.5886C115.889 41.9026 117.191 41.7418 118.368 42.1539L125.777 44.7469C126.255 44.9141 126.76 44.9891 127.266 44.9679L209.076 41.5387C209.684 41.5132 210.29 41.6267 210.847 41.8706L218 45L230.253 50.1839C230.746 50.3925 231.276 50.5 231.811 50.5H260.718C261.552 50.5 262.365 50.7605 263.043 51.2451L267.957 54.7549C268.635 55.2395 269.448 55.5 270.282 55.5H321.94C322.311 55.5 322.681 55.5518 323.039 55.6539L335.961 59.3461C336.319 59.4482 336.689 59.5 337.06 59.5H368.492C369.153 59.5 369.805 59.6643 370.388 59.9781L374.931 62.4242C375.628 62.7996 376.421 62.9597 377.209 62.8841L411.823 59.5649C412.271 59.5219 412.709 59.4037 413.117 59.215L424.702 53.8682C425.228 53.6256 425.8 53.5 426.379 53.5H433.594C434.19 53.5 434.779 53.3666 435.318 53.1096L488.702 27.6198C489.541 27.2192 490.493 27.1234 491.396 27.3489L499.093 29.2733C499.69 29.4224 500.312 29.4321 500.913 29.3015L511.5 27L523.806 23.4841C524.885 23.1757 526.045 23.3352 527.001 23.9236L529.979 25.7564C531.225 26.5231 532.79 26.5485 534.06 25.8228L538.521 23.2738C538.839 23.0921 539.18 22.955 539.535 22.8662L548.938 20.5156C550.227 20.1932 551.272 19.2513 551.727 18.002L553 14.5"}, {"id": 21, "viewBox": "0 0 638 88", "d": "M1 25L9.01223 35.8401C9.33406 36.2755 9.74094 36.641 10.2082 36.9146L27.6826 47.1434C29.0842 47.9639 30.8429 47.8554 32.1331 46.8688L33.6194 45.7323C35.9165 43.9756 39.2612 45.162 39.9381 47.9735L44.9203 68.6688C44.9733 68.8891 45.0472 69.1039 45.141 69.3102V69.3102C46.2313 71.7089 49.4561 72.1392 51.1372 70.1102L59.4769 60.0452C60.875 58.3578 63.3705 58.1095 65.0737 59.4883L71.3993 64.609C72.1115 65.1855 72.9999 65.5 73.9161 65.5H75.2505C76.0641 65.5 76.8584 65.7481 77.5273 66.2112L93.7791 77.4625C95.1211 78.3915 96.8928 78.412 98.2559 77.5144L114.847 66.5886C115.889 65.9026 117.191 65.7418 118.368 66.1539L125.777 68.7469C126.255 68.9141 126.76 68.9891 127.266 68.9679L209.076 65.5387C209.684 65.5132 210.29 65.6267 210.847 65.8706L218 69L230.253 74.1839C230.746 74.3925 231.276 74.5 231.811 74.5H260.718C261.552 74.5 262.365 74.7605 263.043 75.2451L267.957 78.7549C268.635 79.2395 269.448 79.5 270.282 79.5H321.94C322.311 79.5 322.681 79.5518 323.039 79.6539L335.961 83.3461C336.319 83.4482 336.689 83.5 337.06 83.5H368.492C369.153 83.5 369.805 83.6643 370.388 83.9781L374.931 86.4242C375.628 86.7996 376.421 86.9597 377.209 86.8841L411.823 83.5649C412.271 83.5219 412.709 83.4037 413.117 83.215L424.702 77.8682C425.228 77.6256 425.8 77.5 426.379 77.5H433.594C434.19 77.5 434.779 77.3666 435.318 77.1096L488.702 51.6198C489.541 51.2192 490.493 51.1234 491.396 51.3489L499.093 53.2733C499.69 53.4224 500.312 53.4321 500.913 53.3015L511.5 51L523.806 47.4841C524.885 47.1757 526.045 47.3352 527.001 47.9236L529.979 49.7564C531.225 50.5231 532.79 50.5485 534.06 49.8228L538.521 47.2738C538.839 47.0921 539.18 46.955 539.535 46.8662L548.938 44.5156C550.227 44.1932 551.272 43.2513 551.727 42.002L552.273 40.498C552.728 39.2487 553.773 38.3068 555.062 37.9844L567.078 34.9805C568.289 34.6777 569.572 34.9577 570.547 35.7376L571.987 36.8897C573.213 37.8702 574.899 38.0433 576.298 37.3321L604.5 23L622.334 10.9502C622.773 10.6531 623.268 10.4464 623.789 10.3423L631.812 8.73752C632.587 8.58264 633.298 8.20202 633.856 7.64362L635.328 6.17157C636.079 5.42143 636.5 4.40401 636.5 3.34315V0"}, {"id": 22, "viewBox": "0 0 822 93", "d": "M1 30L9.01223 40.8401C9.33406 41.2755 9.74094 41.641 10.2082 41.9146L27.6826 52.1434C29.0842 52.9639 30.8429 52.8554 32.1331 51.8688L33.6194 50.7323C35.9165 48.9756 39.2612 50.162 39.9381 52.9735L44.9203 73.6688C44.9733 73.8891 45.0472 74.1039 45.141 74.3102V74.3102C46.2313 76.7089 49.4561 77.1392 51.1372 75.1102L59.4769 65.0452C60.875 63.3578 63.3705 63.1095 65.0737 64.4883L71.3993 69.609C72.1115 70.1855 72.9999 70.5 73.9161 70.5H75.2505C76.0641 70.5 76.8584 70.7481 77.5273 71.2112L93.7791 82.4625C95.1211 83.3915 96.8928 83.412 98.2559 82.5144L114.847 71.5886C115.889 70.9026 117.191 70.7418 118.368 71.1539L125.777 73.7469C126.255 73.9141 126.76 73.9891 127.266 73.9679L209.076 70.5387C209.684 70.5132 210.29 70.6267 210.847 70.8706L218 74L230.253 79.1839C230.746 79.3925 231.276 79.5 231.811 79.5H260.718C261.552 79.5 262.365 79.7605 263.043 80.2451L267.957 83.7549C268.635 84.2395 269.448 84.5 270.282 84.5H321.94C322.311 84.5 322.681 84.5518 323.039 84.6539L335.961 88.3461C336.319 88.4482 336.689 88.5 337.06 88.5H368.492C369.153 88.5 369.805 88.6643 370.388 88.9781L374.931 91.4242C375.628 91.7996 376.421 91.9597 377.209 91.8841L411.823 88.5649C412.271 88.5219 412.709 88.4037 413.117 88.215L424.702 82.8682C425.228 82.6256 425.8 82.5 426.379 82.5H433.594C434.19 82.5 434.779 82.3666 435.318 82.1096L488.702 56.6198C489.541 56.2192 490.493 56.1234 491.396 56.3489L499.093 58.2733C499.69 58.4224 500.312 58.4321 500.913 58.3015L511.5 56L523.806 52.4841C524.885 52.1757 526.045 52.3352 527.001 52.9236L529.979 54.7564C531.225 55.5231 532.79 55.5485 534.06 54.8228L538.521 52.2738C538.839 52.0921 539.18 51.955 539.535 51.8662L548.938 49.5156C550.227 49.1932 551.272 48.2513 551.727 47.002L552.273 45.498C552.728 44.2487 553.773 43.3068 555.062 42.9844L567.078 39.9805C568.289 39.6777 569.572 39.9577 570.547 40.7376L571.987 41.8897C573.213 42.8702 574.899 43.0433 576.298 42.3321L604.5 28L622.334 15.9502C622.773 15.6531 623.268 15.4464 623.789 15.3423L631.812 13.7375C632.587 13.5826 633.298 13.202 633.856 12.6436L635.968 10.5323C636.309 10.1915 636.5 9.72921 636.5 9.24721V9.24721C636.5 7.64839 638.416 6.82865 639.572 7.9326L647.5 15.5L660.272 27.3258C660.75 27.7686 661.329 28.0878 661.959 28.2557L676 32L683.76 34.1555C684.566 34.3795 685.281 34.8517 685.804 35.5051V35.5051C686.56 36.45 687.704 37 688.914 37H694L709.615 35.5361C709.871 35.5121 710.124 35.4635 710.371 35.391L725.637 30.9008C726.519 30.6415 727.284 30.0867 727.805 29.3295L731.308 24.2339C732.054 23.1485 733.287 22.5 734.604 22.5H737.08C738.568 22.5 739.933 21.6741 740.623 20.356L744.401 13.1441C744.79 12.4003 745.404 11.7979 746.155 11.4224L748.655 10.1723C748.885 10.0577 749.102 9.92134 749.305 9.76509L754.772 5.56034C755.251 5.19159 755.808 4.93634 756.4 4.8138L769.698 2.06255C769.899 2.02091 770.103 1.99485 770.308 1.98458L789.267 1.03664C789.752 1.01242 790.237 1.07654 790.698 1.22587L806.09 6.20553C806.688 6.39911 807.324 6.44888 807.945 6.3508L815.519 5.15495C816.163 5.0532 816.773 4.79535 817.295 4.4039L820.5 2"}];
const quote = "\u201cEach residence is strategically positioned to maximize these stunning views, allowing residents to admire the rolling hills, verdant forests, and towering peaks that paint a mesmerizing backdrop to their daily lives.\u201d";
const architectureDescription = "From every vantage point within the property, residents are treated to a visual symphony of nature's beauty that constantly evolves with the changing colors of the sky and seasons. Embrace the harmonious blend of city convenience and mountain tranquility while reveling in the awe-inspiring landscapes that stretch out before you.";
const panoramaUrl = "https://momento360.com/e/u/9cf81dc3f1304e99a159f7f561782bfc?utm_campaign=embed&utm_source=other&heading=-16.4&pitch=3.4&field-of-view=100&size=medium&display-plan=true";

function MapPin() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M11.5 4.50035C11.5001 3.82945 11.3073 3.17267 10.9447 2.60822C10.5821 2.04377 10.0648 1.59543 9.45463 1.3166C8.84442 1.03777 8.16692 0.940193 7.50283 1.03549C6.83873 1.13079 6.21602 1.41495 5.70885 1.85414C5.20167 2.29332 4.83141 2.86901 4.64215 3.51266C4.45289 4.15631 4.45261 4.8408 4.64135 5.4846C4.83008 6.12841 5.19987 6.7044 5.70669 7.144C6.2135 7.58359 6.83598 7.86826 7.5 7.9641V14.5004C7.5 14.633 7.55268 14.7601 7.64645 14.8539C7.74021 14.9477 7.86739 15.0004 8 15.0004C8.13261 15.0004 8.25979 14.9477 8.35355 14.8539C8.44732 14.7601 8.5 14.633 8.5 14.5004V7.9641C9.33245 7.84277 10.0935 7.42613 10.6443 6.79024C11.195 6.15434 11.4987 5.3416 11.5 4.50035ZM8 7.00035C7.50555 7.00035 7.0222 6.85373 6.61107 6.57903C6.19995 6.30432 5.87952 5.91388 5.6903 5.45706C5.50108 5.00025 5.45157 4.49758 5.54804 4.01263C5.6445 3.52768 5.8826 3.08222 6.23223 2.73259C6.58186 2.38296 7.02732 2.14485 7.51227 2.04839C7.99723 1.95193 8.49989 2.00144 8.95671 2.19065C9.41352 2.37987 9.80397 2.70031 10.0787 3.11143C10.3534 3.52255 10.5 4.0059 10.5 4.50035C10.5 4.82866 10.4353 5.15375 10.3097 5.45706C10.1841 5.76038 9.99991 6.03597 9.76777 6.26812C9.53562 6.50027 9.26002 6.68442 8.95671 6.81005C8.65339 6.93569 8.3283 7.00035 8 7.00035Z" fill="currentColor" /></svg>;
}

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" style={{ transform: back ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1" /></svg>;
}

export default function Residences() {
  const [category, setCategory] = useState<Category>("villas");
  const [slide, setSlide] = useState(0);
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [panorama, setPanorama] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const previousSlide = useRef(0);
  const galleryTween = useRef<gsap.core.Timeline | null>(null);
  const [galleryInteracted, setGalleryInteracted] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLElement>(null);
  const panoramaCursor = useRef<HTMLSpanElement>(null);
  const mapTouch = useRef<{ x: number; offset: number } | null>(null);
  const mapOffset = useRef(0);
  const placeTrack = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panoramaFrame = useRef<HTMLIFrameElement>(null);
  const panoramaTrigger = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number; startedAt: number } | null>(null);
  const [panOffset, setPanOffset] = useState(50);
  const panDrag = useRef<{ x: number; offset: number; moved: boolean } | null>(null);
  const suppressPanClick = useRef(false);
  const suppressCardClick = useRef(false);
  const mapDrag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const photos = exteriorPhotos.filter(photo => photo.type === category);

  useEffect(() => {
    const change = (event: Event) => {
      const raw = (event as CustomEvent).detail;
      const value = typeof raw === "string" ? raw : raw?.category;
      if (value === "villas" || value === "residences") { setCategory(value); setSlide(0); }
    };
    window.addEventListener("category-change", change);
    return () => window.removeEventListener("category-change", change);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create("res-swiper-ease", ".25,.1,.25,1");
    CustomEase.create("res-default-ease", ".16,1,.3,1");
    const slides = photoRef.current?.querySelectorAll<HTMLElement>(".res-gallery-slide");
    if (!slides?.length) return;
    galleryTween.current?.kill();
    slides.forEach((element, index) => {
      const progress = slide - index;
      const inner = element.querySelector(".res-photo-layer");
      gsap.set(element, { xPercent: (index - slide) * 100, zIndex: -Math.abs(progress) + 1 });
      gsap.set(inner, { xPercent: progress * 50, scaleX: 1 + Math.abs(progress) * 1.2, scaleY: 1 + Math.abs(progress) * .2, transformOrigin: progress > 0 ? "right center" : "left center" });
    });
    previousSlide.current = slide;
  }, [category]);

  useLayoutEffect(() => {
    const slides = photoRef.current?.querySelectorAll<HTMLElement>(".res-gallery-slide");
    if (!slides?.length || previousSlide.current === slide) return;
    const from = previousSlide.current;
    previousSlide.current = slide;
    galleryTween.current?.kill();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({ defaults: { duration: reduced ? 0 : 1.2, ease: "res-swiper-ease" } });
    slides.forEach((element, index) => {
      const progress = slide - index;
      const inner = element.querySelector(".res-photo-layer");
      // The original Swiper mask moves the clipped slide and stretches its image
      // around the entering/exiting edge, using parallaxFactor .5 and scale 2.2/1.2.
      if (index === from || index === slide) {
        gsap.set(element, { zIndex: index === slide ? 2 : 1 });
        gsap.set(inner, { transformOrigin: index === from ? (slide > from ? "right center" : "left center") : (slide > from ? "left center" : "right center") });
      }
      timeline.to(element, { xPercent: (index - slide) * 100 }, 0);
      timeline.to(inner, { xPercent: progress * 50, scaleX: 1 + Math.abs(progress) * 1.2, scaleY: 1 + Math.abs(progress) * .2 }, 0);
    });
    galleryTween.current = timeline;
    return () => { timeline.kill(); };
  }, [slide, category]);

  useEffect(() => {
    if (galleryInteracted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Swiper's autoplay waits for its 1200ms transition before its next 5000ms delay.
    const timer = window.setTimeout(() => setSlide(current => current === photos.length - 1 ? 0 : current + 1), slide === 0 ? 5000 : 6200);
    return () => clearTimeout(timer);
  }, [slide, category, photos.length, galleryInteracted]);

  useEffect(() => {
    const paths = routeRef.current?.querySelectorAll<SVGPathElement>(".res-route-line");
    if (!paths) return;
    paths.forEach(path => {
      const active = Number(path.dataset.id) === activePlace;
      gsap.to(path, { strokeDashoffset: active ? 0 : 1, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : active ? 2 : .5, ease: "res-default-ease", overwrite: true });
    });
  }, [activePlace]);

  useEffect(() => {
    if (!panoramaRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      gsap.fromTo(panoramaRef.current!.querySelector(".res-panorama-photo"), { yPercent: -20 }, { yPercent: 20, ease: "none", scrollTrigger: { trigger: panoramaRef.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncDuration = () => { if (Number.isFinite(audio.duration)) setDuration(audio.duration); };
    syncDuration();
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("canplay", syncDuration);
    return () => { audio.removeEventListener("loadedmetadata", syncDuration); audio.removeEventListener("canplay", syncDuration); };
  }, []);

  useEffect(() => {
    if (!panorama) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanorama(false);
      if (event.key === "Tab" && !event.shiftKey && document.activeElement === closeRef.current) { event.preventDefault(); panoramaFrame.current?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      panoramaTrigger.current?.focus({ preventScroll: true });
    };
  }, [panorama]);

  const changeSlide = (direction: number) => { setGalleryInteracted(true); setSlide(current => Math.max(0, Math.min(photos.length - 1, current + direction))); };
  const changeCategory = (value: Category) => {
    setCategory(value); setSlide(0);
    window.dispatchEvent(new CustomEvent("category-change", { detail: value }));
  };
  const selectPlace = (id: number, scroll = false) => {
    setActivePlace(id);
    if (scroll && placeTrack.current) {
      const card = placeTrack.current.querySelector<HTMLElement>(`[data-place="${id}"]`);
      if (card) gsap.to(placeTrack.current, { scrollLeft: card.offsetLeft - parseFloat(getComputedStyle(placeTrack.current).paddingLeft), duration: 1.2, ease: "power2.inOut", overwrite: true });
    }
  };
  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { try { await audio.play(); setPlaying(true); setAudioError(false); } catch { setAudioError(true); } }
    else { audio.pause(); setPlaying(false); }
  };
  const dragGallery = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (!start || Math.abs(event.clientX - start.x) < 5 || Math.abs(event.clientX - start.x) < Math.abs(event.clientY - start.y)) return;
    setGalleryInteracted(true);
    galleryTween.current?.kill();
    const offset = Math.max(-1, Math.min(1, (event.clientX - start.x) / event.currentTarget.clientWidth));
    const position = Math.max(0, Math.min(photos.length - 1, slide - offset));
    photoRef.current?.querySelectorAll<HTMLElement>(".res-gallery-slide").forEach((element, index) => {
      const progress = position - index;
      gsap.set(element, { xPercent: -progress * 100 });
      gsap.set(element.querySelector(".res-photo-layer"), { xPercent: progress * 50, scaleX: 1 + Math.abs(progress) * 1.2, scaleY: 1 + Math.abs(progress) * .2, transformOrigin: progress > 0 ? "right center" : "left center" });
    });
  };
  const resetGalleryDrag = () => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1.2;
    photoRef.current?.querySelectorAll<HTMLElement>(".res-gallery-slide").forEach((element, index) => {
      const progress = slide - index;
      gsap.to(element, { xPercent: -progress * 100, duration, ease: "res-swiper-ease", overwrite: true });
      gsap.to(element.querySelector(".res-photo-layer"), { xPercent: progress * 50, scaleX: 1 + Math.abs(progress) * 1.2, scaleY: 1 + Math.abs(progress) * .2, duration, ease: "res-swiper-ease", overwrite: true });
    });
    swipe.current = null;
  };
  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (!start) return;
    const delta = event.clientX - start.x;
    const horizontal = Math.abs(delta) >= 5 && Math.abs(delta) > Math.abs(event.clientY - start.y);
    // Source Swiper defaults: shortSwipes=true, longSwipesMs=300,
    // longSwipesRatio=.5, threshold=5; maskEffect has resistanceRatio=0.
    const commits = horizontal && (event.timeStamp - start.startedAt <= 300 || Math.abs(delta) / event.currentTarget.clientWidth >= .5);
    if (commits) changeSlide(delta < 0 ? 1 : -1);
    else resetGalleryDrag();
    swipe.current = null;
  };
  const spokenText = (text: string, preceding = 0) => {
    let position = preceding;
    const spoken = duration ? audioTime / duration * (quote.length + architectureDescription.length) : 0;
    return text.split(" ").map((word, index) => <span className="res-spoken-word" key={index}>{Array.from(word).map((character, letter) => {
      const start = position++;
      return <span key={letter} className={spoken > start ? "res-spoken" : undefined}>{character}</span>;
    })}{position++ >= 0 ? " " : ""}</span>);
  };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  return <div className="residences-sections">
    <section id="features" className="res-exterior" aria-label="Property gallery" data-header-color="light">
      <div ref={photoRef} className="res-exterior-photo" tabIndex={0} role="group" aria-label="Gallery. Use left and right arrow keys to change image."
        onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); changeSlide(event.key === "ArrowLeft" ? -1 : 1); } }}
        onPointerDown={event => { if (event.button !== 0) return; swipe.current = { x: event.clientX, y: event.clientY, startedAt: event.timeStamp }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={dragGallery} onPointerUp={finishSwipe} onPointerCancel={resetGalleryDrag}>
        {photos.map((photo, index) => <div className="res-gallery-slide" key={photo.src} aria-hidden={index !== slide}><div className="res-photo-layer">
          <img className="res-gallery-blur" src={photo.src} alt="" draggable={false} />
          <img className="res-gallery-image" src={photo.src} alt={photo.alt} draggable={false} loading={index ? "lazy" : "eager"} />
        </div></div>)}
      </div>
      <div className="res-gallery-lines" aria-hidden="true" />
      <div className="res-gallery-switch">
        <button className={`res-category-toggle ${category === "residences" ? "is-residences" : ""}`} aria-label={`Showing ${category}. Switch to ${category === "villas" ? "residences" : "villas"}`} onClick={() => changeCategory(category === "villas" ? "residences" : "villas")}><span className="res-category-inner"><span className={category === "villas" ? "is-active" : ""}>Villas</span><span className="res-category-divider"> / </span><span className={category === "residences" ? "is-active" : ""}>Residences</span></span></button>
        <span className="res-mono">Gallery</span>
      </div>
      <div className="res-gallery-controls">
        <p className="res-gallery-count" aria-live="polite"><span>{String(slide + 1).padStart(2, "0")}</span><span> / {String(photos.length).padStart(2, "0")}</span></p>
        <div className="res-gallery-arrows"><button className="res-circle" disabled={slide === 0} onClick={() => changeSlide(-1)} aria-label="Previous gallery image"><Arrow back /></button><button className="res-circle" disabled={slide === photos.length - 1} onClick={() => changeSlide(1)} aria-label="Next gallery image"><Arrow /></button></div>
      </div>
    </section>

    <section id="location" className="res-location" aria-label="Location and nearby places" data-header-color="dark">
      <div className="res-map" ref={mapRef}
        onPointerDown={event => { if (event.pointerType !== "touch") return; if (!mapOffset.current) mapOffset.current = 13.1875 * parseFloat(getComputedStyle(document.documentElement).fontSize); mapTouch.current = { x: event.clientX, offset: mapOffset.current }; }}
        onPointerMove={event => { if (!mapTouch.current || !mapRef.current) return; const limit = (mapRef.current.clientWidth - window.innerWidth) / 2; mapOffset.current = Math.max(-limit, Math.min(limit, mapTouch.current.offset + event.clientX - mapTouch.current.x)); mapRef.current.style.transform = `translate(calc(-50% + ${mapOffset.current}px), -5%)`; }}
        onPointerUp={() => { mapTouch.current = null; }} onPointerCancel={() => { mapTouch.current = null; }}>
        <div ref={routeRef} className="res-map-routes" aria-hidden="true">{mapRoutes.map(route => <svg className={`res-map-route res-map-route-${route.id}`} key={route.id} viewBox={route.viewBox} fill="none"><defs><mask id={`res-route-mask-${route.id}`}><path d={route.d} stroke="white" strokeWidth="2" strokeDasharray="4 4" /></mask></defs><path className="res-route-line" data-id={route.id} d={route.d} pathLength="1" stroke="#304143" strokeWidth="2" strokeDasharray="1" strokeDashoffset="1" mask={`url(#res-route-mask-${route.id})`} /></svg>)}</div>
        <img src="/images/main/map.webp" alt="Map of the Costa del Sol surrounding Horizonte Village" loading="lazy" />
        <a className="res-map-home" href="/genplan" aria-label="Explore Horizonte Village masterplan"><img src="/logo_small.svg" alt="Horizonte Village" /></a>
        {places.map(place => <button key={place.id} className={`res-map-pin ${activePlace === place.id ? "is-active" : ""}`} style={{ left: `${place.x}%`, top: `${place.y}%` }} aria-label={place.title} title={place.title} aria-pressed={activePlace === place.id} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) selectPlace(place.id, true); }} onMouseLeave={() => setActivePlace(null)} onClick={() => selectPlace(place.id, true)}><MapPin /></button>)}
      </div>
      <div className="res-location-heading"><div><h2>Prime location <i>between</i> Mijas, Benalmadena, <i>and</i> Fuengirola <i>on the</i> picturesque <i>coastline of</i> Spain</h2><a href="https://maps.google.com/?q=Horizonte+Village+Mijas" target="_blank" rel="noreferrer" className="res-map-link res-mono">See on map <span>↗</span></a></div><p className="res-mono">Mijas, Malaga, Spain</p></div>
      <div className="res-place-track" ref={placeTrack}
        onPointerDown={event => { if (event.pointerType !== "mouse" || event.button !== 0) return; mapDrag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false }; suppressCardClick.current = false; }}
        onPointerMove={event => {
          const drag = mapDrag.current;
          if (!drag) return;
          if (Math.abs(event.clientX - drag.x) > 5) { drag.moved = true; event.currentTarget.setPointerCapture(event.pointerId); }
          if (drag.moved) event.currentTarget.scrollLeft = drag.scroll - (event.clientX - drag.x);
        }}
        onPointerUp={() => { suppressCardClick.current = Boolean(mapDrag.current?.moved); mapDrag.current = null; }}
        onPointerCancel={() => { mapDrag.current = null; }}
        onPointerLeave={() => { if (!mapDrag.current?.moved) mapDrag.current = null; }}
        onClickCapture={event => { if (event.detail !== 0 && suppressCardClick.current) { event.preventDefault(); event.stopPropagation(); suppressCardClick.current = false; } }}>
        {places.map(place => <button key={place.id} data-place={place.id} className={`res-place-card ${activePlace === place.id ? "is-active" : ""}`} onMouseEnter={() => { if (!mapDrag.current) selectPlace(place.id); }} onMouseLeave={event => { if (document.activeElement !== event.currentTarget) setActivePlace(null); }} onFocus={() => selectPlace(place.id)} onBlur={() => setActivePlace(null)} onClick={() => selectPlace(place.id)} aria-pressed={activePlace === place.id}>
          <img src={place.src} alt="" loading="lazy" draggable={false} />
          <span className="res-place-distance"><strong>{place.distance}</strong><span className="res-mono">{place.text}</span></span>
          <span className="res-place-title">{place.title}</span><span className="res-place-icon" aria-hidden="true"><MapPin /></span>
        </button>)}
      </div>
    </section>

    <section id="architecture" className="res-architecture" data-header-color="dark">
      <p className="res-mono res-architecture-label">Architecture</p>
      <img className="res-architecture-image" src="/images/main/architecture.webp" alt="Horizonte architecture" loading="lazy" />
      <div className="res-quote-wrap"><h2 className="res-quote">{spokenText(quote)}</h2><button className="res-audio-play" onClick={toggleAudio} aria-label={playing ? "Pause architecture audio" : "Play architecture audio"}><WaveButton size="large" theme="dark">{playing ? "Pause" : "Play"}</WaveButton></button></div>
      <p className="res-architecture-description">{spokenText(architectureDescription, quote.length)}</p>
      <audio ref={audioRef} src="/reference-assets/Each_residence_is_strateg_2_36e611776e.wav" preload="metadata" onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onTimeUpdate={event => setAudioTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} onEnded={() => setPlaying(false)} />
      <div className="res-audio-track"><button className="res-mobile-audio" onClick={toggleAudio} aria-label={playing ? "Pause architecture audio" : "Play architecture audio"}>{playing ? "Ⅱ" : "▷"}</button><span className="res-mono">{formatTime(audioTime)}</span><button className="res-waveform" role="slider" aria-label="Seek architecture audio" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(audioTime)} onKeyDown={event => { if (audioRef.current && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); audioRef.current.currentTime = Math.max(0, Math.min(duration, audioTime + (event.key === "ArrowRight" ? 5 : -5))); } }} onClick={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (audioRef.current && duration) audioRef.current.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * duration;
      }}><svg className="res-wave-svg" aria-hidden="true"><defs><mask id="res-audio-waves">{Array.from({ length: 500 }, (_, index) => { const height = 10 + Math.abs(Math.sin(index * 1.4) * Math.cos(index * .21)) * 90; return <rect key={index} x={(index * 4.2).toFixed(3)} y={`${(50 - height / 2).toFixed(3)}%`} width="1.2" height={`${height.toFixed(3)}%`} fill="white" />; })}</mask></defs><g mask="url(#res-audio-waves)"><rect width="100%" height="100%" fill="#b6b4ad" /><rect width={`${(duration ? audioTime / duration * 100 : 0).toFixed(3)}%`} height="100%" fill="#304143" /></g></svg></button><span className="res-mono res-duration">{formatTime(duration)}</span></div>
      {audioError && <p className="res-mono" role="status">Audio could not be played. Please try again.</p>}
      <p className="res-author">Huete Arquitectos &amp; Atmosphere Projects</p><p className="res-mono res-author-caption">Author of the project</p>
    </section>

    <section ref={panoramaRef} id="panorama" className="res-panorama" data-header-color="light">
      <button ref={panoramaTrigger} className="res-panorama-open" onClick={() => { if (!suppressPanClick.current) setPanorama(true); suppressPanClick.current = false; }} aria-label="Explore panorama"
        onPointerDown={event => { if (event.button !== 0) return; panDrag.current = { x: event.clientX, offset: panOffset, moved: false }; suppressPanClick.current = false; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (panoramaCursor.current) { const bounds = event.currentTarget.getBoundingClientRect(); gsap.set(panoramaCursor.current, { left: event.clientX - bounds.left, top: event.clientY - bounds.top }); } const drag = panDrag.current; if (!drag) return; const delta = event.clientX - drag.x; if (Math.abs(delta) > 5) drag.moved = true; setPanOffset(Math.max(0, Math.min(100, drag.offset - delta / event.currentTarget.clientWidth * 100))); }}
        onPointerUp={() => { suppressPanClick.current = Boolean(panDrag.current?.moved); panDrag.current = null; }} onPointerCancel={() => { panDrag.current = null; }}>
        <span className="res-panorama-photo"><img style={{ objectPosition: `${panOffset}% center`, transformOrigin: `${panOffset}% center` }} draggable={false} src="/images/main/panorama.jpg" alt="Panoramic view of the coast from Horizonte Village" loading="lazy" /></span>
        <span className="res-panorama-shade" /><span className="res-panorama-title">View <i>of the</i> panorama</span><span ref={panoramaCursor} className="res-panorama-explore res-mono"><WaveButton size="large" theme="light" active>Explore<br />panorama</WaveButton></span>
      </button>
    </section>
    {panorama && <div className="res-panorama-modal" role="dialog" aria-modal="true" aria-label="Horizonte panorama viewer"><span className="res-focus-guard" tabIndex={0} onFocus={() => closeRef.current?.focus()} /><iframe ref={panoramaFrame} title="Interactive Horizonte panorama" src={panoramaUrl} allow="xr-spatial-tracking; fullscreen" allowFullScreen /><button ref={closeRef} className="res-circle res-modal-close" onClick={() => setPanorama(false)} aria-label="Close panorama">×</button></div>}
  </div>;
}
