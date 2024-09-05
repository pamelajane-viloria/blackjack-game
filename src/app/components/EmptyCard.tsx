import Image from "next/image";
import "../styles/styles.css";

export const EmptyCard= () => {
    return (
        <div className="flex gap-3 m-5">
            <div className="w-28 h-44 border-2 border-dashed rounded-[15px] border-zinc-500 flex justify-center content-center">
                <Image
                    src="./cards.svg"
                    alt="Cards"
                    height={55}
                    width={55}
                />
            </div>
            <div className="w-28 h-44 border-2 border-dashed rounded-[15px] border-zinc-500 flex justify-center content-center">
                <Image
                    src="./cards.svg"
                    alt="Cards"
                    height={55}
                    width={55}
                />
            </div>
        </div>
    );
};

export default EmptyCard;