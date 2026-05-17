import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get service centers data from loader
  const serviceCenters = useLoaderData();
  const duplicateRegions = serviceCenters.map((center) => center.region);
  const regions = [...new Set(duplicateRegions)];
  const senderRegions = useWatch({ control, name: "senderRegion" });
  const receiverRegions = useWatch({ control, name: "receiverRegion" });

  // getting districs from regions
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (center) => center.region === region,
    );
    const districts = regionDistricts.map((center) => center.district);
    return districts;
  };

  // handle form data
  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost; 
    Swal.fire({
      title: "Please Review the Cost",
      html: `You will be charged <span style="color: #03373d; font-weight: bold; font-size: 1.125rem;">${cost} BDT</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66", // Primary (lime green)
      cancelButtonColor: "#03373d", // Secondary (dark teal)
      confirmButtonText:
        '<span style="color: #0b0b0b; font-weight: 600;">Proceed</span>',
      cancelButtonText: '<span style="font-weight: 600;">Cancel</span>',
      iconColor: "#caeb66", // Warning icon color
    }).then((result) => {
      if (result.isConfirmed) {
        // send the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("After saving parcel", res.data);
        });

        // Swal.fire({
        //   title: "Thank you f",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        //   confirmButtonColor: "#caeb66",
        //   confirmButtonText:
        //     '<span style="color: #0b0b0b; font-weight: 600;">OK</span>',
        //   iconColor: "#caeb66", // Success icon color
        // });
      }
    });
    console.log("cost", cost);
  };

  return (
    <div className="my-10 p-10 bg-gray-50 rounded-2xl">
      <h2 className="text-4xl font-bold text-secondary">Send A Parcel</h2>
      <h4 className="text-xl font-bold text-secondary mt-10">
        Enter your parcel details
      </h4>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* parcel type */}
        <div className="border my-4 w-full opacity-10 rounded-full"></div>
        <div className="my-4">
          <div>
            <label className="text-secondary mr-4">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio"
                defaultChecked
              />{" "}
              Document
            </label>
            <label className="text-secondary">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="radio"
              />{" "}
              Non-Document
            </label>
          </div>
        </div>

        {/* parcel name and weight  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Name
            </label>
            <input
              type="name"
              className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
              {...register("parcelName")}
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Weight
            </label>
            <input
              type="number"
              className="peer input text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
              {...register("parcelWeight")}
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        <div className="border my-4 w-full opacity-10 rounded-full"></div>

        {/* two columns  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender details  */}
          <div>
            <h4 className="my-4 text-secondary font-bold text-xl">
              Sender Details
            </h4>

            <fieldset className="fieldset">
              {/* sender name  */}
              <label className="label text-black font-semibold">
                Sender Name
              </label>
              <input
                type="name"
                defaultValue={user?.displayName}
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderName")}
                placeholder="Sender Name"
              />

              {/* sender email  */}
              <label className="label text-black font-semibold">
                Sender Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderEmail")}
                placeholder="Sender Email"
              />

              {/* sender address  */}
              <label className="label text-black font-semibold mt-2">
                Sender Address
              </label>
              <input
                type="text"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderAddress")}
                placeholder="Sender Address"
              />

              {/* sender phone  */}
              <label className="label text-black font-semibold mt-2">
                Sender Phone No
              </label>
              <input
                type="number"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderPhone")}
                placeholder="Sender Phone No"
              />

              {/* sender region  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Sender Region
                </legend>
                <select
                  {...register("senderRegion")}
                  required
                  defaultValue="Pick a Region"
                  className="select peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                >
                  <option>Pick Your Region</option>
                  {regions.map((region, index) => (
                    <option
                      className="focus:bg-primary hover:bg-primary"
                      key={index}
                      value={region}
                    >
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Sender district  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Sender District
                </legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                >
                  <option disabled={true}>Pick a Region First</option>
                  {districtsByRegion(senderRegions).map((district, index) => (
                    <option
                      className="focus:bg-primary hover:bg-primary"
                      key={index}
                      value={district}
                    >
                      {district}
                    </option>
                  ))}{" "}
                </select>
              </fieldset>

              {/* pickup instruction */}
              <label className="label text-black font-semibold mt-2">
                Pickup Instruction
              </label>
              <textarea
                className="input pt-2 peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("pickupInstruction")}
                placeholder="Pickup Instruction"
              />
            </fieldset>
          </div>

          <div>
            <h4 className="my-4 text-secondary font-bold text-xl">
              Receiver Details
            </h4>

            <fieldset className="fieldset">
              {/* receiver name  */}
              <label className="label text-black font-semibold">
                Receiver Name
              </label>
              <input
                type="name"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("receiverName")}
                placeholder="Receiver Name"
              />

              {/* receiver email  */}
              <label className="label text-black font-semibold">
                Receiver Email
              </label>
              <input
                type="email"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("receiverEmail")}
                placeholder="Receiver Email"
              />

              {/* receiver address  */}
              <label className="label text-black font-semibold mt-2">
                Receiver Address
              </label>
              <input
                type="text"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("receiverAddress")}
                placeholder="Receiver Address"
              />

              {/* receiver phone  */}
              <label className="label text-black font-semibold mt-2">
                Receiver Phone No
              </label>
              <input
                type="number"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("receiverPhone")}
                placeholder="Receiver Phone No"
              />

              {/* receiver region  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Receiver Region
                </legend>
                <select
                  {...register("receiverRegion")}
                  required
                  defaultValue="Pick a Region"
                  className="select peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                >
                  <option>Pick Your Region</option>
                  {regions.map((region, index) => (
                    <option
                      className="focus:bg-primary hover:bg-primary"
                      key={index}
                      value={region}
                    >
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver district  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Receiver District
                </legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a District"
                  className="select peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                >
                  <option disabled={true}>Pick Your Region First</option>
                  {districtsByRegion(receiverRegions).map((district, index) => (
                    <option
                      className="focus:bg-primary hover:bg-primary"
                      key={index}
                      value={district}
                    >
                      {district}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Delivery instruction */}
              <label className="label text-black font-semibold mt-2">
                Delivery Instruction
              </label>
              <textarea
                className="input pt-2 peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
              />
            </fieldset>
          </div>
        </div>

        <h5 className="text-sm mt-4 text-muted-foreground">
          * PickUp Time: 4pm-7pm Approx.
        </h5>

        {/* submit button  */}
        <button
          className="bg-primary mt-6 px-6 md:px-15 text-secondary py-2 rounded-lg font-semibold active:scale-[0.95] cursor-pointer"
          type="submit"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
