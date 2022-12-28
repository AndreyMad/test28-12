import React, { useEffect, useState } from "react"
import { FormControl, TextField, FormControlLabel, RadioGroup } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { addUser, getPositionsApi } from "../api/api";
import CustomizedRadioButton from "../components/CustomizedRadioButton";
import FileUploadBtn from "../components/FileUploadBtn";
import SuccesMessage from "../components/SuccesMessage";
import Loader from "../components/Loader";

const FormSection = ({ updateCards }) => {
  const [positions, setPositions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [radioValue, setRadioValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccesCreated, setIsSuccesCreated] = useState(false);

  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const phoneRegex = /^(?:\+38)?(?: )?(?:\([0-9]{3}\)[ .-]?[0-9]{3}([ .-]|( - ))?[0-9]{2}([ .-]|( - ))?[0-9]{2})$/;

  const getPositions = async () => {
    const { data: { positions } } = await getPositionsApi();
    setPositions(positions);
  };

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    if (name && email && phone && radioValue && file) {
      setIsFormDisabled(false);
    }
  }, [name, email, phone, radioValue, file]);

  const validateHandler = (value, entity) => {
    switch (entity) {
      case "name":
        value.length >= 2 && value.length < 60 ? setNameError("") : setNameError("Name length must be between 2 and 60 characters");
        break;
      case "email":
        emailRegex.test(value) ? setEmailError("") : setEmailError("Please enter valid email");
        break;
      case "phone":
        phoneRegex.test(value) ? setPhoneError(false) : setPhoneError(true);
        break;
      default: return;
    };
  };

  const changeHandler = (value, entity) => {
    switch (entity) {
      case "name":
        if (nameError && value.length >= 2 && value.length < 60) {
          setNameError("");
        }
        setName(value);
        break;
      case "email":
        if (emailError && emailRegex.test(value)) {
          setEmailError("");
        }
        setEmail(value);
        break;
      case "phone":
        if (phoneError && phoneRegex.test(value)) {
          setPhoneError(false);
        }
        setPhone(value);
        break;
      default: return;
    };
  };

  const radioChangeHandler = ({ target }) => {
    setRadioValue(target.value);
  };

  const formSubmitHandler = async () => {
    if (name && email && phone && radioValue && file && !isFormDisabled) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone.replace(/[^+\d]/g, ''));
      formData.append('position_id', radioValue);
      formData.append('photo', file);
      try {
        const { data: { success } } = await addUser(formData);
        if (success) {
          setIsSuccesCreated(true);
          setTimeout(() => {
            clearForm();
            setIsSuccesCreated(false);
            updateCards();
          }, 3000)
        }
      } catch (err) {
        NotificationManager.error(err.response?.data?.message || 'Something went wrong', '', 3000)
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setRadioValue("");
    setFile(null);
    setFileName("");
    setIsFormDisabled(true);
  };

  return (
    <section id="form" className="formSection__container">
      <h2 className="formSection__title">Working with POST request</h2>
      {isLoading ? <Loader /> : null}
      {isSuccesCreated ? <SuccesMessage /> : null}
      <FormControl className="formSection__wrapper">
        <TextField
          fullWidth
          label="Your name"
          variant="outlined"
          error={nameError.length > 0}
          value={name}
          helperText={nameError || ""}
          className="formSection__textInput"
          onChange={({ target }) => changeHandler(target.value, 'name')}
          onBlur={({ target }) => validateHandler(target.value, 'name')}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          className="formSection__textInput"
          value={email}
          error={emailError.length > 0}
          helperText={emailError || ""}
          onChange={({ target }) => changeHandler(target.value, 'email')}
          onBlur={({ target }) => validateHandler(target.value, 'email')}

        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          className="formSection__textInput"
          value={phone}
          error={phoneError}
          helperText={"+38 (XXX) XXX - XX - XX"}
          onChange={({ target }) => changeHandler(target.value, 'phone')}
          onBlur={({ target }) => validateHandler(target.value, 'phone')}
        />
        <RadioGroup
          name="Position radio group"
          value={radioValue}
          onChange={radioChangeHandler}
        >
          <span className="formSection__labelTitle">Select your position</span>
          {
            positions.map(({ name, id }) => (
              <FormControlLabel key={id} className="formSection__radioBtn" value={id} control={
                <CustomizedRadioButton />
              }
                label={name} />
            ))
          }
        </RadioGroup>
        <FileUploadBtn setFile={setFile} fileName={fileName} setFileName={setFileName} />
      </FormControl>
      <PrimaryButton
        customStyles={{ marginBottom: "100px" }}
        btnText="Sign Up"
        onClick={formSubmitHandler}
        disabled={isFormDisabled}
      />
      <NotificationContainer />
    </section>
  )
}

export default FormSection;
