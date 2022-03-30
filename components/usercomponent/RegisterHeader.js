import NavLink from "./NavLink"

const RegisterHeader = () => {
  return (
    <div className="w-[55%] mx-auto mt-14 mb-6 flex rounded-lg border-2 px-9 py-4">
      <NavLink to="/register" className="mr-auto hover:cursor-pointer">Register</NavLink>
      <NavLink to="/login" className="hover:cursor-pointer">Login</NavLink>
    </div>
  )
};

export default RegisterHeader;