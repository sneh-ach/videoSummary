"use client";

import React from "react";
import Frame from "./Frame";

const LinkInput = ({ value, onChange, handleSubmit }) => {
	return (
		<Frame>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<h1 className="block font-semibold text-lg mb-3">
					Insert a youtube video URL
				</h1>
				<div className="flex flex-row justify-between">
					<input
						className="w-11/12 my-1 bg-[#ECECF1] dark:bg-light-grey p-4 rounded-md dark:text-zinc-300 text-sm"
						type="text"
						value={value}
						onChange={onChange}
					/>
					<button className="ml-2" type="submit">
						<img
							className="w-12 align-middle"
							src="/assets/iconSend.svg"
							alt="send icon SVG"
						/>
					</button>
				</div>
			</form>
		</Frame>
	);
};

export default LinkInput;
