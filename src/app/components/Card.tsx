import Image from "next/image";
import "../styles/styles.css";

export interface Card {
    suit: string;
    value: string;
}

export const Card: React.FC<Card> = ({ suit, value }) => {
    const suitImagePath = `./${suit}.svg`;

    return (
        <div className="w-28 h-44 bg-gradient-to-tl from-zinc-400 to-zinc-50 rounded-[15px] p-4 flex flex-col justify-between shadow-xl text-left">
            <div className="text-5xl font-bold">{value}</div>
            <span className="self-end">
                <Image
                    src={suitImagePath}
                    alt={`${suit} suit`}
                    height={55}
                    width={55}
                />
            </span>
        </div>
    );
};

export default Card;