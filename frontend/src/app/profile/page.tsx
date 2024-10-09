import ProfileSettings from '../../components/ProfileSettings/ProfileSettings';



const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-8 items-center sm:items-start max-w-screen-lg mx-auto">
      <ProfileSettings/>
    </div>
  );
};

export default ProfilePage;
