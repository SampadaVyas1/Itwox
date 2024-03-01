import React, { createContext, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validationSchema";
import { Label } from "tamagui";
import classes from "./signIn.module.scss";
import { Button } from "tamagui";
import { useNavigate } from "react-router-dom";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
}

interface FormData {
  email: string;
  password: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} className={classes.inputField} />;
});

// const context = createContext("");

const SignIn = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    navigate("/dashboard");
  };

  return (
    <div className={classes.signInContainer}>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.sectionWrapper}>
            <div className={classes.label}>Email*</div>
            <InputField
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={classes.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={classes.sectionWrapper}>
            <div className={classes.label}>Password*</div>
            <InputField
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className={classes.error}>{errors.password.message}</p>
            )}
          </div>
          <Button className={classes.submitButton}>Submit</Button>
          {/* <button type="submit" className={classes.submitButton}>
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
