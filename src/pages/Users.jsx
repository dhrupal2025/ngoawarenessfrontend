import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      const response = await axios.get(
        "http://localhost:8081/api/registeruser"
      );

      setUsers(response.data);

    } catch (error) {
      console.log(error);
      alert("Unable to load users");
    }
  };

  const deleteUser = async (id) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8081/api/registeruser/${id}`
      );

      alert("User Deleted Successfully");

      loadUsers();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-success text-center mb-4">
          Registered Users
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-hover shadow">

            <thead className="table-success">

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Password</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>
                  <td colSpan="6" className="text-center">
                    No Users Found
                  </td>
                </tr>

              ) : (

                users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.mobile}</td>

                    <td>{user.password}</td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}

export default Users;