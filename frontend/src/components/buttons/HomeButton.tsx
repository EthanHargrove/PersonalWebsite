// External imports
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useGlitch, GlitchHandle } from "react-powerglitch";

const HomeButton = () => {
    const glitch: GlitchHandle = useGlitch({ playMode: 'hover', glitchTimeSpan: false });
    // const homeButtonStyle = {
    //     zIndex: 2,
    //     color: 'var(--neon-blue)',
    //     marginTop: '5px',
    // }
    return (
        <div ref={glitch.ref}>
            <HomeOutlinedIcon 
                fontSize='inherit'
                className='navbar-btn'
                // style={homeButtonStyle}
            />
        </div>
    );
}

export default HomeButton;