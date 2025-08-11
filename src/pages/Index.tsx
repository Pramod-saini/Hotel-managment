
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { HotelManagement } from "@/components/hotel/HotelManagement";
import { RestaurantManagement } from "@/components/restaurant/RestaurantManagement";
import { StaffManagement } from "@/components/staff/StaffManagement";
import { InventoryManagement } from "@/components/inventory/InventoryManagement";
import { MaintenanceModule } from "@/components/maintenance/MaintenanceModule";
import { EventManagement } from "@/components/events/EventManagement";
import { GuestServices } from "@/components/services/GuestServices";
import { CustomerManagement } from "@/components/customer/CustomerManagement";
import { Analytics } from "@/components/analytics/Analytics";
import { Settings } from "@/components/settings/Settings";
import { MarketingHub } from "@/components/marketing/MarketingHub";
import { CRMModule } from "@/components/crm/CRMModule";
import { LaundryManagement } from "@/components/laundry/LaundryManagement";
import { CMSModule } from "@/components/cms/CMSModule";
import { BillingModule } from "@/components/billing/BillingModule";
import { AccountingModule } from "@/components/accounting/AccountingModule";
import { ActivitiesModule } from "@/components/activities/ActivitiesModule";
import { ReviewsModule } from "@/components/reviews/ReviewsModule";
import { CommunicationsModule } from "@/components/communications/CommunicationsModule";
import POSSystem from "@/components/restaurant/POSSystem";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "hotel":
        return <HotelManagement />;
      case "restaurant":
        return <RestaurantManagement />;
      case "staff":
        return <StaffManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "maintenance":
        return <MaintenanceModule />;
      case "events":
        return <EventManagement />;
      case "guest-services":
        return <GuestServices />;
      case "crm":
        return <CRMModule />;
      case "laundry":
        return <LaundryManagement />;
      case "cms":
        return <CMSModule />;
      case "billing":
        return <BillingModule />;
      case "accounting":
        return <AccountingModule />;
      case "marketing":
        return <MarketingHub />;
      case "analytics":
        return <Analytics />;
      case "activities":
        return <ActivitiesModule />;
      case "reviews":
        return <ReviewsModule />;
      case "communications":
        return <CommunicationsModule />;
      case "pos":
        return <POSSystem />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {renderActiveView()}
    </DashboardLayout>
  );
};

export default Index;
