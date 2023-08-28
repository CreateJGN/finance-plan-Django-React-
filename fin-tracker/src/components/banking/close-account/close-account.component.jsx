import { useState } from "react";

import "./close-account.styless.scss";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";

const defaultFormFields = {
  confirmDelete: ""
};

const CloseAccount = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { confirmDelete } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="close-account-container">
      <h3>Close Account</h3>
      <h6>Enter 'permanently delete'</h6>

      <form onSubmit={ handleSubmit }>
        <FormInput type="text" required onChange={ handleChange }
                          name="confirmDelete" value={ confirmDelete }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Close</Button>
        </div>
      </form>
    </div>
  );
};

export default CloseAccount;