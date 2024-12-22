import React from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { fetchHandler } from "@/Api"; // Import the fetchHandler
import { signInValidationRules } from "@/schema"; // Import validation rules
import { fetchHandler } from "@/utils/Api";
import { SIGN_IN } from "@/utils/Endpoint";
import { useLoader } from "@/context/LoaderContext";

export function SignIn() {
  const { setLoader } = useLoader(); // Get setLoader from context
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetchHandler(SIGN_IN, data, true,setLoader); // Use fetchHandler with loader
      console.log("Sign-in successful", response);
      reset(); 
      // Handle success, e.g., navigate to a dashboard
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full mt-2">
        <div className="text-center">
          {/* Company Logo */}
          <img 
            src="/path-to-logo/logo.png" 
            alt="Company Logo" 
            className="mx-auto mb-6 w-24 h-auto"
          />
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-3">
            {/* Email Field */}
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", signInValidationRules.email)}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email.message}
              </Typography>
            )}

            {/* Password Field */}
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", signInValidationRules.password)}
            />
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password.message}
              </Typography>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password ?</a>
            </Typography>
          </div>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
