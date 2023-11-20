<template>
	<Teleport to="body">
		<div class="overlay"></div>
		<div class="popup dialog">
			<div class="dialog-content">
				<div class="dialog-title">{{title}}</div>
				<div class="dialog-text">
					<slot name="default"></slot>
				</div>
			</div>
			<div class="dialog-button" @click="confirm">知道了</div>
		</div>
	</Teleport>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'MyDialog',
	emits: ['confirm'],
	props: {
		title: {
			type: String,
			default: "提示",
		}
	},
	setup(props, context) {
		const confirm = (): void => {
            context.emit('confirm')
        }

		return {
			confirm,
		}
	}
});
</script>

<style lang='less' scoped>
.overlay {
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .3);
	z-index: 999;
}
.popup {
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
}

.dialog {
	position: fixed;
	top: 45%;
	left: 50%;
	width: 320px;
	max-height: 100%;
	border-radius: 16px;
	background-color: #fff;
	transform: translate3d(-50%, -50%, 0);
	transition: .3s;
	animation: fade .3s;
	transition-property: transform, opacity;
	overflow: hidden;
	z-index: 999;
	@keyframes fade {
		from {
			opacity: 0;
			transform: translate3d(-50%, -50%, 0) scale(.7);
		}
		to {
			opacity: 1;
			transform: translate3d(-50%, -50%, 0) scale(1);
		}
	}

	.dialog-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 94px;
		padding: 20px 12px;
		box-sizing: border-box;

		.dialog-title {
			width: 100%;
			margin-bottom: 8px;
			color: #111;
			font-size: 18px;
			line-height: 26px;
			text-align: center;
			font-weight: 600;
			word-break: break-all;
		}

		.dialog-text {
			width: 100%;
			color: #666;
			font-size: 14px;
			line-height: 20px;
			text-align: center;
			word-break: break-all;
		}
	}

	.dialog-button {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 48px;
		color: #0F43FF;
		font-size: 18px;
		line-height: 24px;
		overflow: hidden;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 1px;
			transform: translateY(-50%);
			background-color: #E5E5E5;
		}

		&:active {
			opacity: .5;
		}
	}
}
</style>
