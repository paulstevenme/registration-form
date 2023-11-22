import { Box, Button, Typography } from "@mui/material";
import "./App.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React from "react";
import BasicDetailsStep from "./components/BasicDetailsStep";
import AddressDetailsStep from "./components/AddressDetailsStep";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewDetailsStep from "./components/PreviewDetailsStep";

function App() {
  const steps = ["Fill Basic Details", "Fill Address", "Preview & Submit"];

  const [activeStep, setActiveStep] = React.useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter First Name!"),
      lastName: Yup.string().required("Please Enter Last Name!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please Enter Email!"),
      phone: Yup.string().required("Please Enter Phone No.!"),
    })
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      alert("Form submitted successfully");
      formik.resetForm(); 
      setActiveStep(0); 
    } else {
      formik.validateForm().then((errors) => {
        const numberOfErrors = Object.keys(errors).length;
        if (numberOfErrors === 0) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const touchedFields = {};
          Object.keys(errors).forEach((field) => {
            touchedFields[field] = true;
          });
          formik.setTouched(touchedFields);
        }
      });
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 5,
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h3" fontWeight={"600"} sx={{ textAlign: "center" }}>
        Registration Form
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ height: "450px" }}>
        {activeStep === 0 && <BasicDetailsStep formik={formik} />}
        {activeStep === 1 && <AddressDetailsStep formik={formik} />}
        {activeStep === 2 && <PreviewDetailsStep formik={formik} />}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default App;
