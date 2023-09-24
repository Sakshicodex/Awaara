import React from 'react';
import styles from './Trips.module.css';
import CardComponent from './CardComponent';
import { Link } from 'react-router-dom';

const Trips = () => {
  return (
    <div className={styles['trips-container']}>
      <div className={styles['card-container']}>
        <Link to="/voyage-page"> {/* Replace with the actual URL */}
          <CardComponent icon="icon1" text="Voyage" text2="Daring Voyage: Thrill Awaits!" text3="Voyage" />
        </Link>
      </div>
      <div className={styles['card-container']}>
        <Link to="/mysterious-page"> {/* Replace with the actual URL */}
          <CardComponent icon="icon2" text="Mysterious" text2="Enigmatic Mysterious Secrets Unfold" text3="Mysterious" />
        </Link>
      </div>
      <div className={styles['card-container']}>
        <Link to="/moderate-page"> {/* Replace with the actual URL */}
          <CardComponent icon="icon3" text="Moderate" text2="Balanced Moderate: Relaxing Quest" text3="Moderate" />
        </Link>
      </div>
    </div>
  );
}

export default Trips;
