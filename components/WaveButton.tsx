import type { ReactNode } from 'react';
import './wave-button.css';

export default function WaveButton({ children, size = 'large', theme = 'light', active = false, className = '' }: { children: ReactNode; size?: 'large' | 'small'; theme?: 'light' | 'dark'; active?: boolean; className?: string }) {
  return <span className={`wave-button ${size} ${theme} ${active ? 'active' : ''} ${className}`}><span className="wave-button-bg"/><span className="wave-button-animation" aria-hidden="true">{Array.from({length:size==='large'?4:3},(_,index)=><span className="wave-button-circle" key={index}/>)}</span><span className="wave-button-text">{children}</span></span>;
}
