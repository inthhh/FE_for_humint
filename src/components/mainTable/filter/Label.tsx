import { LabelComponentProps } from "../../../interfaces/interfaceTable";

function LabelComponent({ label, currentValue, isDropdownView, handleClick, buttonCSS }: LabelComponentProps) {
    return (
        <label onClick={handleClick}>
            <button className={buttonCSS}>
                {label}: {currentValue || "ALL"} {isDropdownView ? "▲" : "▼"}
            </button>
        </label>
    );
}

export default LabelComponent;
