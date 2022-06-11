import { StyledLabel } from "./StyledLabel"
import { StyledInput } from "./StyledInput"

export function TextField({ label, onChange }) {
    return (
        <label>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput onChange={onChange} type="text" placeholder="Enter list name" />
        </label>           
    )
}
