"use client";

import React from "react";

const Modal = ({ onClick }) => {
	return (
		<>
			<div className="absolute w-full h-full top-0 left-0 z-20 bg-black opacity-70"></div>
			<div
				className="fixed z-30 p-8 rounded-xl drop-shadow-lg bg-gradient-to-r from-teal-300 to-emerald-600"
				style={{ top: "30%", left: "33vw", width: "33vw", height: "20vw" }}
			>
				<div
					className="fixed z-30 flex flex-col bg-[#2B2C2F] p-8 rounded-xl drop-shadow-lg text-white"
					style={{ top: "4%", left: "2%", width: "96%", height: "92%" }}
				>
					<p className="text-3xl my-5 text-center font-bold">
						Submitting a new video
					</p>
					<div className="flex flex-col items-start px-4 text-xl font-normal">
						<p>Your current conversation history will be lost.</p>
						<p>Are you sure you want to proceed?</p>
						<div className="w-full h-px bg-gradient-to-r from-teal-300 to-emerald-600 mt-8 mb-6"></div>
						<div className="w-full flex flex-row justify-between text-lg font-bold">
							<span
								className="hover:text-teal-300 cursor-pointer"
								onClick={() => onClick("no")}
							>
								No, go back
							</span>
							<span
								className="hover:text-emerald-600 cursor-pointer"
								onClick={() => onClick("yes")}
							>
								Yes, proceed
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
