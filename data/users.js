import bcrypt from "bcryptjs";

const users = [
  {
    email: "admin@example.com",
    password: bcrypt.hashSync("projectorganizeradmin", 10),
    isAdmin: true,
  },
];

export default users;
