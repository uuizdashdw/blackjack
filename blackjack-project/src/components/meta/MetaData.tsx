export default function MetaData() {
	const metaSet = {
		title: '더 블랙 스페이드 - BLACK JACK',
		description: '여기에서 블랙잭을 연습해보세요!',
		image: '/images/share.jpg',
	};

	return (
		<>
			<title>{metaSet.title}</title>
			<meta charSet="utf-8" />
			<meta name="description" content={metaSet.description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta property="og:title" content={metaSet.title} />
			<meta property="og:description" content={metaSet.description} />
			<meta property="og:image" content={metaSet.image} />

			<link rel="icon" sizes="180x180" href={'/images/apple-touch-icon.png'} />
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={'/images/favicon-32x32.png'}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={'/images/favicon-16x16.png'}
			/>
			<link rel="manifest" href={'/site.webmanifest'} />
			<link rel="mask-icon" href={'/safari-pinned-tab.svg'} />
			<meta name="masapplication-TitleColor" content="#00a300" />
			<meta name="theme-color" content="#ffffff" />
		</>
	);
}
