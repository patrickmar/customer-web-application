import * as yup from "yup";

declare module "yup" {
  interface Schema<
    TType = any,
    TContext = any,
    TDefault = any,
    TFlags extends yup.Flags = ""
  > {
    serverError(serverErrors: undefined | string[]): this;
  }
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends yup.Flags = ""
  > {
    unique(
      message: string,
      mapper?: (value: TIn, index?: number, list?: TIn[]) => TIn[]
    ): this;
  }
}

yup.addMethod(
  yup.array,
  "unique",
  function (message, mapper = (val: unknown) => val) {
    return this.test(
      "unique",
      message,
      (list = []) => list.length === new Set(list.map(mapper)).size
    );
  }
);

export const step1ValidationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title can not be less than 2 characters")
    .max(50, "Title can not be more than 50 characters")
    .required("Please enter event title"),
  description: yup
    .string()
    .min(2, "Description can not be less than 2 characters")
    .max(50, "Description can not be more than 500 characters")
    .required("Please enter event description"),
  category: yup.string().trim().required("Please choose your event category"),
  mode: yup
    .string()
    .min(2, "Mode can not be less than 2 characters")
    .max(50, "Mode can not be more than 50 characters")
    .required("Please enter event mode"),
  tags: yup.array().of(yup.string().notRequired()),
});

export const step2ValidationSchema = yup.object({
  start: yup.object().shape({
    date: yup.date().required("Please enter the start date"),
    time: yup.date().required("Please enter the start time"),
  }),
  end: yup.object().shape({
    //date: yup.date().required("Please enter the end date"),
    date: yup
      .date()
      .required("Please enter the end date")
      .test(
        "is-after-start",
        "End date must be after start date",
        function (end: any, context) {
          console.log(end);
          console.log(this.parent);
          console.log(context);
          const { start } = this.parent; // Access the value of start date
          console.log(start);
          if (!start || !end) {
            return true; // If either is not available, skip validation
          }
          console.log(new Date(end) >= new Date(start));
          return new Date(end) >= new Date(start);
        }
      ),
    time: yup.date().required("Please enter the end time"),
    banner: yup
      .array()
      .of(yup.string().required("Banner is required"))
      .min(1, "Minimum of 1 banner required"),
  }),
});

export const step3ValidationSchema = yup.object().shape({
  ticket: yup
    .array()
    .of(
      yup.object().shape(
        {
          name: yup
            .string()
            .min(2, "Please enter minimum of 2 characters")
            .required("Name is required"),
          price: yup
            .number()
            .min(1, "Please enter minimum of 1")
            .max(10000000, "Please enter between 1 and 9,999,999")
            .typeError("Please specify price")
            .required("Price is required"),
          quantity: yup
            .number()
            .min(1, "Please enter minimum of 1")
            .typeError("Please specify quantity")
            .required("Quantity is required"),
          currency: yup.string().required("Currency is required"),
          discount: yup
            .mixed()
            .test(
              "validNumber",
              "Discount must be a valid number",
              function (value: any) {
                console.log(value);
                return (
                  value === undefined ||
                  typeof value === "number" ||
                  /^\d+(\.\d+)?$/.test(value)
                );
              }
            )
            .test("maxDiscount", function (value) {
              const price = this.parent.price;
              const discountMode = this.parent.discountMode;
              if (typeof Number(value) === "number") {
                if (discountMode === "percent" && Number(value) >= 100) {
                  return this.createError({
                    path: this.path,
                    message: "Discount should not be more than 100 percent",
                  });
                } else if (
                  discountMode === "price" &&
                  Number(value) >= Number(price)
                ) {
                  return this.createError({
                    path: this.path,
                    message: "Discount should not be higher than the price",
                  });
                }
              }

              return true;
            }),

          discountMode: yup
            .string()
            .optional()
            .when("discount", {
              is: (val: number) => val >= 0,
              then: (schema) => schema.required("discount Mode is required"),
              otherwise: (schema) => schema.notRequired(),
            }),
          // .when("discount", (discount) => {
          //   console.log(discount[0]);
          //   if (Number(discount[0]) > 0) {
          //     return yup
          //       .string()
          //       .typeError("Please select discount mode")
          //       .required("Discount mode is required");
          //   }
          //   return yup.string();
          // }),
        },
        [["discountMode", "discount"]]
      )
    )
    .unique("Name must be unique", (val: any) => val.name)
    .required("Must setup ticket categories")
    .min(1, "Minimum of 1 ticket categories"),
});

export const step4ValidationSchema = yup.object({
  type: yup.string().required("Please choose event type"),
  venue: yup.string().when("type", {
    is: (val: string) => val === "Physical",
    then: (schema) => schema.required("Please enter your venue"),
    otherwise: (schema) => schema.notRequired(),
  }),
  country: yup
    .object({
      value: yup.string(),
      label: yup.string(),
    })
    .when("type", {
      is: (val: string) => val === "Physical",
      then: (schema) => schema.required("Please select your country"),
      otherwise: (schema) => schema.notRequired(),
    }),
  state: yup.string().when("type", {
    is: (val: string) => val === "Physical",
    then: (schema) => schema.required("Please choose your state"),
    otherwise: (schema) => schema.notRequired(),
  }),
  link: yup.string().when("type", {
    is: (val: string) => val === "Online",
    then: (schema) => schema.required("Please enter the link"),
    otherwise: (schema) => schema.notRequired(),
  }),
  platform: yup.string().when("type", {
    is: (val: string) => val === "Online",
    then: (schema) =>
      schema
        .required("Please enter the platform")
        .url("Meeting link must be a valid URL"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const step5ValidationSchema = yup.object({
  bank: yup.object().shape({
    details: yup.object({
      value: yup.string().required("Please select the bank"),
      label: yup.string().required("Please select the bank"),
      code: yup.string().required("Please select the bank"),
    }),
    account: yup.object({
      account_name: yup.string().required("Please enter the account no"),
      account_number: yup
        .string()
        .trim()
        .min(10, "Minimum of 10 digits")
        .max(10, "Maximum of 10 digits")
        .required("Please enter the account number"),
      bank_id: yup.number(),
    }),
  }),
});
