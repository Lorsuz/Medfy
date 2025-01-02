import { CardFormSignIn } from "../components/card-form-sign-in";
import { SideCard } from "../components/side-card";

export default function SignIn() {
  return (
    <div className="grid lg:grid-cols-[auto_1fr] min-h-screen bg-background">
      <SideCard />

      <div className="flex flex-col items-center justify-center">
        <CardFormSignIn />
      </div>
    </div>
  );
}
