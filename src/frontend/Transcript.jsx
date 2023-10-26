"use client";

import React, { useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import Accordion from "./Accordion";

const Transcript = () => {
	const { state, dispatch } = useContext(MainContext);

	return (
		<div className="">
			<Accordion heading={"Video Transcript"}>
				<div className="max-h-20 overflow-x-hidden">
					{state?.transcript?.map((item, index) => {
						return (
							<span className="" key={index}>
								{item.text.concat(" ")}
							</span>
						);
					})}
				</div>
			</Accordion>
		</div>
	);
};

export default Transcript;
