import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { connectionSchema, connectionType } from "@/schema";
import { CONECTIONFIELDS } from "@/data";
import { useMemo } from "react";
import { useAppDispatch } from "@/app/store";
import {
  registerSelector,
  userRegister,
} from "@/app/features/connexion/registerSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector(registerSelector);
  const defaultValues = useMemo<Partial<connectionType>>(
    () => ({
      username: "",
      password: "",
    }),
    []
  );

  const form = useForm<connectionType>({
    resolver: zodResolver(connectionSchema),
    defaultValues,
  });

  function onSubmit(data: connectionType) {
    dispatch(userRegister(data));
  }

  return (
    <div className="min-h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-primary i justify-around items-center hidden">
        <div>
          <h4 className="text-white">Welcome to </h4>
          <h1 className="text-white font-bold text-4xl font-sans tracking-widest">
          property management
          </h1>
          <p className="text-white mt-1">
          the n°1 property management platform in Morocco.
          </p>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center min-h-screen bg-fourth">
        <div className="w-full px-10 lg:px-24">
          <h1 className=" font-bold text-3xl mb-6">Inscription De Compte</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {CONECTIONFIELDS.map(({ name, placeholder, type }, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input
                            type={type}
                            {...field}
                            placeholder={placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              ))}
              <Button
                type="submit"
                className=" w-full bg-primary py-2 rounded-md text-white font-semibold "
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
                {loading ? "Registring..." : "Register"}
              </Button>
            </form>
          </Form>

          <div>
            <p className="text-center mt-8 text-xs font-light">
              <Link to={"/"} className="text-primary cursor-pointer underline">
                {" "}
                Connectez-vous!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
