import React from "react";

// templates
import TemplateView from "../../templates/view/view.template";

// components
import MyProfileContent from "./content/my-profile-content.component";

// interfaces
interface IViewMyProfile {
  appVersion: string;
  isLogged?: boolean;
}

const ViewMyProfile: React.FC<IViewMyProfile> = ({appVersion, isLogged}) => {
  
  return (
    <TemplateView
      appVersion={appVersion}
      viewTitle={`Mój profil`}
      isLogged={isLogged}
    >
      <MyProfileContent/>
    </TemplateView>
  );
};

export default ViewMyProfile;