import { useEffect, lazy } from "react";

import RenderRoutes from "@/router/RenderRoutes"

export default function App() {

	useEffect(() => {
		const handlePopstate = (event: PopStateEvent) => {
			// 在这里执行 popstate 事件触发时的逻辑
			console.log("App event", event);
		};

		// 添加 popstate 事件监听
		// window.addEventListener('popstate', handlePopstate);
	}, [])

	return (
		<div id="app">
			{RenderRoutes()}
			{/* {element} */}
			{/* <Suspense fallback={<Loading/>}>
				<Routes>
					<Route path="/" element={<Home/>}>
						<Route path="home/:id" element={<HomeComponent/>}/>
					</Route>
					<Route path="/login" element={<Login/>}/>
					<Route path="/redux" element={<Redux/>}/>
				</Routes>
			</Suspense> */}
		</div>
	)
}
