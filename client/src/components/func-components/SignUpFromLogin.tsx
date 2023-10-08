import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { userRegisterAction } from "@/state/reducers/userReducer";
// import { selectTheme } from "@/state/reducers/themeReducer";
import { selectUserValues } from "@/state/reducers/userReducer";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface LoginProps {
  children: ReactNode;
  onSignUp: boolean;
  onHandleSignUp: () => void;
}

const loginSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export default function SignUpFromLogin({
  children,
  onSignUp,
  onHandleSignUp,
}: LoginProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const theme = useAppSelector(selectTheme);
  const userValues = useAppSelector(selectUserValues);
  const { loading, user, appErr, serverErr } = userValues;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userRegisterAction(values));
      if (!appErr && !serverErr && !loading && user) {
        navigate("/anything");
      }
      onHandleSignUp();
    },
    validationSchema: loginSchema,
  });
  return (
    <Dialog open={onSignUp} onOpenChange={onHandleSignUp}>
      <DialogTrigger />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">{children}</DialogTitle>
            <DialogDescription className="text-center">
              Fill up the following form to create an account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                type="string"
                id="firstName"
                className="col-span-3"
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 text-right text-xs">
                {formik.errors.firstName}
              </p>
            ) : null}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                type="string"
                id="lastName"
                className="col-span-3"
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 text-right text-xs">
                {formik.errors.lastName}
              </p>
            ) : null}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                type="email"
                id="email"
                className="col-span-3"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-right text-xs">
                {formik.errors.email}
              </p>
            ) : null}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                type="password"
                id="password"
                className="col-span-3"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-right text-xs">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
