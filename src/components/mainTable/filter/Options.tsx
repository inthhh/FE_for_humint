import React from "react";
import { OptionsComponentProps } from "../../../interfaces/interfaceTable";

function OptionsComponent({ options, handleOptionClick, dropdownCSS }: OptionsComponentProps) {
    return (
        <ul
            style={{
                listStyle: "none",
                position: "absolute",
                zIndex: 9,
                maxHeight: "300px",
                overflowY: "auto",
                margin: 0,
                padding: 0,
            }}
        >
            {options.map((option, i) => (
                <li
                    key={i}
                    className={dropdownCSS}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleOptionClick(option)}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
}

export default OptionsComponent;