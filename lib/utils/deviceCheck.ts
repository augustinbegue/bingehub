export function isAndroidDevice() {
	const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

	return /android/i.test(userAgent);
}

export function isIOSDevice() {
	const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

	return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
}
