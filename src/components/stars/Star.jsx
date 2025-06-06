import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import styles from './Star.module.css'

export default function Star ({ rating }) {
    let rate = rating / 2 

    const stars = []

    for ( let i = 0; i < 5; i++) {
        // full star
        if ( rate >= 1 ){
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}             
                />
            )

            rate -= 1 
        }
        // half star
        else if ( rate >= 0.5 ) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStarHalfStroke}             
                />
            )

            rate = 0
        } else {
            // empty star
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStarRegular}
                />
            )
        }

    }

    return (
        <div className={styles.stars}>
            {stars}
            <span className={styles.rating}>
                {rating / 2}
            </span>
        </div>
    );

};