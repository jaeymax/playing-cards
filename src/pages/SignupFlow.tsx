import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";

const SignupFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    country: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Step 1: Basic Info</h2>
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="mb-3"
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            className="mb-3"
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            className="mb-3"
          />
          <Button onClick={nextStep} className="w-full">
            Next
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Step 2: Profile Setup</h2>
          <Input
            placeholder="Avatar URL"
            name="avatar"
            onChange={handleChange}
            className="mb-3"
          />
          <Select name="country" onValueChange={handleChange}>
            <option value="">Select Country</option>
            <option value="Ghana">Ghana</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
          </Select>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline">
              Back
            </Button>
            <Button onClick={nextStep}>Next</Button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Step 3: Confirmation</h2>
          <p>
            Welcome, <strong>{formData.username}</strong>! Your account has been
            created.
          </p>
          <Button className="mt-4 w-full">Start Playing!</Button>
        </motion.div>
      )}
    </div>
  );
};

export default SignupFlow;
