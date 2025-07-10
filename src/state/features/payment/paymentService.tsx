import { IBank } from "@/app/profile/Interface";
// import api from "./utils/Https";
import api from "@/app/utils/Https";

const createBankCard = async (data: IBank) => {
  const response = await api.post("customer/save_bankdetails", data);
  return response.data;
};

const fetchCards = async () => {
  const response = await api.get("/customer/payment_cards");
  return response.data;
};

const verifyPayment = async (reference: string, savecard: boolean) => {
  const response = await api.get(
    `paystack/verify_transaction?reference=${reference}&savecard=${savecard}/`
  );
  return response.data;
};

const paymentService = {
  createBankCard,
  fetchCards,
  verifyPayment,
};

export default paymentService;
