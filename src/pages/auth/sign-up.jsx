import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpValidationRules } from "@/schema";  // Make sure this path is correct
// import { fetchHandler } from "@/utils/fetchHandler";  // Assuming fetchHandler is imported from utils
import { SIGN_UP } from "@/utils/Endpoint";
import { fetchHandler } from "@/utils/Api";
import { useLoader } from "@/context/LoaderContext";

// Define your sign-up API endpoint
// const SIGN_UP = "/api/auth/signup"; // Replace with your actual API endpoint

export function SignUp() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { setLoader } = useLoader();

  // On form submit, call the API
  const onSubmit = async (data) => {
    try {
      const response = await fetchHandler(SIGN_UP, data, true, setLoader);
      
      console.log("Sign-up successful", response);
      
      reset(); // Reset the form after successful submission
      // Handle success, e.g., navigate to the login page or dashboard
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full mt-2">
        <div className="text-center">
          {/* Company Logo */}
          <img src="/path-to-logo/logo.png" alt="Company Logo" className="mx-auto mb-6 w-24 h-auto" />
          <Typography variant="h2" className="font-bold mb-4">Sign Up</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          {/* Username */}
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Your Username"
              {...register("username", signUpValidationRules.username)}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.username ? "border-red-500" : ""}`}
            />
            {errors.username && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.username.message}
              </Typography>
            )}
          </div>

          {/* Email */}
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              {...register("email", signUpValidationRules.email)}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email.message}
              </Typography>
            )}
          </div>

          {/* Phone */}
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Phone
            </Typography>
            <Input
              size="lg"
              placeholder="Your Phone Number"
              {...register("phone", signUpValidationRules.phone)}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.phone.message}
              </Typography>
            )}
          </div>

          {/* Password */}
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              {...register("password", signUpValidationRules.password)}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password.message}
              </Typography>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-6" fullWidth >
          Register Now
          </Button>

          {/* Already have an account? */}
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
