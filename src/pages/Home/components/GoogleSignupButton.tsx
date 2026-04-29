import { baseUrl } from "@/config/api";
import { GoogleLogin } from "@react-oauth/google";


export default function GoogleSignupButton() {
  const handleSuccess = async (credentialResponse:any) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await fetch(`${baseUrl}/auth/google/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      console.log("Signup success:", data);
      localStorage.setItem("token", data.token);
      // Navigate to dashboard or home
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleError = () => {
    console.error("Google Signup failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      text="signup_with" // shows "Sign up with Google"
      useOneTap={false}
    />
  );
}
