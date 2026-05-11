import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSendParcel = (data) => {
    console.log("Data Parcel", data);
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
              Parcel Type
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
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderName")}
                placeholder="Sender Name"
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

              {/* Sender district  */}
              <label className="label text-black font-semibold mt-2">
                Sender District
              </label>
              <input
                type="text"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("senderDistrict")}
                placeholder="Sender District"
              />

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

              {/* Receiver district  */}
              <label className="label text-black font-semibold mt-2">
                Receiver District
              </label>
              <input
                type="text"
                className="input peer text-black rounded-lg w-full border-secondary/20 focus:border-primary focus:outline-none not-placeholder-shown:border-primary"
                {...register("receiverDistrict")}
                placeholder="Receiver District"
              />

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
