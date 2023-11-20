import { Suspense, useEffect } from "react";

import CookieUtil from "@/utils/StorageUtils/CookieUtil"

export default function HomeComponent() {

	useEffect(() => {
		// setA(100000111111)
		CookieUtil.set({
			name: "hm",
			value: "homecomponents",
			path: "/home",
			expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
		})

		console.log("getAll", CookieUtil.getAll());
		
	}, [])

	const onChange = () => {
		// console.log(CookieUtil.getAll());
		console.log(document.cookie);
		
	};

	/* const old = Date.now()
	let now = Date.now()
	while(now-old < 3*1000) {
		now = Date.now()
	} */

	return (
		<div onClick={onChange}>HomeComponent...</div>
	)
}
