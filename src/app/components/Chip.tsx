import { Button } from "@/components/ui/button";
import "../styles/styles.css";

interface ChipProps {
    value: number;
    color: string
    onClick: (value: number) => void;
    disabled: boolean;
}

const Chip: React.FC<ChipProps> = ({ value, color, onClick, disabled }) => {
    return (
        <Button className="basis-1/5 py-10 lg:size-[100px] bg-zinc-50/[.06] rounded-2xl hover:bg-gray-950/[.06] disabled:opacity-50" onClick={() => onClick(value)} disabled={disabled}>
            <div className={`${color} outer-dash flex justify-center items-center`}>
                <div className={`${color}-dark inner-dash border-dashed border-2 border-zinc-200 flex justify-center items-center text-sm font-bold`}>{value}</div>
            </div>
        </Button>
    );
}

export default Chip;