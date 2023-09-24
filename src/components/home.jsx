import React from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import { auth, signOut } from './firebase'; // Import your Firebase authentication instance

const Home = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(); // Sign the user out
  };

  return (
    <div className={styles.container}>
      <div className={`${styles['bird-container']} ${styles['bird-container--one']}`}>
                <div className={`${styles.bird} ${styles['bird--one']}`}></div>
            </div>

            <div className={`${styles['bird-container']} ${styles['bird-container--two']}`}>
                <div className={`${styles.bird} ${styles['bird--two']}`}></div>
            </div>

            <div className={`${styles['bird-container']} ${styles['bird-container--three']}`}>
                <div className={`${styles.bird} ${styles['bird--three']}`}></div>
            </div>

            <div className={`${styles['bird-container']} ${styles['bird-container--four']}`}>
                <div className={`${styles.bird} ${styles['bird--four']}`}></div>
            </div>
      <div className={styles.buttonContainers}>
        <Link to="/" className={styles.buttons}>Home</Link>
        <Link to="/about" className={styles.buttons}>About</Link>
        <Link to="/contact" className={styles.buttons}>Contact</Link>
        <Link to="/trips" className={styles.buttons}>Trips</Link>
      </div>

      <div className={styles.deconstructed}>
        AWAARA
        <div>AWAARA</div>
        <div>AWAARA</div>
        <div>AWAARA</div>
        <div>AWAARA</div>

        <form>
          <div className={styles['input-containers']}>
            <div className={styles['input-wrappers']}>
              <input  className={styles['place-hold']}type="text" placeholder="Search Destinations...." />
            </div>
          </div>
        </form>
      </div>

      <div className={styles['right-buttons']}>
      {user ? (
          <div>
            <span>{user.displayName}</span>
            <button onClick={handleSignOut}  className={styles.button}>Sign Out</button>
          </div>
          
        ) : (
          <Link to="/login" className={styles.button}>Login</Link>
        )}
        <Link to="/profile" className={styles.button}>Profile</Link>
      </div>
    </div>
  );
};

export default Home;
