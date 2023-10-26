import React, { useEffect, useReducer } from "react";
import LandingLinkInput from "../src/frontend/LandingLinkInput";
import { useRouter } from "next/router";
import { useState } from "react";

const Landing = () => {
	const router = useRouter();
	const [link, setLink] = useState("");
	const [darkmode, setDarkmode] = useState(true);
	const [darmodeClass, setDarkmodeclass] = useState(
		"App w-screen h-screen dark overflow-hidden"
	);
	const [toggleclass, setToggleclass] = useState(
		"relative w-6 h-6 top-1 left-px bg-white rounded-full shadow-md toggle-checkbox cursor-pointer"
	);
	const [textclass, setTextclass] = useState("");

	useEffect(() => {
		if (darkmode) {
			setDarkmodeclass("App w-screen h-screen dark overflow-hidden");
			setToggleclass(
				"relative w-6 h-6 top-1 bg-white rounded-full shadow-md toggle-checkbox cursor-pointer -translate-x-0.5 transition duration-300"
			);
		} else {
			setDarkmodeclass("App w-screen h-screen overflow-hidden");
			setToggleclass(
				"relative w-6 h-6 top-1 bg-white rounded-full shadow-md toggle-checkbox cursor-pointer translate-x-0.5 transition duration-300"
			);
		}
	}, [darkmode]);

	const onChange = (e) => {
		setLink(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		router.push(`/home?link=${link}&darkmode=${darkmode}`);
	};

	return (
		<div className={darmodeClass}>
			<div
				className="px-[5vw] h-full w-full flex flex-row items-center justify-center text-black dark:text-white bg-white dark:bg-black"
				id="main-content"
			>
				<div
					className="flex flex-col relative z-10 mt-[-100px]"
					style={{ width: "40em" }}
				>
					{" "}
					{/* <-- Added mt-[-20] here */}
					<p className="self-center my-2 drop-shadow-['0px 0px 22px rgba(123, 159, 174, 0.70)] bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent dark:text-[#F2F4FB] text-[140px] leading-[8rem] font-semibold font-['Syne']">
						synthesis
					</p>
					<p className="my-2 text-black dark:bg-gradient-to-r from-[#D7FFF0] to-[#7BFFCF] font-['Syne'] dark:bg-clip-text dark:text-transparent text-[55px] font-semibold">
						where curiosity thrives.
					</p>
					<p className="my-2 text-black dark:text-[#B0D5E1] text-[22px] mb-8">
						reimagining the video learning experience, empowering you to master
						any topic on the web.
					</p>
					<LandingLinkInput
						onChange={onChange}
						value={link}
						onSubmit={onSubmit}
					/>
				</div>
				{darkmode ? (
					<img
						src="/assets/bird.svg"
						className="absolute bottom-[30%] right-[20%] w-[10vw] h-[10vw] object-contain"
						alt="bird"
					/>
				) : (
					<>
						<img
							src="/assets/borb-landing.svg"
							className="absolute top-[30%] left-[20%] w-[7vw] h-[7vw] object-contain"
							alt="bird"
						/>
						<span className="absolute top-[17%] left-[31%] px-3 py-2 bg-gradient-to-r from-teal-300 to-emerald-400 text-white text-xl rounded-lg z-30">
							for kids
						</span>
					</>
				)}
			</div>
			<img
				className="absolute bottom-0 z-0 w-full h-full"
				src={
					darkmode
						? "assets/landingBackground.png"
						: "assets/landingBackground-l.png"
				}
			></img>
			<div className="absolute flex flex-row items-center top-16 right-8">
				{darkmode ? (
					<div
						className={
							"w-16 h-8 flex flex-row justify-between pl-1 pr-3 bg-gray-300 rounded-full bg-gradient-to-r from-teal-700 to-teal-950 text-emerald-200"
						}
						onClick={() => setDarkmode(!darkmode)}
					>
						<button className={toggleclass} />
						<span className="self-center">{darkmode ? "off" : "on"}</span>
					</div>
				) : (
					<div
						className={
							"w-16 h-8 flex flex-row justify-between pl-3 pr-1 bg-gray-300 rounded-full bg-gradient-to-r from-teal-300 to-emerald-400 text-emerald-200"
						}
						onClick={() => setDarkmode(!darkmode)}
					>
						<span className="self-center text-white">
							{darkmode ? "off" : "on"}
						</span>
						<button className={toggleclass} />
					</div>
				)}

				<label
					for="toggle"
					class="toggle-label text-teal-500 dark:text-emerald-200 text-base pl-2"
				>
					kids mode
				</label>
			</div>
		</div>
	);
};

export default Landing;
