import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileForm from "@/components/forms/ProfileForm";
import ROUTES from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";

export default async function EditProfile() {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const { success, data } = await getUser({ userId: session.user.id });
  if (!success) redirect(ROUTES.SIGN_IN);

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Edit Profile</h1>

      <ProfileForm user={data?.user as User} />
    </>
  );
}
