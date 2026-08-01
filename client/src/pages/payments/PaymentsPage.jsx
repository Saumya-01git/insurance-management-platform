import { useState } from "react";
import { usePayments } from "../../hooks/usePayments";
import PaymentListPage from "./PaymentListPage";
import PaymentDetailsPage from "./PaymentDetailsPage";
import RecordPaymentPage from "./RecordPaymentPage";

const PaymentsPage = () => {
  const paymentHook = usePayments();
  const [currentView, setCurrentView] = useState("list"); // "list", "details", "add"
  const [activePayment, setActivePayment] = useState(null);

  const handleNavigateAdd = () => {
    setCurrentView("add");
  };

  const handleNavigateView = (payment) => {
    setActivePayment(payment);
    setCurrentView("details");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setActivePayment(null);
  };

  const handleAddSubmit = async (formData) => {
    await paymentHook.handleRecordPayment(formData);
    handleBackToList();
  };

  return (
    <>
      {currentView === "list" && (
        <PaymentListPage
          {...paymentHook}
          onNavigateAdd={handleNavigateAdd}
          onNavigateView={handleNavigateView}
        />
      )}

      {currentView === "details" && (
        <PaymentDetailsPage
          paymentData={activePayment}
          onBack={handleBackToList}
        />
      )}

      {currentView === "add" && (
        <RecordPaymentPage
          onCancel={handleBackToList}
          onSubmitSuccess={handleAddSubmit}
        />
      )}
    </>
  );
};

export default PaymentsPage;
