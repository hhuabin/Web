import { useEffect, useState, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Modal } from "antd";

export default function PopState() {
	const navigate = useNavigate();
	const location = useLocation();

	const [show, setShow] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handlePopstate = (event: PopStateEvent) => {
		console.log("handlePopstate");
		// 在这里执行 popstate 事件触发时的逻辑
		setIsModalOpen(false)
	};

	useEffect(() => {

		// 添加 popstate 事件监听
		window.addEventListener('popstate', handlePopstate);

		// 在组件卸载时移除事件监听
		return () => {
			window.removeEventListener('popstate', handlePopstate);
		};

	}, []);

	const showModal = () => {
		setIsModalOpen(true);
		window.history.pushState(null, "", "/popstate/1")
	};

	const handleOk = () => {
		setIsModalOpen(false);
		navigate(-1)
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		navigate(-1)
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Open Modal
			</Button>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	)
}