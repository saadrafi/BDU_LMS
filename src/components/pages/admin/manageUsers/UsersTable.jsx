import * as React from "react";
import SingleUserRow from "./SingleUserRow";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button, IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const handleUserApproval = (id, email) => {
    fetch("http://localhost:5000/admin/approveUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          fetch("http://localhost:5000/admin/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setUsers(data);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User Approved",
                text: data.msg,
                showConfirmButton: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "User Approval Failed",
                text: err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between my-5">
        <h1 className="text-3xl font-semibold text-[#0C61A2]">Users</h1>
        <Link to="/dashboard/admin/add-user">
          <Button variant="outlined" color="primary" startIcon={<PersonAddIcon></PersonAddIcon>}>
            Add User
          </Button>
        </Link>
      </div>
      <table className=" w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <SingleUserRow user={user} handleUserApproval={handleUserApproval} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
