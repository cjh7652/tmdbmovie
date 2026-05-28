
import {Link} from 'react-router-dom'
import { BiSolidCameraMovie } from "react-icons/bi";
import './header.scss'

const Header = () => {
    return (
        <div className='header'>
            <h1 className="logo"><Link to="/"><BiSolidCameraMovie /></Link></h1>
            <div id="nav">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/drama">Drama</Link></li>
                        <li><Link to="/comedy">Comedy</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;