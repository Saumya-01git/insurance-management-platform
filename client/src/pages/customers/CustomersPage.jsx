import { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import CustomerListPage from "./CustomerListPage";
import CustomerDetailsPage from "./CustomerDetailsPage";
import AddCustomerPage from "./AddCustomerPage";
import EditCustomerPage from "./EditCustomerPage";

const CustomersPage = () => {
  const customerHook = useCustomers();
  const [currentView, setCurrentView] = useState("list"); // "list", "details", "add", "edit"
  const [activeCustomer, setActiveCustomer] = useState(null);

  const handleNavigateAdd = () => {
    setCurrentView("add");
  };

  const handleNavigateView = (customer) => {
    setActiveCustomer(customer);
    setCurrentView("details");
  };

  const handleNavigateEdit = (customer) => {
    setActiveCustomer(customer);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setActiveCustomer(null);
  };

  const handleAddSubmit = async (formData) => {
    await customerHook.handleAddCustomer(formData);
    handleBackToList();
  };

  const handleEditSubmit = async (id, formData) => {
    await customerHook.handleUpdateCustomer(id, formData);
    handleBackToList();
  };

  return (
    <>
      {currentView === "list" && (
        <CustomerListPage
          {...customerHook}
          onNavigateAdd={handleNavigateAdd}
          onNavigateView={handleNavigateView}
          onNavigateEdit={handleNavigateEdit}
        />
      )}

      {currentView === "details" && (
        <CustomerDetailsPage
          customerData={activeCustomer}
          onBack={handleBackToList}
          onEdit={handleNavigateEdit}
        />
      )}

      {currentView === "add" && (
        <AddCustomerPage
          onCancel={handleBackToList}
          onSubmitSuccess={handleAddSubmit}
        />
      )}

      {currentView === "edit" && (
        <EditCustomerPage
          customer={activeCustomer}
          onCancel={handleBackToList}
          onSubmitSuccess={handleEditSubmit}
        />
      )}
    </>
  );
};

export default CustomersPage;
