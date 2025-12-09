import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, login, loading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be 6 character long")
        .required("Required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // console.log(values);
        const response = await login(values);

        // console.log("Login Success", response.data);
        console.log("state", user);
        toast.success(response.msg, {
          position: "top-right",
        });
        resetForm();

        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        console.error("Signup error:", error.response?.msg || error.message);

        toast.error(error.response?.msg || error.message, {
          position: "top-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    // Use Box for robust centering
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ensures it's centered vertically on the page
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450, // Constrain the width
          width: "100%",
          backgroundColor: "#1E1E1E",
          borderRadius: 3,
          boxShadow: 24, // Add a subtle shadow
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: 5,
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            color="white"
            align="center"
            fontWeight="bold"
          >
            Create your account
          </Typography>
          <Typography variant="body1" color="grey.400" align="center">
            You’ll get smarter responses and can upload files, images, and more.
          </Typography>

          {/* Use Box for the form element to apply styles */}
          <Box
            component="form"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ width: "100%", mt: 2 }} // mt = margin-top
          >
            {/* Use Stack for easy 1-column layout and spacing */}
            <Stack spacing={2}>
              <TextField
                label="Email Address" // Use label for better UX
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                fullWidth
                required
                autoComplete="email"
                // Styles for dark mode input
                InputLabelProps={{ sx: { color: "grey.500" } }}
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.700",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}

              <TextField
                label="Password"
                type="password" // Correct type for password
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                fullWidth
                required
                autoComplete="new-password"
                InputLabelProps={{ sx: { color: "grey.500" } }}
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.700",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}

              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth // Make button take full width
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: 2, // Slightly less rounded
                  paddingY: 1.5, // Better padding
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "grey.200", // Add a hover effect
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "black" }} />
                ) : (
                  "Continue"
                )}
              </Button>

              <Typography variant="body2" color="grey.400" align="center">
                Already have an account?{" "}
                <Link
                  component={RouterLink} // Use RouterLink for navigation
                  to="/signup"
                  underline="hover"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Signup
                </Link>
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Box>
  );
}
