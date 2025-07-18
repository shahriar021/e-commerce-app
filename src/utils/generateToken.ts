import { useAppSelector } from "src/redux/hooks";

export const generateToken = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const jwtPayload = {
    name: profile?.name,
    employee_id: profile?.id,
    full_employee_id: profile?.employee_full_id,
  };

  //   return token;
};
