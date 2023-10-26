"use client";

import React from "react";

const LinkInput = ({ value, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<div className="flex w-full flex-row justify-between py-1">
				<input
					className="w-11/12 dark:bg-grey p-4 rounded-lg text-teal-500 dark:text-zinc-300 placeholder-emerald-500 text-lg focus- placeholder-[#B0D5E1] outline-none border-2 dark:border-0 border-teal-300 drop-shadow-[0px_0px_8px_rgba(166,255,223,0.90)] dark:drop-shadow-none"
					type="text"
					value={value}
					onChange={onChange}
					placeholder="Insert a youtube video URL"
				/>
				<button
					className="ml-5 w-40 text-black text-lg bg-[#0DEFE1] rounded-lg font-semibold bg-gradient-to-r from-[#0DEFE1] to-[#78FF96]"
					type="submit"
				>
					Get Started
				</button>
			</div>
		</form>
	);
};

export default LinkInput;
