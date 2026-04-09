import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Contact from "./Contact";

function App() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
            document.documentElement.style.setProperty("--my", `${e.clientY}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;