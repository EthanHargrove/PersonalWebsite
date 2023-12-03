import React, { ReactNode } from 'react';
import { useGlitch, GlitchHandle } from 'react-powerglitch';

interface GlitchComponentProps {
  children: ReactNode;
}

const GlitchComponent: React.FC<GlitchComponentProps> = ({ children }) => {
  const glitch: GlitchHandle = useGlitch({ playMode: 'hover', glitchTimeSpan: false });

  return <div ref={glitch.ref}>{children}</div>;
};

export default GlitchComponent;