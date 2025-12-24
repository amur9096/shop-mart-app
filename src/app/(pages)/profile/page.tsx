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
    <div className="py-10 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Page</h1>
          <p className="text-muted-foreground mt-2">
            Manage your saved addresses for fast and easy checkout across our
            marketplaces.
          </p>
        </div>
        <div className="flex gap-3">
          <UpdateProfileModal token={token} />
          <ChangePasswordModal token={token} />
          <AddAddressModal token={token} />
        </div>
      </div>

      {/* Empty */}
      {details.length === 0 ? (
        <Card className="p-8 text-center">
          <CardTitle className="text-xl mb-2">No addresses found</CardTitle>
          <CardDescription>
            You don't have any saved addresses yet. Add one now to checkout
            faster.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((detail) => (
            <Card
              key={detail._id}
              className="drop-shadow-xl hover:drop-shadow-2xl transition"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl font-bold capitalize">
                    {detail.name}
                  </CardTitle>

                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    Saved
                  </span>
                </div>

                <CardDescription className="text-sm">
                  <span className="font-semibold">Details:</span>{" "}
                  {detail.details}
                </CardDescription>

                <CardDescription className="text-sm">
                  <span className="font-semibold">Phone:</span> {detail.phone}
                </CardDescription>

                <CardDescription className="text-sm">
                  <span className="font-semibold">City:</span> {detail.city}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <DeleteAddressBtn id={detail._id} token={token} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
