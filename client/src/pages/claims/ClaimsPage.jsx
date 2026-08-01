import { useState } from "react";
import { useClaims } from "../../hooks/useClaims";
import ClaimListPage from "./ClaimListPage";
import ClaimDetailsPage from "./ClaimDetailsPage";
import CreateClaimPage from "./CreateClaimPage";
import UpdateClaimPage from "./UpdateClaimPage";

const ClaimsPage = () => {
  const claimHook = useClaims();
  const [currentView, setCurrentView] = useState("list"); // "list", "details", "add", "edit"
  const [activeClaim, setActiveClaim] = useState(null);

  const handleNavigateAdd = () => {
    setCurrentView("add");
  };

  const handleNavigateView = (claim) => {
    setActiveClaim(claim);
    setCurrentView("details");
  };

  const handleNavigateEdit = (claim) => {
    setActiveClaim(claim);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setActiveClaim(null);
  };

  const handleAddSubmit = async (formData) => {
    await claimHook.handleAddClaim(formData);
    handleBackToList();
  };

  const handleEditSubmit = async (id, formData) => {
    await claimHook.handleUpdateClaim(id, formData);
    handleBackToList();
  };

  return (
    <>
      {currentView === "list" && (
        <ClaimListPage
          {...claimHook}
          onNavigateAdd={handleNavigateAdd}
          onNavigateView={handleNavigateView}
          onNavigateEdit={handleNavigateEdit}
        />
      )}

      {currentView === "details" && (
        <ClaimDetailsPage
          claimData={activeClaim}
          onBack={handleBackToList}
          onEdit={handleNavigateEdit}
          onApprove={claimHook.handleApproveClaim}
          onReject={claimHook.handleRejectClaim}
        />
      )}

      {currentView === "add" && (
        <CreateClaimPage
          onCancel={handleBackToList}
          onSubmitSuccess={handleAddSubmit}
        />
      )}

      {currentView === "edit" && (
        <UpdateClaimPage
          claim={activeClaim}
          onCancel={handleBackToList}
          onSubmitSuccess={handleEditSubmit}
        />
      )}
    </>
  );
};

export default ClaimsPage;
