import axios from "axios";
import { useState, createContext, useReducer, useEffect } from "react";
import YouTubeEmbed from "../src/frontend/YouTubeEmbed";
import LinkInput from "../src/frontend/LinkInput";
import Transcript from "../src/frontend/Transcript";
import Chat from "../src/frontend/Chat";
import { MainReducer, initialState } from "../src/reducers/MainReducer";
import { MainContext } from "../src/contexts/MainContext";
import PromptInput from "../src/frontend/PromptInput";
import { useSearchParams } from "next/navigation";
import Modal from "../src/frontend/Modal";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const [state, dispatch] = useReducer(MainReducer, initialState);
	const [id, setId] = useState("");
	const [youtubeID, setYoutubeID] = useState("");
	const [openModal, setopenModal] = useState(false);
	const [confirmed, setConfirmed] = useState("");
	const [darkmode, setDarkmode] = useState(false);
	const [darkmodeclass, setDarkmodeclass] = useState("");
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has("darkmode")) {
			if (searchParams.get("darkmode") === "true") {
				dispatch({ type: "set_darkmode", payload: true});
				setDarkmode(true);
				setDarkmodeclass("App w-screen h-screen static dark overflow-hidden");
			} else {
				dispatch({ type: "set_darkmode", payload: false });
				setDarkmode(false);
				setDarkmodeclass("App w-screen h-screen static overflow-hidden");
			}
		}
	}, [searchParams]);

	useEffect(() => {
		getTranscript();
	}, [youtubeID]);

	useEffect(() => {
		if (confirmed == "yes") {
			router.push(`/home?link=${id}?darkmode=${darkmode}`);
		}
		setopenModal(false);
		setConfirmed("");
	}, [confirmed]);

	const onIdChange = (e) => {
		setId(e.target.value);
	};

	const parseYoutubeID = (url) => {
		if (url.includes("youtu.be")) {
			return url.split("/").pop();
		}
		const urlParams = new URLSearchParams(new URL(url).search);
		return urlParams.get("v");
	};

	const getYoutubeID = () => {
		const videoID = parseYoutubeID(id);

		if (videoID) {
			setYoutubeID(videoID);
		} else {
			console.error("Invalid YouTube URL");
		}
	};

	useEffect(() => {
		if (searchParams.has("link")) {
			const link = searchParams.get("link");
			setYoutubeID(parseYoutubeID(link));
			setId("");
		}
	}, [searchParams]);

	const getTranscript = async () => {
		try {
			const response = await axios.get(`/api/youtube-transcribe/${youtubeID}`);
			dispatch({
				type: "get_transcript",
				payload: response.data.transcript,
			});
		} catch (error) {
			console.error("Error fetching transcript:", error.message);
			dispatch({ type: "error", payload: error.message });
		}
	};

	return (
		<>
			<div className={darkmodeclass}>
				<div
					className="px-[5vw] h-full flex flex-row items-center text-black dark:text-white bg-light dark:bg-dark-grey"
					id="main-content"
				>
					<MainContext.Provider value={{ state, dispatch }}>
						<div
							className="basis-1/2 flex flex-col ml-10 mr-5 z-10"
							id="left-panel"
						>
							<LinkInput
								value={id}
								onChange={onIdChange}
								handleSubmit={() => {
									setopenModal(true);
								}}
							/>

							<br />
							<YouTubeEmbed youtubeID={youtubeID} />
							<br />
							<Transcript />
						</div>
						<div className="basis-1/2 mr-10 ml-5 z-10" id="right-panel">
							<Chat />
							<br />
							<PromptInput />
						</div>
					</MainContext.Provider>
				</div>
			</div>
			{darkmode ? (
				<img
					className="absolute bottom-0 z-0"
					src="assets/background.png"
				></img>
			) : (
				<img
					className="absolute bottom-0 z-0"
					src="assets/background-l.png"
				></img>
			)}

			{openModal && <Modal onClick={setConfirmed} />}
		</>
	);
}
