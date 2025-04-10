import { Card, CardContent } from "@/components/ui/card";
import React from 'react';

interface User {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <img
        src={user.avatar_url || '/assets/default-profile.png'}
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400"
      />
      <h2 className="text-2xl font-bold mt-4">{user.name || user.login}</h2>
      <p className="text-gray-600">@{user.login}</p>
      <p className="mt-2 text-sm text-gray-500">{user.bio || 'No bio available'}</p>

      <div className="flex justify-around mt-6">
        <div>
          <p className="text-lg font-semibold">{user.public_repos}</p>
          <p className="text-xs text-gray-500">Repos</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{user.followers}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{user.following}</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        View Profile
      </a>
    </div>
  );
};

export default ProfileCard;
