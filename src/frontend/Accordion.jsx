"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const Accordion = ({ heading, children }) => {
	const [open, setOpen] = useState(false);
	const [rotateclass, setRotateclass] = useState("w-5 h-5 ml-auto rotate-0");
	const [roundedclass, setRoundedclass] = useState(
		"w-full flex dark:bg-zinc-800 p-5 rounded-t-xl font-semibold text-lg"
	);
	const [darkmodeclass, setDarkmodeclass] = useState("");
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has("darkmode")) {
			if (searchParams.get("darkmode") === "true") {
				setDarkmodeclass("w-full dark");
			} else {
				setDarkmodeclass("w-full shadow-xl");
			}
		}
	}, [searchParams]);

	useEffect(() => {
		if (!open) {
			setRotateclass("w-5 h-5 ml-auto transform rotate-90");
			setRoundedclass(
				"w-full flex bg-white dark:bg-zinc-800 p-5 rounded-xl font-semibold text-lg border-[#ECECF1] border-solid border-1 dark:border-0"
			);
		} else {
			setRotateclass("w-5 h-5 ml-auto transform rotate-0");
			setRoundedclass(
				"w-full flex bg-white dark:bg-zinc-800 p-5 rounded-t-xl font-semibold text-lg border-[#ECECF1] border-solid border-2 dark:border-0 "
			);
		}
	}, [open]);

	return (
		<div
			className={darkmodeclass}
			onClick={() => {
				setOpen(!open);
			}}
		>
			<h1 className={roundedclass}>
				{heading}
				<img
					src={"/assets/qnaArrow.svg"}
					alt="arrow icon"
					className={rotateclass}
				/>
			</h1>

			{open && (
				<div
					className={
						"w-full flex bg-white dark:bg-light-grey p-5 overflow-hidden rounded-bl-xl rounded-br-xl"
					}
				>
					<div className={"text-black dark:text-white text-sm"}>{children}</div>
				</div>
			)}
		</div>
	);
};

export default Accordion;
