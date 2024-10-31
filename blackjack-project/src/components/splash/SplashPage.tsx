// CSS
import styles from './splash.module.css';

// Images
import Image from 'next/image';

export default function SplashPage() {
	return (
		<div className={styles.splash_page}>
			<div className={styles.title}></div>
			<picture className={styles.splash_graphic}>
				<source
					media="(max-width: 550px)"
					srcSet={'/images/splash-graphic.png'}
					type="iamge/png"
				/>
				<Image
					src={'/images/splash-graphic-m.png'}
					alt=""
					className={styles.splash_graphic}
					width={648}
					height={376}
				/>
			</picture>
		</div>
	);
}
