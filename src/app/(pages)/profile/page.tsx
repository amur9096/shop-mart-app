import { getUserToken } from "@/app/Helpers/getUserToken";
import AddAddressModal from "@/components/addAddressModal/AddAddressModal";
import ChangePasswordModal from "@/components/changePassword/ChangePassword";
import DeleteAddressBtn from "@/components/deleteAddress/DeleteAddress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateProfileModal from "@/components/updateProfileModal/UpdateProfile";
import { AddressI } from "@/interfaces";

export default async function Profile() {
  const token = await getUserToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const json = await res.json();
  const details: AddressI[] = json?.data || [];

  return (
    <div className="py-6 sm:py-10 space-y-6 px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Profile Page</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
            Manage your saved addresses for fast and easy checkout across our
            marketplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-3">
          <UpdateProfileModal token={token} />
          <ChangePasswordModal token={token} />
          <div className="sm:col-span-2 md:col-auto">
            <AddAddressModal token={token} />
          </div>
        </div>
      </div>

      {details.length === 0 ? (
        <Card className="p-6 sm:p-8 text-center rounded-2xl">
          <CardTitle className="text-lg sm:text-xl mb-2">
            No addresses found
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            You don't have any saved addresses yet. Add one now to checkout
            faster.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {details.map((detail) => (
            <Card
              key={detail._id}
              className="drop-shadow-xl hover:drop-shadow-2xl transition rounded-2xl"
            >
              <CardHeader className="space-y-2 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl font-bold capitalize">
                    {detail.name}
                  </CardTitle>

                  <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    Saved
                  </span>
                </div>

                <CardDescription className="text-xs sm:text-sm">
                  <span className="font-semibold">Details:</span>{" "}
                  {detail.details}
                </CardDescription>

                <CardDescription className="text-xs sm:text-sm">
                  <span className="font-semibold">Phone:</span> {detail.phone}
                </CardDescription>

                <CardDescription className="text-xs sm:text-sm">
                  <span className="font-semibold">City:</span> {detail.city}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                <div className="w-full">
                  <DeleteAddressBtn id={detail._id} token={token} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
