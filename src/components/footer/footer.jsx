import React from 'react';
import styles from './footer.module.css';
import github from '../../assets/icons/github-icon.svg';
import linkedin from '../../assets/icons/linkedin-icon.svg';
import logo from '../../assets/icons/logo_Screen.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <img src={logo} alt="logo" />
            <p className={styles.copyright}>
              Glauedson Carlos Rodrigues
            </p>
            <p className={styles.subtitle}>
              Desenvolvedor Full Stack
            </p>
          </div>
          
          <div className={styles.rightSection}>
            <span className={styles.connectText}>Contato profissional</span>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/Glauedson" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <img src={github} alt="GitHub Icon" className={styles.icon} />
                <span className={styles.socialText}>GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/glauedson-carlos-89875b258/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <img src={linkedin} alt="GitHub Icon" className={styles.icon} />
                <span className={styles.socialText}>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;