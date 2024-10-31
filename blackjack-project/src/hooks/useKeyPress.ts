import { useState, useEffect } from 'react';

export function useKeyPress(targetKey: string) {
	const [keyPressed, setKeyPressed] = useState(false);

	useEffect(() => {
		const leftHandler = ({ key }: KeyboardEvent) => {
			if (key === targetKey) {
				setKeyPressed(true);
			}
		};

		const rightHandler = ({ key }: KeyboardEvent) => {
			if (key === targetKey) {
				setKeyPressed(false);
			}
		};

		window.addEventListener('keydown', leftHandler);
		window.addEventListener('keyup', rightHandler);

		return () => {
			window.removeEventListener('keydown', leftHandler);
			window.removeEventListener('keyup', rightHandler);
		};
	}, [targetKey]);

	return keyPressed;
}
