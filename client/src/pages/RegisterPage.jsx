import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {RegisterErrors.map((error, index) => (
          <p className="bg-red-500 p-2" key={index}>
            {error}
          </p>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 outline-none"
            placeholder="Username"
          />

          {errors.username && (
            <p className="text-red-500 text-xs italic">username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 outline-none"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-500 text-xs italic">email is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 outline-none"
            placeholder="Password"
          />

          {errors.password && (
            <p className="text-red-500 text-xs italic">password is required</p>
          )}

         <button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm p-5 gap-5">Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?
          <Link to="/login" className="text-sky-500 m-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
