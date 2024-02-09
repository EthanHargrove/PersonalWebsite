import React from 'react';
import { Shape } from 'three';

interface TicTacToeGridProps {
    x: number;
    y: number;
    armLength: number;
    armWidth: number;
    depth: number;
    vertColour: string;
    horiColour: string;
}

const TicTacToeGrid: React.FC<TicTacToeGridProps> = ({ x, y, armLength, armWidth, depth, vertColour, horiColour }) => {
    x = x-armLength/2; 
    y = y+armLength/2;

    const topArm = new Shape();
    topArm.moveTo( x, y );
    topArm.lineTo( x-armWidth-armLength, y );
    topArm.lineTo( x-armWidth-armLength, y+armWidth );
    topArm.lineTo( x+2*armLength+armWidth, y+armWidth );
    topArm.lineTo( x+2*armLength+armWidth, y );
    topArm.lineTo( x, y );

    y = y-armLength
    const leftArm = new Shape();
    leftArm.moveTo( x, y )
    leftArm.lineTo( x, y-armLength-armWidth );
    leftArm.lineTo( x-armWidth, y-armLength-armWidth );
    leftArm.lineTo( x-armWidth, y+2*armLength+armWidth );
    leftArm.lineTo( x, y+2*armLength+armWidth );
    leftArm.lineTo( x, y )

    const bottomArm = new Shape();
    bottomArm.moveTo( x, y );
    bottomArm.lineTo( x-armWidth-armLength, y );
    bottomArm.lineTo( x-armWidth-armLength, y+armWidth );
    bottomArm.lineTo( x+2*armLength+armWidth, y+armWidth );
    bottomArm.lineTo( x+2*armLength+armWidth, y );
    bottomArm.lineTo( x, y );

    x = x+armLength
    const rightArm = new Shape();
    rightArm.moveTo( x, y )
    rightArm.lineTo( x, y-armLength-armWidth );
    rightArm.lineTo( x+armWidth, y-armLength-armWidth );
    rightArm.lineTo( x+armWidth, y+2*armLength+armWidth );
    rightArm.lineTo( x, y+2*armLength+armWidth );
    rightArm.lineTo( x, y )

    const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
    };

    return (
        <>
            <mesh rotation={[0, 0, 0]} scale={[0.007, 0.007, 0.007]}>
                <extrudeGeometry args={[topArm, extrudeSettings]} />
                <meshStandardMaterial color={horiColour} wireframe={true} />
            </mesh>
            <mesh rotation={[0, 0, 0]} scale={[0.007, 0.007, 0.007]}>
                <extrudeGeometry args={[bottomArm, extrudeSettings]} />
                <meshStandardMaterial color={horiColour} wireframe={true} />
            </mesh>
            <mesh rotation={[0, 0, 0]} scale={[0.007, 0.007, 0.007]}>
                <extrudeGeometry args={[leftArm, extrudeSettings]} />
                <meshStandardMaterial color={vertColour} wireframe={true} />
            </mesh>
            <mesh rotation={[0, 0, 0]} scale={[0.007, 0.007, 0.007]}>
                <extrudeGeometry args={[rightArm, extrudeSettings]} />
                <meshStandardMaterial color={vertColour} wireframe={true} />
            </mesh>
        </>
    );
};

export default TicTacToeGrid;