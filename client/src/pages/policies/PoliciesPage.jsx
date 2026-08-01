import { useState } from "react";
import { usePolicies } from "../../hooks/usePolicies";
import PolicyListPage from "./PolicyListPage";
import PolicyDetailsPage from "./PolicyDetailsPage";
import CreatePolicyPage from "./CreatePolicyPage";
import EditPolicyPage from "./EditPolicyPage";

const PoliciesPage = () => {
  const policyHook = usePolicies();
  const [currentView, setCurrentView] = useState("list"); // "list", "details", "add", "edit"
  const [activePolicy, setActivePolicy] = useState(null);

  const handleNavigateAdd = () => {
    setCurrentView("add");
  };

  const handleNavigateView = (policy) => {
    setActivePolicy(policy);
    setCurrentView("details");
  };

  const handleNavigateEdit = (policy) => {
    setActivePolicy(policy);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setActivePolicy(null);
  };

  const handleAddSubmit = async (formData) => {
    await policyHook.handleAddPolicy(formData);
    handleBackToList();
  };

  const handleEditSubmit = async (id, formData) => {
    await policyHook.handleUpdatePolicy(id, formData);
    handleBackToList();
  };

  return (
    <>
      {currentView === "list" && (
        <PolicyListPage
          {...policyHook}
          onNavigateAdd={handleNavigateAdd}
          onNavigateView={handleNavigateView}
          onNavigateEdit={handleNavigateEdit}
        />
      )}

      {currentView === "details" && (
        <PolicyDetailsPage
          policyData={activePolicy}
          onBack={handleBackToList}
          onEdit={handleNavigateEdit}
          onRenew={policyHook.handleRenewPrompt}
        />
      )}

      {currentView === "add" && (
        <CreatePolicyPage
          onCancel={handleBackToList}
          onSubmitSuccess={handleAddSubmit}
        />
      )}

      {currentView === "edit" && (
        <EditPolicyPage
          policy={activePolicy}
          onCancel={handleBackToList}
          onSubmitSuccess={handleEditSubmit}
        />
      )}
    </>
  );
};

export default PoliciesPage;
