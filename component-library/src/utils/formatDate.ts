export default function formatDate(value: string | Date | number, fmt: string): string | Date | number {
	let date: Date;
	if (typeof value === 'string' && value.constructor === String) {
		date = new Date(value.replace(/T/g, ' ').replace(/-/g, '/'));
	} else if (value instanceof Object && value.constructor === Date) {
		date = value;
	} else if (typeof value === 'number' && value.constructor === Number) {
		date = new Date(value);
	} else {
		console.warn('日期格式化失败，请传入正确的格式');
		return value;
	}
	fmt = fmt || 'YYYY/MM/DD hh:mm:ss';
	if (/(Y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
	}
	const weekList = ['日', '一', '二', '三', '四', '五', '六'];
	const o: Record<string, number|string> = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'w+': weekList[date.getDay()]
	};
	for (const k in o) {
		if (new RegExp("(".concat(k, ")")).test(fmt)) {
			const str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
}
function padLeftZero(str: string) {
	return ('00' + str).substring(str.length);
}
