import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile()
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
};

export default Profile;
