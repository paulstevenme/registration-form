import { Box, Typography,Stack } from "@mui/material";
import React from "react";

const PreviewDetailsStep = ({ formik }) => {
  const dataToPreview = {
    "First Name": formik.values.firstName,
    "Last Name": formik.values.lastName,
    Email: formik.values.email,
    Phone: formik.values.phone,
    "Address Line 1": formik.values.addressLine1,
    "Address Line 2": formik.values.addressLine2,
    City: formik.values.city,
    State: formik.values.state,
    Country: formik.values.country,
    Pincode: formik.values.pincode,
  };
  return (
    <Box pt={10}>
      <Box display={'flex'} gap={5} flexWrap={'wrap'}>
        {Object.keys(dataToPreview).map((item, index) => (
          <Stack key={index}>
            <Typography sx={{opacity:"0.6"}}>{item}</Typography>
            <Typography sx={{fontWeight:"600", fontSize:"18px"}}>{dataToPreview[item]}</Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default PreviewDetailsStep;
