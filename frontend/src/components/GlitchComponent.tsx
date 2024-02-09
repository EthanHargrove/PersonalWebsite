import React, { ReactNode } from 'react';
import { useGlitch, GlitchHandle } from 'react-powerglitch';

interface GlitchComponentProps {
  children: ReactNode;
}

const GlitchComponent: React.FC<GlitchComponentProps> = (props) => {
  const glitch: GlitchHandle = useGlitch({ playMode: "hover", glitchTimeSpan: false });

  return <div ref={glitch.ref}>{props.children}</div>;
};

export default GlitchComponent;