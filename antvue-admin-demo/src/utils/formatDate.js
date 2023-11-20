export default function formatDate(value, fmt) {
	var date;
	if (typeof value === 'string' && value.constructor === String) {
		date = new Date(value.replace(/T/g, ' ').replace(/-/g, '/'));
	} else if (typeof(value) === 'object' && value.constructor === Date) {
		date = value;
	} else if (typeof value === 'number' && value.constructor === Number) {
		date = new Date(value);
	} else {
		console.log('日期格式化失败，请传入正确的格式');
		return value;
	}
	fmt = fmt || 'YYYY/MM/DD hh:mm:ss';
	if (/(Y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
	}
	var weekList = ['日', '一', '二', '三', '四', '五', '六'];
	var o = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'w+': weekList[date.getDay()]
	};
	for (var k in o) {
		if (new RegExp("(".concat(k, ")")).test(fmt)) {
			var str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
}
function padLeftZero(str) {
	return ('00' + str).substring(str.length);
}