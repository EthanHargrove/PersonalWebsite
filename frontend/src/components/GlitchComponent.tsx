import React, { ReactNode } from 'react';
import { useGlitch, GlitchHandle } from 'react-powerglitch';

interface GlitchComponentProps {
  children: ReactNode;
  playMode: String;
  glitchTimeSpan: false | {start: number; end: number;};
}

const GlitchComponent: React.FC<GlitchComponentProps> = (props) => {
  const glitch: GlitchHandle = useGlitch({ playMode: props.playMode, glitchTimeSpan: props.glitchTimeSpan });

  return <div ref={glitch.ref}>{props.children}</div>;
};

export default GlitchComponent;