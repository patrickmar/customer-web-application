import paystackApi from "../../../app/utils/PaystackHttps";
import axios from "axios";
const countryApi = process.env.NEXT_PUBLIC_COUNTRY_API;

const countries = async () => {
  const response = await axios.get(countryApi!, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const banks = async () => {
  const response = await paystackApi.get("/bank");
  return response.data;
};

const resolveAccount = async (account_number: string, bank_code: string) => {
  const response = await paystackApi.get(
    `bank/resolve?account_number=${account_number}&bank_code=${bank_code}`
  );
  return response.data;
};

const externalService = {
  countries,
  banks,
  resolveAccount,
};

export default externalService;
