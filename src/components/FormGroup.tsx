import React from 'react';

interface FormGroupProps {
  name: string;
  id: string;
  options: { label: string, code: string | number }[];
  handler: (e: any) => void
}

const FormGroup: React.FC<FormGroupProps> = ({ name, id, options, handler }) => {
  return (
    <div className="form-group">
      <label className="form-label">{name}</label>
      <select id={id} name={name} className="form-control" onChange={handler}>
        {options.map((option, index) => (
          <option value={option.code} key={`${id}-${index}`}>{option.label}</option>
        ))}
      </select>

    </div>
  )
}
export default FormGroup;