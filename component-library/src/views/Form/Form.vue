<template>
    <div class="list-box-cover">
        <div class="list-box">
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">选择输入框</div>
                    <div class="item-right" @click="changeShowPopup($event)" data-showpopup="1">
						<!-- input会阻止事件冒泡，故而这里建议使用div而不是input -->
						<div :class="['choose-item', itemValue? '' : 'placeholder']">{{itemValue || "请选择标题"}}</div>
                        <div class="arrow-right"></div>
                    </div>
                </div>
                <div class="popup-cover" v-if="showPopup" @click="changeShowPopup($event)" data-showpopup="0">
					<transition name='fade' appear>
						<div class="popup">
							<div class="option-scroll">
								<div class="option"
									:class="{blue: itemValue === valueArray[index]}"
									v-for="(value, index) in valueArray"
									@click="changeItemValue($event)"
									:data-index="index"
									:key="index"
								>
									{{value}}
								</div>
							</div>
							<div class="option cancel" data-showpopup="0">取消</div>
						</div>
					</transition>
                </div>
            </div>

            <div class="list-item">
                <div class="item-cover">
                    <div class="title">手机号</div>
                    <div class="item-right">
						<div class="input">
							<input type="text"
								maxlength="11"
								:value="phone"
								@input="handleChangePhone($event)"
								@blur="phoneFormat(true)"
								placeholder="请输入手机号码"
							>
						</div>
						<div class="rewrite"
							v-if="phone"
							@click="clearPhone"
						>
						</div>
                    </div>
                </div>
                <div class="tip" v-if="showPhoneWarn">请输入正确的手机号</div>
            </div>
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">身份证号</div>
                    <div class="item-right">
						<div class="input">
							<input type="text"
							maxlength="18"
								v-model="idNum"
								@input="handleChangeIdNum($event)"
								@blur="idNumFormat(true)"
								placeholder="请输入身份证号"
							>
						</div>
						<div class="rewrite"
							v-if="idNum"
							@click="clearIdNum"
						>
						</div>
                    </div>
                </div>
                <div class="tip" v-if="showIdNumWarn">请输入正确的身份证号</div>
            </div>
        </div>
		<div class="button-cover">
			<div class="button" @click="showDialog = true">显示Dialog</div>
		</div>
		<Dialog v-if="showDialog" @confirm="closeDialog">
			<template #default>
				提示文本
				<!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" /> -->
			</template>
		</Dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref } from 'vue';
import Dialog from '@/components/Dialog/Dialog.vue';

export default defineComponent({
    name: 'MyForm',
	components: {
		Dialog,
	},
    setup() {
        const itemValue = ref("")
        const showPopup = ref(false)
        const valueArray = reactive(['1', '2', '3'])

		const phone = ref("")                // 手机号
		const showPhoneWarn = ref(false)     // 手机号提示
		const idNum = ref("")
		const showIdNumWarn = ref(false)

		const showDialog = ref(false)

        const changeShowPopup = (event: Event): void => {
			// console.log((event.target as HTMLElement).dataset);
			console.log((event.currentTarget as HTMLElement).dataset);
			
            if((event.currentTarget as HTMLElement).dataset.showpopup === '1') showPopup.value = true
			else if((event.target as HTMLElement).dataset.showpopup === '0') showPopup.value = false
        }
        const changeItemValue = (event: Event): void => {
			// console.log((event.target as HTMLElement).dataset);
			const index = Number((event.target as HTMLElement).dataset.index)
            itemValue.value = valueArray[index]
			showPopup.value = false
        }
		
		/**
		 * 输入手机号触发
		 * @param event 
		 */
		const handleChangePhone = (event: Event) => {
			const phoneValue = (event.target as HTMLInputElement).value
			phone.value = phoneValue
			// 这里必须赋值，nextTick需要在页面更新之后才会执行
			nextTick(() => {
				phone.value = phoneValue.replace(/[\D]+/g, '').trim()
				phoneFormat()
			})
		}
		/**
		 * 手机号格式检验
		 * @param show 格式错误时是否显示警告
		 */
		const phoneFormat = (show = false) => {
			const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			if(reg.test(phone.value)) {
                showPhoneWarn.value = false
			} else {
				show && (showPhoneWarn.value = true)
			}
		}
		const clearPhone = async () => {
			setTimeout(() => {
				phone.value = ""
			}, 250);
		}

		/**
		 * 输入身份证号触发
		 * @param event 
		 */
		const handleChangeIdNum = (event: Event) => {
			const idNumValue = (event.target as HTMLInputElement).value
			const reg = /[0-9]+|X|x/ig
			console.log(idNumValue.match(reg));
			
			idNum.value = idNumValue.match(reg)?.join('') || ''
			idNumFormat()
		}
		/**
		 * 身份证号格式检验
		 * @param show 格式错误时是否显示警告
		 */
		const idNumFormat = (show = false) => {
			const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
			if(reg.test(idNum.value)) {
                showIdNumWarn.value = false
			} else {
				show && (showIdNumWarn.value = true)
			}
		}
		const clearIdNum = async () => {
			setTimeout(() => {
				idNum.value = ""
			}, 250);
		}

		const closeDialog = ():void => {
			showDialog.value = false
		}

        return {
            itemValue,
            showPopup,
            valueArray,
            phone,
            showPhoneWarn,
			idNum,
			showIdNumWarn,
			showDialog,

            changeShowPopup,
            changeItemValue,

			handleChangePhone,
			phoneFormat,
			clearPhone,
			handleChangeIdNum,
			idNumFormat,
			clearIdNum,

			closeDialog,
        }
    }
});
</script>

