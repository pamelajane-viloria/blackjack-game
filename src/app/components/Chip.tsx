import { Button } from "@/components/ui/button";
import "../styles/styles.css";

interface ChipProps {
    value: number;
    onClick: (value: number) => void;
    disabled: boolean;
}

const Chip: React.FC<ChipProps> = ({ value, onClick, disabled }) => {
    let backgroundColor = "zinc";

    if (value === 5) {
        backgroundColor = "yellow";
    } else if (value === 10) {
        backgroundColor = "green";
    } else if (value === 25) {
        backgroundColor = "blue";
    } else if (value === 50) {
        backgroundColor = "purple";
    } else if (value === 100) {
        backgroundColor = "red";
    }

    return (
        <Button className="h-[100px] w-[100px] bg-zinc-50/[.06] rounded-2xl hover:bg-gray-950/[.06] disabled:opacity-50" onClick={() => onClick(value)} disabled={disabled}>
            <div className={`bg-${backgroundColor}-700 outer-dash flex justify-center items-center`}>
                <div className={`bg-${backgroundColor}-900 inner-dash border-dashed border-2 border-zinc-200 flex justify-center items-center text-sm font-bold`}>{value}</div>
            </div>
        </Button>
    );
}

export default Chip;