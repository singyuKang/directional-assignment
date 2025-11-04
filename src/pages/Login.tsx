import LoginLayout from "@/components/auth/LoginLayout";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginForm from "@/components/auth/LoginForm";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <LoginLayout>
      <LoginHeader />
      <LoginForm
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </LoginLayout>
  );
}
