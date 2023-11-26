import React from 'react';
import { Shape } from 'three';


interface OPieceProps {
    x: number;
    y: number;
    radius: number;
    width: number;
    depth: number
}

const OPiece: React.FC<OPieceProps> = (props) => {
    let { x, y, radius, width, depth } = props;
    y = y+10;

    const oShape = new Shape();
    oShape.absarc( x, y, radius+width, 0, Math.PI * 2, false );
    oShape.absarc( x, y, radius, 0, Math.PI * 2, true );

    const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
    };

    return (
        <mesh rotation={[0, 0, 0]} scale={[0.006, 0.006, 0.006]}>
            <extrudeGeometry args={[oShape, extrudeSettings]} />
            <meshStandardMaterial color="#00FFFF" wireframe={true} />
        </mesh>
    );
};

export default OPiece;