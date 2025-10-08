import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation, useApolloClient } from "@apollo/client";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  const client = useApolloClient();

  const addUser = async () => {
    // Clear any previous success message
    setSuccessMessage("");

    try {
      const result = await createUser({
        variables: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      // If we get here, the mutation succeeded
      if (result.data) {
        // Clear all form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

        // Show success message
        setSuccessMessage("User created successfully!");

        // Clear Apollo cache to remove any cached errors
        client.resetStore();

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      // Error is handled automatically by Apollo and available in the `error` variable
      console.log("Failed to create user:", err);
    }
  };
  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div
          style={{ color: "green", marginBottom: "10px", fontWeight: "bold" }}
        >
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>
          Error: {error.message}
        </div>
      )}

      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={addUser} disabled={loading}>
        {loading ? "Creating User..." : "Create User"}
      </button>
    </div>
  );
}

export default Form;
