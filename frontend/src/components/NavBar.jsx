import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
	const navigate = useNavigate();
	return (
		<nav className="bg-gray-800/80 backdrop-blur-md fixed w-full z-10 top-0 shadow-md">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				<div className="text-2xl font-bold flex items-center gap-2 hover:cursor-pointer">
					<span role="img" aria-label="cart">
						🛒
					</span>{" "}
					<h1 onClick={() => navigate("/")}>Dalla Galla</h1>
				</div>
				<div className="flex items-center gap-6">
					<Button
						variant="ghost"
						className="text-white hover:bg-gray-600 hover:text-white transition-colors duration-300"
						onClick={() => navigate("/")}
					>
						Home
					</Button>
					<Button
						variant="ghost"
						className="text-white hover:bg-blue-600 hover:text-white transition-colors duration-300"
						onClick={() => navigate("/admin-dashboard")}
					>
						Admin
					</Button>
					<Button
						variant="ghost"
						className="text-white hover:bg-gray-600 hover:text-white transition-colors duration-300"
					>
						Contact
					</Button>
				</div>
			</div>
		</nav>
	);
}
