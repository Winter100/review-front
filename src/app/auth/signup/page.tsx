import SignupForm from "@/components/auth/signup-form";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50">
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto mt-20 max-w-md">
          <SignupForm />
        </div>
      </main>
    </div>
  );
};

export default Page;
