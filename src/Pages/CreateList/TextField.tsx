import { StyledLabel } from "./StyledLabel"
import { StyledInput } from "./StyledInput"

export function TextField({ label }) {
    return (
        <label>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput type="text" placeholder="Enter list name" />
        </label>           
    )
}