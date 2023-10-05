import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { userLoginAction } from "@/state/reducers/userReducer";
import { selectTheme } from "@/state/reducers/themeReducer";
import { ReactNode } from "react";

interface LoginProps {
  children: ReactNode;
}

const loginSchema = Yup.object({
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export default function Login({ children }: LoginProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLoginAction(values));
      console.log(values);
    },
    validationSchema: loginSchema,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={theme ? "darkGhost" : "ghost"}
          className={theme ? "text-white" : ""}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">Log In</DialogTitle>
            <DialogDescription className="text-center">
              Enter you email and password to sign in to your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
