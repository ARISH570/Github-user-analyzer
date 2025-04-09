import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" />;
}
