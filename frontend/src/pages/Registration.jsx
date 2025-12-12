import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Use standard MUI TextField
import Box from "@mui/material/Box"; // For layout
import Stack from "@mui/material/Stack"; // For easy vertical spacing
import Link from "@mui/material/Link"; // Use MUI Link
import { Link as RouterLink, useNavigate } from "react-router"; // Correct import for router
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

export default function Registration() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            username: Yup.string()
                .min(3, "At least 3 character long")
                .required("Required"),
            password: Yup.string()
                .min(6, "Password must be 6 character long")
                .matches(/[A-Z]/, "Must contain one uppercase letter")
                .matches(/[a-z]/, "Must contain one lowercase letter")
                .matches(/[0-9]/, "Must contain one number")
                .matches(/[@$!%*?&]/, "Must contain one special character")
                .required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Password doesn't match")
                .required("Required"),
        }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                console.log(values);
                const response = await axiosInstance.post(
                    "/api/v1/auth/register",
                    values,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                toast.success(response.data.message, {
                    position: "top-right",
                });
                resetForm();

                if (response.data.success) {
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            } catch (error) {
                console.error(
                    "Signup error:",
                    error.response?.data || error.message
                );

                toast.error(error.response?.data.message || error.message, {
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
                        You’ll get smarter responses and can upload files,
                        images, and more.
                    </Typography>

                    {/* Use Box for the form element to apply styles */}
                    <Box
                        component="form"
                        autoComplete="off"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        sx={{ width: "100%", mt: 2 }} // mt = margin-top
                    >
                        {/* Use Stack for easy 1-column layout and spacing */}
                        <Stack spacing={2}>
                            <TextField
                                label="Email Address" // Use label for better UX
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name="email"
                                variant="outlined"
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
                                <div style={{ color: "red" }}>
                                    {formik.errors.email}
                                </div>
                            ) : null}
                            <TextField
                                label="Username"
                                type="text"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                name="username"
                                variant="outlined"
                                fullWidth
                                required
                                autoComplete="username"
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

                            {formik.touched.username &&
                            formik.errors.username ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.username}
                                </div>
                            ) : null}

                            <TextField
                                label="Password"
                                type="password" // Correct type for password
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                name="password"
                                variant="outlined"
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

                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.password}
                                </div>
                            ) : null}

                            <TextField
                                label="Confirm Password"
                                type="password" // Correct type for password
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                name="confirmPassword"
                                variant="outlined"
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
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}

                            <Button
                                type="submit"
                                variant="contained"
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
                                {formik.isSubmitting ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{ color: "black" }}
                                    />
                                ) : (
                                    "Continue"
                                )}
                            </Button>

                            <Typography
                                variant="body2"
                                color="grey.400"
                                align="center"
                            >
                                Already have an account?{" "}
                                <Link
                                    component={RouterLink} // Use RouterLink for navigation
                                    to="/"
                                    underline="hover"
                                    sx={{ color: "white", fontWeight: "bold" }}
                                >
                                    Login
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
