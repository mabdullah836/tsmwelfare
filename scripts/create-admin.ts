import { withDbConnection } from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";

async function createAdmin() {
  const email = "admin@sirat-e-mustaqeem.org"; // set your desired admin email
  const password = "thesmw@123"; // set your desired password

  const hashedPassword = await bcrypt.hash(password, 10);

  await withDbConnection(async () => {
    // Remove ALL existing admins to strictly enforce a single admin
    await Admin.deleteMany({});
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    console.log("Admin user created:", email);
  });
}

createAdmin().catch((err) => {
  console.error(err);
}); 