<style lang='less' scoped>
// 定义视口宽度
@aw: (100 / 750vw);
.list-box-cover {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .list-box {
		width: 100%;
		padding: 0 24 * @aw;
		box-sizing: border-box;
        background-color: #fff;
        .list-item {
            position: relative;
            width: 100%;
            min-height: 48px;
            box-sizing: border-box;
            color: #000;
			overflow: hidden;
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 1px;
				transform: translateY(50%);
				background-color: #E5E5E5;
			}
			&:last-child {
				&::after {
					display: none;
				}
			}

            .item-cover {
                display: flex;
                align-items: center;
                width: 100%;
				height: 100%;
				padding: 12px 0;
				box-sizing: border-box;
				font-size: 18px;
				line-height: 24px;

                .title {
                    flex: none;
					width: 204 * @aw;
                    text-align: left;
                }

                .item-right {
                    flex: auto;
                    display: flex;
                    align-items: center;
					height: 100%;
					&:active {
						opacity: 0.7;
					}

					.input {
						flex: auto;
						width: 100%;
						height: 24px;
						
						input {
							width: 100%;
							height: 100%;
							background-color: #fff;
							border: none;
							outline: none;
							text-align: right;
							font-size: 18px;
							line-height: 24px;
						}

						input::-webkit-input-placeholder { /* WebKit browsers */
							color: #9B9B9B;
							font-size: 15px;
						}
					}

					.choose-item {
						flex: auto;
						width: 100%;
						height: 24px;
						text-align: right;
						font-size: 18px;
						line-height: 24px;
					}
					.placeholder {
						color: #9B9B9B;
						font-size: 15px;
					}

                    .arrow-right {
						flex: none;
                        width: 20px;
                        height: 24px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &::after {
                            content: '';
                            width: 11px;
                            height: 11px;
                            border-right: 1px solid #CCC;
                            border-bottom: 1px solid #CCC;
                            transform: rotateZ(-45deg);
                        }
						&:active {
							&::after {
								border-color: rgb(127, 127, 127);
							}
						}
                    }
					.rewrite {
						flex: none;
						width: 20px;
                        height: 24px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
						box-sizing: border-box;

						&::before, &::after {
							position: absolute;
                            content: '';
                            width: 1px;
                            height: 14px;
							background-color: #CCC;
                        }

						&::before {
							transform: rotateZ(-45deg);
						}

						&::after {
                            transform: rotateZ(45deg);
                        }
						&:active {
							animation: rotate .25s forwards;

							&::before, &::after {
								background-color: rgb(127, 127, 127);
							}
						}

						@keyframes rotate {
							from {
								transform: rotateZ(0);
							}
							to {
								transform: rotateZ(-180deg);
							}
						}
					}
                }
            }

            .tip {
                position: absolute;
                right: 0;
                bottom: 0;
                color: red;
                font-size: 12px;
            }
            
            .popup-cover {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .5);
                z-index: 9;

				/* .fade-enter-from {
					transform: translateY(100%);
				}
				.fade-enter-to {
					transform: translateY(0);
				} */

                .popup {
                    position: fixed;
					left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: #F5F5F5;
                    border-top-left-radius: 16 * @aw;
                    border-top-right-radius: 16 * @aw;
                    overflow: hidden;
					transition: all 0.3s;
                    animation: popup .3s;

                    @keyframes popup {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    }

                    .option-scroll {
                        width: 100%;
                        max-height: 285px;
                        overflow-y: scroll;
                    }

                    .option {
						position: relative;
                        width: 100%;
                        height: 57px;
                        box-sizing: border-box;
						background-color: #FFF;
                        text-align: center;
						color: #333;
                        font-size: 18px;
                        line-height: 57px;
						overflow: hidden;
						&::after {
							content: '';
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							height: 1px;
							transform: translateY(50%);
							background-color: #E5E5E5;
						}

						&:active {
							background-color: rgba(0, 0, 0, .1);
							color: #0F43FF;
						}
                    }					

                    .cancel {
                        margin-top: 8px;
						&::after {
							display: none;
						}
                    }

                    .blue {
                        color: #0F43FF;
                    }
                }
            }
        }
    }

	.button-cover {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		margin-top: 124 * @aw;

		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 560 * @aw;
			height: 48px;
			border-radius: 24px;
			background-color: #111;
			color: #FFF;
			font-size: 16px;
			line-height: 28px;

			&:active {
				opacity: .7;
			}
		}
	}
}
</style>
