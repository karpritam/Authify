import React from "react";
import Menubar from "../Components/Menubar";
import Header from "../Components/Header";

const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Menubar />
			<Header />
		</div>
	);
};

export default Home;
