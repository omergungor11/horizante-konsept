import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Horizonte Village — Modern Luxury Villas & Residences', description: 'A new perspective on Mediterranean living. Discover majestic villas and residences in Mijas, Costa del Sol.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
