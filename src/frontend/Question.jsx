"use client";

import React from "react";
import { useState, useEffect } from "react";

const Question = ({ question, isOpen }) => {
	const [rotateclass, setRotateclass] = useState("rotate-0");
	const [roundedclass, setRoundedclass] = useState(
		"flex flex-row bg-white dark:bg-grey items-center justify-start w-full p-3 rounded-t-lg"
	);

	useEffect(() => {
		if (!isOpen) {
			setRotateclass("transform rotate-90");
			setRoundedclass(
				"flex flex-row bg-white dark:bg-grey items-center justify-start w-full p-3 rounded-lg border-2 border-gray-300"
			);
		} else {
			setRotateclass("transform rotate-0");
			setRoundedclass(
				"flex flex-row bg-white dark:bg-grey items-center justify-start w-full p-3 rounded-t-lg border-2 border-gray-300"
			);
		}
	}, [isOpen]);
	return (
		<div className={roundedclass}>
			<img
				src={"/assets/userIcon.svg"}
				alt="user icon"
				className="w-10 h-10 mr-2"
			/>
			<p className="text-black dark:text-white text-sm pl-2">{question}</p>
			<img
				src={"/assets/qnaArrow.svg"}
				alt="arrow icon"
				className={`w-5 h-5 ml-auto ${rotateclass}`}
			/>
		</div>
	);
};

export default Question;
