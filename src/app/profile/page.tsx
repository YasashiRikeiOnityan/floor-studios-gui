import Header from "@/components/Header";

const Profile = () => {
  return (
    <>
      <div className="min-h-full">
        <Header current="Profile"/>
        <div className="py-5 sm:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
