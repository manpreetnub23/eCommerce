import { createOrder } from "@/api/paymentApi";

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = async (amount) => {
    const res = await loadRazorpayScript();

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const order = await createOrder(amount);

    const options = {
        key: "rzp_test_E5xhzZD7fhEINZ",
        amount: order.amount,
        currency: order.currency,
        name: "Tough Day",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response) {
            alert("Payment Successful!");
            console.log(response);
        },
        theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};
