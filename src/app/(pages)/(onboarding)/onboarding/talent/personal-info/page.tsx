import getUserAndRole from "@/utils/getUserAndRole";
import PersonalInfoForm from "../../../_components/PersonalInfoForm";

const TalentPersonalDetailsScreen = async () => {
  const { user } = await getUserAndRole();

  if (!user) return null;

  return <PersonalInfoForm user={user} />;
};

export default TalentPersonalDetailsScreen;
