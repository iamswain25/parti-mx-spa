import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import {
  UseFormMethods,
  ValidateResult,
} from "react-hook-form/dist/types/form";
import { CountryRegionData } from "react-country-region-selector";
import { client } from "./ApolloSetup";
import { searchDuplicateName } from "../graphql/query";
export default function CountryRegionLocal(props: {
  formControl: UseFormMethods<any>;
}) {
  const { errors, control, watch } = props.formControl;
  const { country } = watch();
  const region =
    CountryRegionData.find(([c]) => c === country)?.[2]
      ?.split("|")
      ?.map((regionPair) => regionPair.split("~")) || [];

  return (
    <>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        as={
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            required={errors.name ? true : false}
            error={errors.name ? true : false}
            helperText={errors.name && errors.name.message}
          />
        }
        rules={{
          required: "Required",
          validate: async function (value): Promise<ValidateResult> {
            const res = await client.query({
              query: searchDuplicateName,
              variables: { name: value },
              fetchPolicy: "network-only",
            });
            if (res.data?.mx_users?.length) {
              return `name already in use`;
            }
            return undefined;
          },
        }}
      />
      <Controller
        name="country"
        control={control}
        defaultValue="Korea, Republic of"
        as={
          <TextField
            label="Country"
            select
            SelectProps={{ native: true }}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {CountryRegionData.map((option, index) => (
              <option key={option[0]} value={option[0]}>
                {option[0]}
              </option>
            ))}
          </TextField>
        }
      />
      <Controller
        name="region"
        control={control}
        defaultValue="Seoul-T'ukpyolshi"
        as={
          <TextField
            label="Region"
            select
            SelectProps={{ native: true }}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {region?.map((option, index) => (
              <option key={option[0]} value={option[0]}>
                {option[0]}
              </option>
            ))}
          </TextField>
        }
      />
      <Controller
        name="local"
        control={control}
        defaultValue=""
        rules={{
          required: "Required",
        }}
        as={
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Local"
            required={errors.local ? true : false}
            error={errors.local ? true : false}
            helperText={errors.local && errors.local.message}
          />
        }
      />
    </>
  );
}
