"use client";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/common/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Values {
  email: string;
  password: string;
  error: string | null;
}

const LoginForm = () => {
  const initialValues: Values = {
    email: "",
    password: "",
    error: null,
  };

  const [user, setUser] = useState<Values>(initialValues);
  const { email, password, error } = user;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter a valid email address"),
    password: Yup.string().required("Password is required!"),
  });

  const submitHandler = async () => {
    setLoading(true);
    setUser((prevState) => {
      return { ...prevState, error: null };
    });

    const options = {
      redirect: false,
      email: email,
      password: password,
    };

    const res = await signIn("credentials", options);

    if (res?.error) {
      setLoading(false);
      setUser((prevState) => {
        return { ...prevState, error: res.error };
      });
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      {loading && <Loader value={"Please Wait..."} />}
      <Formik
        enableReinitialize
        initialValues={{ email, password }}
        validationSchema={validationSchema}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {({ errors, touched, handleBlur }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#171717]">
                Enter your email :
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-[#DCD1D5] rounded-md shadow-sm focus:outline-none focus:ring-[#00F0B1] focus:border-[#00F0B1] sm:text-sm text-[#171717] bg-[#FFFFFF]"
                type="email"
                placeholder="abc@example.com"
                name="email"
                onChange={inputChangeHandler}
                onBlur={handleBlur}
                value={email}
              />
              {touched.email && errors.email && (
                <span className="text-[#654A55] text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#171717]">
                Enter your password :
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-[#DCD1D5] rounded-md shadow-sm focus:outline-none focus:ring-[#00F0B1] focus:border-[#00F0B1] sm:text-sm text-[#171717] bg-[#FFFFFF]"
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={inputChangeHandler}
                onBlur={handleBlur}
                value={password}
              />
              {touched.password && errors.password && (
                <span className="text-[#654A55] text-xs mt-1">
                  {errors.password}
                </span>
              )}
            </div>
            {error && (
              <span className="text-[#654A55] text-sm block">
                {error}
              </span>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-[#FAFAFA] bg-[#5000C9] hover:bg-[#5D2DE6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00F0B1]"
            >
              LOGIN
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;