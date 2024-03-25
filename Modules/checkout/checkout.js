import { InitializeDeliveryInfo } from "./deliveryInfo.js";
import { InitializePaymentMethod } from "./paymentMethod.js";
import { InitializeReciep } from "./reciep.js";
export function InitializeCheckout() {
  InitializeDeliveryInfo();
  InitializePaymentMethod();
  InitializeReciep();
}
