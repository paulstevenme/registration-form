import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const AddressDetailsStep = ({ formik }) => {
  const textFieldAutoCompleteRef = useRef(null);

  const loadAutocomplete = (ref) => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      ref.current,
      { types: ["address"], componentRestrictions: { country: "IN" } }
    );
    autocomplete.addListener("place_changed", () => {
      const addressObject = autocomplete.getPlace();
      const addressComponents = addressObject.address_components;

      const getComponent = (type) =>
        addressComponents.find((component) => component.types.includes(type))
          ?.long_name || "";

      formik.setFieldValue(
        "addressLine1",
        getComponent("street_number") + " " + getComponent("route"),
        true
      );
      formik.setFieldValue(
        "addressLine2",
        getComponent("sublocality_level_1") || getComponent("sublocality"),
        true
      );
      formik.setFieldValue("city", getComponent("locality"), true);
      formik.setFieldValue(
        "state",
        getComponent("administrative_area_level_1"),
        true
      );
      formik.setFieldValue("country", getComponent("country"), true);
      formik.setFieldValue("pincode", getComponent("postal_code"), true);

      const latLng = {
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      };
      console.log({ latLng });
    });
  };

  useEffect(() => {
    if (!window.google && process.env.REACT_APP_GOOGLE_MAPS_KEY) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
        () => {
          loadAutocomplete(textFieldAutoCompleteRef);
        }
      );
    }
  }, []);

  return (
    <Box display={"flex"} gap={1.6} flexDirection={"column"}>
      <TextField
        id="addressLine1"
        name="addressLine1"
        label="Address Line 1"
        variant="outlined"
        InputProps={{ inputRef: textFieldAutoCompleteRef }}
        onChange={formik.handleChange}
        value={formik.values.addressLine1}
        onBlur={formik.handleBlur}
        helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
        error={
          formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
        }
        fullWidth
      />
      <TextField
        id="addressLine2"
        label="Address Line 2"
        variant="outlined"
        value={formik.values.addressLine2}
        onChange={formik.handleChange}
        error={
          formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
        }
        helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
        fullWidth
      />
      <TextField
        id="city"
        label="City"
        variant="outlined"
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        fullWidth
      />
      <TextField
        id="state"
        label="State"
        variant="outlined"
        value={formik.values.state}
        onChange={formik.handleChange}
        error={formik.touched.state && Boolean(formik.errors.state)}
        helperText={formik.touched.state && formik.errors.state}
        fullWidth
      />
      <TextField
        id="country"
        label="Country"
        variant="outlined"
        value={formik.values.country}
        onChange={formik.handleChange}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
        fullWidth
      />
      <TextField
        id="pincode"
        label="Pincode"
        variant="outlined"
        value={formik.values.pincode}
        onChange={formik.handleChange}
        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
        helperText={formik.touched.pincode && formik.errors.pincode}
        fullWidth
      />
    </Box>
  );
};

export default AddressDetailsStep;
