
const GenderCheckBox = ({onCheckBoxChange, selectedGender}) => {
  return (
    <div className="flex mt-2 gap-2">
        <div className="form-control">
            {/* if selectedgender is true then use classname called selected as well */}
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
                <span className="label-text">Male</span>
                <input 
                checked={selectedGender === "male"}
                onChange={() => onCheckBoxChange("male")}
                type="checkbox" className="checkbox border-slate-900" />
            </label>
        </div>
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <span className="label-text">Female</span>
                <input 
                checked={selectedGender === "female"}
                onChange={() => onCheckBoxChange("female")}
                type="checkbox" className="checkbox border-slate-900" />
            </label>
        </div>
        <div>

        </div>
    </div>
  )
}

export default GenderCheckBox