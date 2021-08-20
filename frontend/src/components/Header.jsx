import styles from "./Header.module.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header + " ws-flexbox"}>
            <div className={styles.leftBlock}>
                <Link className={styles.link} to="/">Пресс-туры</Link>
            </div>
            <div className={styles.rightBlock}>
                <Link className={styles.link} to="/">Пресс-туры</Link>
            </div>
        </div>
        // <ul>
        //     <li>
        //         <Link to="/">Пресс-туры</Link>
        //     </li>
        //     <li>
        //         <Link to="/feedback">Обратная связь</Link>
        //     </li>
        //     <li>
        //         <Link to="/monitoring">Мониторинг</Link>
        //     </li>
        // </ul>  
    );
}
  
export default Header;