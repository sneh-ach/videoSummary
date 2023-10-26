"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Frame = ({ children }) => {
	const [darkmodeclass, setDarkmodeclass] = useState("");
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has("darkmode")) {
			if (searchParams.get("darkmode") === "true") {
				setDarkmodeclass("bg-zinc-800 p-5 rounded-xl drop-shadow-lg");
			} else {
				setDarkmodeclass("bg-white p-5 rounded-xl drop-shadow-lg");
			}
		}
	}, [searchParams]);

	return <div className={darkmodeclass}>{children}</div>;
};

export default Frame;
