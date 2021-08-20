import styles from "./Header.module.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <ul>
            <li>
                <Link to="/">Пресс-туры</Link>
            </li>
            <li>
                <Link to="/feedback">Обратная связь</Link>
            </li>
            <li>
                <Link to="/monitoring">Мониторинг</Link>
            </li>
        </ul>  
    );
}
  
export default Header;