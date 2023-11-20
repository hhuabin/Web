<template>
	<div class="login">
		<div class="title">穗通票企业管理平台</div>
		<div class="info">
			<a-form
			 ref="formRef"
			 :model="formState"
			 :rules="rules"
			>
				<a-form-item name="username">
					<a-input
					 size="large"
					 placeholder="admin"
					 v-model:value.trim="formState.username"
					 @keyup.enter="onSubmit"
					>
						<template #prefix>
							<UserOutlined style="color: #1890ff" />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item name="password">
					<a-input-password
					 size="large"
					 placeholder="888888"
					 v-model:value="formState.password"
					 type="password"
					 @keyup.enter="onSubmit"
					>
						<template #prefix>
							<LockOutlined style="color: #1890ff" />
						</template>
					</a-input-password>
				</a-form-item>
				<a-form-item>
					<a-button
					 type="primary"
					 block size="large"
					 :loading="logging"
          			 :disabled="logging"
					 @click="onSubmit"
					>
						登录
					</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Form, Input } from 'ant-design-vue'
import {
	UserOutlined,
	LockOutlined,
} from '@ant-design/icons-vue';
import md5 from 'md5'
const { Item } = Form
const { Password } = Input

import { login } from '@/api/index'
export default defineComponent({
	name: 'Login',
	components: {
		[Button.name]: Button,
		[Form.name]: Form,
		[Item.name]: Item,
		[Input.name]: Input,
		[Password.name]: Password,
		UserOutlined,
		LockOutlined,
	},
	setup() {
		const router = useRouter()

		const logging = ref(false)            // 登录中状态
		const formState = reactive({          // 校验参数
			username: '',
			password: '',
		})

		// 校验规则
		const rules = {
			username: [
				{
					required: true,
					message: '请输入账户名',
					trigger: 'blur',
				}
			],
			password: [
				{
					required: true,
					message: '请输入密码',
					trigger: 'blur',
				}
			]
		}

		// 登录
		const onSubmit = () => {
			logging.value = true
			const { username, password } = toRaw(formState)
			if(!username || !password) {
				return
			}
			const pwd = md5(password).toUpperCase()
			login({
				username: username,
				password: pwd,
			})
			.then(res => {
				new Promise((resolve, reject) => {
					const { token, enterpriseId } = res
					sessionStorage.setItem('username', username)
					sessionStorage.setItem('token', token)
					sessionStorage.setItem('enterpriseId', enterpriseId)
					logging.value = false
					resolve()
				})
				.then(() => {
					router.replace('/home')
				})
			})
			.catch(err => {
				logging.value = false
				console.error(err);
			})
		}

		return {
			logging,
			formState,
			rules,

			onSubmit,
		}
	}
});
</script>

<style lang='less' scoped>
.login {
	position: absolute;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 500px;
	margin: 150px auto;

	.title {
		color: #000;
		text-align: center;
		font-size: 36px;
		font-weight: 600;
	}

	.info {
		width: 400px;
		margin-top: 50px;
	}
}
</style>
