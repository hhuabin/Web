import { Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const handlePopstate = (event: PopStateEvent) => {
	// 在这里执行 popstate 事件触发时的逻辑
	console.log("Login event", event);
	return
};

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation()

	useEffect(() => {
		console.log("cookie", document.cookie);
	}, [])

	const prevRouter = () => {
		navigate(-1)
	}

	return (
		<>
			<span onClick={prevRouter}><Button type="primary">go back</Button></span>
			<div>Login...</div>
		</>
	)
}