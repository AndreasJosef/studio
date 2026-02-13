// import { useForm, SubmitHandler } from 'react-hook-form';

// type Inputs = {};

export default function SignUp() {
  return (
    <div className="bg-neutral-800 p-4 rounded">
      <h2 className="text-2xl">Sign Up</h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Enter Name" />
        <input type="email" placeholder="Enter Email" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
