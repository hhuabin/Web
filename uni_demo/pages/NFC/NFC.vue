<template>
    <view>
        请打开NFC 并把卡贴在手机NFC区域
    </view>
</template>

<script>
    import {transceiveOrder,transceiveOrders} from "./index";
    export default {
        onShow() {
            const NFCAdapter = wx.getNFCAdapter()
			this.timer = setInterval(() => {
				NFCAdapter.startDiscovery({
					success: res => {
						if (this.showContent !== 'showInfo')
							this.showContent = 'pasteCard'
						clearInterval(this.timer)
						this.timer = null
						console.log('打开NFC成功');
					},
					fail: err => {
						if (err.errCode == 13021) {
							if (this.showContent !== 'showInfo')
								this.showContent = 'pasteCard'
							clearInterval(this.timer)
							this.timer = null
							console.log('NFC正在扫描');
						} else {
							if (this.showContent !== 'showInfo')
								this.showContent = 'openNfc'
							console.log('打开NFC失败');
						}
					}
				})
			}, 1000)
			NFCAdapter.onDiscovered(this.callback);
        },
		methods: {
            callback(res) {
				const that = this
				const NFCAdapter = wx.getNFCAdapter()
				// 发现卡片并显示卡片支持的协议
				console.log("发现卡片", res);
				if (!res.techs.includes("ISO-DEP")) {
					uni.showToast({
						title: "抱歉！不支持此类卡片",
						icon: "none",
					});
					return;
				}
				console.log('NFCAdapter', NFCAdapter);
				// 根据协议号获取卡片信息
				const isoDep = NFCAdapter.getIsoDep()
				console.log('isoDep', isoDep);
				isoDep.connect({
					success: (res) => {
						console.log("连接成功", res);
						// 读卡
						transceiveOrders(isoDep, that.apdu)
							.then((res) => {
								console.log("读卡", res);
								if (Object.values(res).indexOf(false) === -1) {
									cardCheck(JSON.stringify(res), this.cardType)
										.then(res => {
											console.log(res);
											if (res.wrong_code && res.wrong_code != '0000') {
												that._requestErr(res.wrong_code)
												return
											}
											if (!res.name || !that.idCheck(res.idnum)) {
												that.errorMsg = '未查询到姓名或身份证号，请稍后再试或携带身份证到羊城通线下营业厅进行续期'
												return
											}
											const cardInfo = {
												acceptorderid: res.acceptorderid,
												name: res.name,
												credential: res.credential,
												idNumber: res.idnum,
												lno: res.lno,
											}
											that.cardInfo = {
												...that.cardInfo,
												...cardInfo
											}
											that.issuedate = res.issuedate
											that.noFaceCheck = res.noFaceCheck||false
											that.showContent = 'showInfo'
										
										})
								} else {
									uni.showToast({
										title: "抱歉！读卡失败",
										icon: "none",
									});
								}
							});
					}
				})
			},
        },
        onHide() {
			clearInterval(this.timer)
			this.timer = null
			const NFCAdapter = wx.getNFCAdapter();
			NFCAdapter.offDiscovered(this.callback);
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
			const NFCAdapter = wx.getNFCAdapter();
			NFCAdapter.offDiscovered(this.callback);
		},
    }
</script>

<style>
    
</style>
