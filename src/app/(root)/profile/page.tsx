import UserAvatar from "@/components/common/user-avatar";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserProfilePage = () => {
  return (
    <div>
      <Header className="sticky" />
      <div className="w-full h-[calc(100vh-192px)] flex items-center justify-center">
        <section className="w-[400px] p-4 flex flex-col items-center justify-center gap-6">
          <h3 className="text-xl text-gray-900 font-semibold">User Profile</h3>

          <UserAvatar className="size-16" textClassName="text-2xl" />

          <div className="w-full space-y-3">
            <div className="bg-gray-100 w-full p-3 rounded-[6px] flex items-center gap-4">
              <p className="text-gray-900 font-semibold">Username</p>
              <p>:</p>
              <p className="text-center">Ansori Dev</p>
            </div>

            <div className="bg-gray-100 w-full p-3 rounded-[6px] flex items-center gap-4">
              <p className="text-gray-900 font-semibold">Passoword</p>
              <p>:</p>
              <p className="text-center">User 123</p>
            </div>

            <div className="bg-gray-100 w-full p-3 rounded-[6px] flex items-center gap-4">
              <p className="text-gray-900 font-semibold">Role</p>
              <p>:</p>
              <p className="text-center">User</p>
            </div>
          </div>

          <Button className="w-full" asChild>
            <Link href={"/"}>Back to Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};
export default UserProfilePage;
