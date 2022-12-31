import React from 'react';

interface PropTypes {
  name: string;
  id: string;
  options: { label: string, code: string | number }[];
  handler: (e: any) => void;
  selected: string | number;
}

const FormGroup: React.FC<PropTypes> = ({ name, id, options, handler, selected }) => {
  return (
    <div className="form-group">
      <label className="form-label">{name}</label>
      <select id={id} name={name} className="form-control" onChange={handler} defaultValue={selected}>
        {options.map((option, index) => (
          <option value={option.code} key={`${id}-${index}`}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
export default FormGroup;