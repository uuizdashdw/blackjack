// CSS
import styles from './splash.module.css';

// Images
import SplashGraphic from '../../images/splash-graphic.png';
import SplashGraphicMobile from '../../images/splash-graphic-m.png';
import Image from 'next/image';

export default function SplashPage() {
	return (
		<div className={styles.splash_page}>
			<div className={styles.title}></div>
			<picture className={styles.splash_graphic}>
				<source
					media="(max-width: 550px)"
					srcSet={SplashGraphic.src}
					type="iamge/png"
				/>
				<Image src={SplashGraphicMobile} alt="" width={648} height={376} />
			</picture>
		</div>
	);
}
