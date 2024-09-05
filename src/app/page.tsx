"use client";
import Game from "./components/Game";

export default function Home() {
    return (
        <div className="h-screen bg-gradient-to-tr from-slate-700 to-slate-950 ">
            <Game />
        </div>
    );
}
