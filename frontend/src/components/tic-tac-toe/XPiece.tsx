import React from 'react';
import { Shape } from 'three';


interface XPieceProps {
    x: number;
    y: number;
    armLength: number;
    armWidth: number;
    depth: number
}

const XPiece: React.FC<XPieceProps> = (props) => {
    let { x, y, armLength, armWidth, depth } = props

    const XShape = new Shape();
    XShape.moveTo( x, y );
    XShape.lineTo( x-armLength, y-armLength );
    XShape.lineTo( x-armLength-armWidth, y-armLength+armWidth );
    XShape.lineTo( x-armWidth, y+armWidth );
    XShape.lineTo( x-armLength-armWidth, y+armLength+armWidth );
    XShape.lineTo( x-armLength, y+armLength+2*armWidth );
    XShape.lineTo( x, y+2*armWidth );
    XShape.lineTo( x+armLength, y+armLength+2*armWidth );
    XShape.lineTo( x+armLength+armWidth, y+armLength+armWidth );
    XShape.lineTo( x+armWidth, y+armWidth );
    XShape.lineTo( x+armLength+armWidth, y-armLength+armWidth );
    XShape.lineTo( x+armLength, y-armLength);
    XShape.lineTo( x, y );

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
            <extrudeGeometry args={[XShape, extrudeSettings]} />
            <meshStandardMaterial color="#FF1493" wireframe={false} />
        </mesh>
    );
};

export default XPiece;