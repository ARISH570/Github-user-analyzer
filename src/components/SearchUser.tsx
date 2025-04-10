import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export function SearchUser() {
  return (
    <div className="flex items-center gap-4">
      <Input placeholder="Enter GitHub username" />
      <Button>Search</Button>
    </div>
  );
}

