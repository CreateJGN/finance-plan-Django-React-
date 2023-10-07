import { useState } from "react";

import "./withdraw.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

const defaultFormFields = {
  amount: ""
};

const Withdraw = ({ newTransactionHandler }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { amount } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    newTransactionHandler(formFields.amount, "WITHDRAWAL");

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="withdraw-container">
      <h3>Withdraw</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ amount }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Withdraw</Button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;