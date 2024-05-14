import { Button } from "./button";
interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
  logo: () => React.JSX.Element;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  logo: Logo,
}: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 border-slate-300">
      <div className="text-lg flex flex-col justify-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
