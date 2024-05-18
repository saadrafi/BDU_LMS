import React from "react";

const SingleUserRow = ({ user, handleUserApproval }) => {
  return (
    <tr className=" border-b-2">
      <td className=" py-4">{user.id}</td>
      <td className="py-4">{user.email}</td>
      <td className="py-4">{user.role}</td>
      <td className="py-4">
        {user.isverified ? (
          <p className=" text-green-600">Yes</p>
        ) : (
          <p className="text-red-500">No</p>
        )}
      </td>
      <td className="py-4">
        {user.isApproved ? (
          <button className="bg-green-500 text-white px-2 py-1 rounded-md">Approved</button>
        ) : (
          <button
            onClick={() => {
              handleUserApproval(user.id, user.email);
            }}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Not Approved
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleUserRow;
