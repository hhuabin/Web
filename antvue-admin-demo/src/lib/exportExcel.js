import * as XLSX from 'xlsx'

/**
 * 导出excel文件
 * @param {Array} header 表头
 * @param {Array[]} body 表体 二维数组，
 * @param {string} fileName 文件名字
 * @param {Object<Array>} wscols 宽高 单位（磅）
 * @param {Object<Array>} wsrows 列宽 单位（字符）
 * @param {Object<Array>} merges 合并单元格
 */
export const exportExcel = (header, body, fileName="test", wscols, wsrows, merges) => {
	
	/* // 指定每一行的高度
    wsrows = [{ hpx: 25.5 }]
	// 指定每一列的宽度
	wscols = [{ wch: 20 }] */
    
	body.unshift(header)
	let ws = XLSX.utils.aoa_to_sheet(body)
	let wb = XLSX.utils.book_new()
	ws['!cols'] = wscols
	ws['!rows'] = wsrows
	ws['!merges'] = merges
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
	// 生成excel
	XLSX.writeFile(wb, `${fileName}.xlsx`)
}
/* const columns = [
	{
		align: 'center',
		title: '员工类型',
		dataIndex: 'name',
	},
	{
		title: '人数',
		dataIndex: 'age',
	},
];
const toExcel = () => {
	const header = []
	columns.forEach(item => {
		header.push(item.title)
	});
	exportExcel(header, [header, header, header, header])
} */