import { useCartStore } from "@/stores/cart-store";

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

/**
 * Generates a unique bill number in the format BILL-SM-DDMM-0001
 * Includes last 4 digits of current date (DDMM) for uniqueness
 * @returns A unique bill number string
 */
function generateBillNumber(): string {
  const BILL_COUNTER_KEY = "soofi_mandi_bill_counter";

  // Get current date and format as YYYYMMDD, then take last 4 digits (MMDD)
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const dateString = `${year}${month}${day}`;
  const last4Digits = dateString.slice(-4); // Gets MMDD (last 4 digits)

  // Get the current counter from localStorage, default to 0 if not found
  let currentCounter = parseInt(
    localStorage.getItem(BILL_COUNTER_KEY) || "0",
    10
  );

  // Increment the counter
  currentCounter += 1;

  // Save the updated counter back to localStorage
  localStorage.setItem(BILL_COUNTER_KEY, currentCounter.toString());

  // Format the bill number with leading zeros (4 digits)
  const formattedNumber = currentCounter.toString().padStart(4, "0");

  return `BILL-SM-${last4Digits}-${formattedNumber}`;
}

/**
 * Prepares order data and sends it to the Yaadro API.
 * @param customerDetails - The customer's information from the checkout form.
 * @returns The API response.
 * @throws An error if the API request fails.
 */
export async function createOrder(customerDetails: CustomerDetails) {
  const cart = useCartStore.getState();

  if (cart.items.length === 0) {
    throw new Error("Cannot create an order with an empty cart.");
  }

  // Aggregate special instructions from all cart items
  const special_instructions =
    cart.items
      .map((item) => item.customizations?.specialInstructions)
      .filter(Boolean) // Remove empty/undefined instructions
      .join("; ") || "N/A"; // Join multiple instructions or provide a default

  const orderData = {
    shop_id: "soofi-mandhi-banglore-202507160540", // As per your requirement
    bill_no: generateBillNumber(), // Generate a unique sequential bill number
    customer_name: customerDetails.name,
    address: customerDetails.address,
    total_amount: cart.getTotal(),
    customer_phone_number: customerDetails.phone,
    payment_mode: "cash", // Always Cash on Delivery
    special_instructions: special_instructions,
    urgency: "Normal", // As per your requirement
    items: cart.items.map((item) => ({
      item_name: item.name,
      quantity: item.quantity,
      price: item.price,
      totalamount: item.price * item.quantity,
    })),
  };

  const apiKey = "yadro-admin-e40871556fd2f90e1771ad9bfa8461fe";
  const apiUrl = "https://yaadro.com/api/orders/create";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error; // Re-throw to be handled by the calling component
  }
}
