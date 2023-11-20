<template>
	<div class="index">
		<a-layout style="min-height: 100vh">
			<a-layout-sider theme="light" v-model:collapsed="collapsed" :trigger="null" collapsible>
				<div class="logo">
					<div class="image">
						<a-avatar :size="48">
							<template #icon><UserOutlined /></template>
						</a-avatar>
						<!-- <img src="@/static/image/avatar.png" alt="" /> -->
					</div>
					<div class="name">企业管理平台</div>
				</div>
				<a-menu mode="inline"
				 v-model:openKeys="openKeys"
				 v-model:selectedKeys="selectedKeys"
				 @click="changeRoute"
				>
					<a-menu-item key="/home">
						<template #icon>
							<HomeOutlined />
						</template>
						<span>首页</span>
					</a-menu-item>
					<a-menu-item key="/welfare">
						<template #icon>
							<RotateRightOutlined />
						</template>
						<span>日常补贴发放</span>
					</a-menu-item>
					<a-sub-menu key="statistics">
						<template #icon>
							<TableOutlined />
						</template>
						<template #title>统计查询</template>
						<a-menu-item key="/statistics/tradeanalysis">交易分析</a-menu-item>
						<a-menu-item key="/statistics/reportform">统计报表</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="manage">
						<template #icon>
							<ToolOutlined />
						</template>
						<template #title>企业管理</template>
						<a-menu-item key="/manage/frameman">组织架构管理</a-menu-item>
						<a-menu-item key="/manage/postman">岗位管理</a-menu-item>
						<a-menu-item key="/manage/stafftypeman">员工类型管理</a-menu-item>
						<a-menu-item key="/manage/staffman">员工管理</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-header class="a-layout-header" style="background: #fff; padding: 0">
					<div class="trigger-wrap">
						<menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
						<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
					</div>
					<a-dropdown placement="bottomRight">
						<div class="user-info">
							<div class="image">
								<a-avatar class="avatar" size="small">
									<template #icon><UserOutlined /></template>
								</a-avatar>
								<!-- <a-avatar class="avatar" size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" /> -->
								<!-- <img class="avatar" src="@/static/image/avatar.png" alt="" /> -->
							</div>
							<div class="user-name">{{username}}</div>
						</div>
						<template v-slot:overlay>
							<a-menu>
								<a-menu-item key="logout" @click="handleLogout">
									<template #icon>
										<LogoutOutlined />
									</template>
									<span>退出登录</span>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</a-layout-header>
				<a-layout-content
					:style="{ margin: '24px 16px', position: 'relative', background: '#F0F2F5', minHeight: '280px' }">
					<router-view></router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>
<script>
import { createVNode, defineComponent, ref, watchEffect, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { Layout, Menu, Dropdown, Avatar, Modal } from 'ant-design-vue'
import {
	UserOutlined,
	HomeOutlined,
	RotateRightOutlined,
	TableOutlined,
	ToolOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	LogoutOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons-vue';

const { Sider, Header, Content } = Layout;
const { SubMenu, Item } = Menu;

export default defineComponent({
	name: 'Index',
	components: {
		[Layout.name]: Layout,
		[Sider.name]: Sider,
		[Header.name]: Header,
		[Content.name]: Content,
		[Menu.name]: Menu,
		[SubMenu.name]: SubMenu,
		[Item.name]: Item,
		[Dropdown.name]: Dropdown,
		[Avatar.name]: Avatar,
		UserOutlined,
		HomeOutlined,
		RotateRightOutlined,
		TableOutlined,
		ToolOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		LogoutOutlined,
		ExclamationCircleOutlined,
	},

	setup() {
		const route = useRoute()
		const router = useRouter()

		const username = sessionStorage.getItem('username') || ''     // 用户名
		const collapsed = ref(false)                                  // 侧边栏收起状态
		const openKeys = ref([])                                      // 当前展开的 SubMenu 菜单项 key 数组
		const selectedKeys = ref([])                                  // 当前选中的菜单项 key 数组
		
		onMounted(() => {
			_initSider()
		})

		// 初始化侧边栏
		const _initSider = () => {
			const { name } = route
			const welfare = ['dailygrant']
			const statistics = ['tradeanalysis', 'reportform']
			const manage = ['framemanindex', 'postmanindex', 'stafftypemanindex', 'staffmanindex']
			if (welfare.includes(name)) {
				selectedKeys.value = ['/welfare']
			} else if (statistics.includes(name)) {
				openKeys.value = ['statistics']
				selectedKeys.value = [`/statistics/${name}`]
			} else if (manage.includes(name)) {
				openKeys.value = ['manage']
				const slicename = name.slice(0, -5)
				selectedKeys.value = [`/manage/${slicename}`]
			} else {
				selectedKeys.value = [`/${name}`]
			}
			
		}
		
		/**
		 * 
		 * @param {*} key 
		 * @param {*} keyPath 
		 */
		const changeRoute = ({key, keyPath}) => {
			console.log('keyPath', keyPath);
			router.push(key)
		}
		
		// 退出登录
		const handleLogout = () => {
			Modal.confirm({
				icon: () => createVNode(ExclamationCircleOutlined),
				title: "信息",
				content: "您确定要注销吗",
				onOk: () => {
					sessionStorage.clear()
					router.push({ name: 'login' })
				},
				onCancel () {}
			})
		}

		// 监测路径变化
		watchEffect(_initSider)

		return {
			username,
			collapsed,
			openKeys,
			selectedKeys,

			changeRoute,
			handleLogout,
		};
	},
});
</script>
<style lang="less" scoped>
@import "../../style/default.less";
.index {
	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 150px;

		.image {
			width: 48px;
			height: 48px;
			border-radius: 50%;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			padding: 0 5px;
			margin-top: 20px;
			color: @primary-color;
			text-align: center;
		}

	}
	.a-layout-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.trigger-wrap {
			.trigger {
				font-size: 18px;
				line-height: 64px;
				padding: 0 24px;
				cursor: pointer;
				transition: color 0.3s;
				&:hover {
					color: #1890ff;
				}
			}
		}
		
		.user-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
			padding: 0 24px;
			box-sizing: border-box;
			&:hover {
				background-color: #F7F7F7;
			}

			.image {
				display: inline-block;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				overflow: hidden;

				.avatar {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.user-name {
				margin-left: 8px;
				color: rgba(0, 0, 0, .65);
				font-size: 14px;
			}
		}
	}
}
</style>
