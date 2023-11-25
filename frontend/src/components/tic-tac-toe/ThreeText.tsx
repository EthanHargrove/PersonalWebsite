import React from 'react';
import { Text } from '@react-three/drei';

interface ThreeTextProps {
    x: number;
    y: number;
    z: number;
    value: string | number;
}

const ThreeText: React.FC<ThreeTextProps> = ({ x, y, z, value }) => {
    
    return (
        <Text
            position={[x, y, z]}
            fontSize={0.35}
            textAlign='center'
            font=''
        >
            { value }
        </Text>
    );
};

export default ThreeText;