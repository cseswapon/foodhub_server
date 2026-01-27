import { config } from "@/config";
import { db } from "@/db";

(async () => {
  try {
    console.log("Starting admin user setup...");

    const adminUser = {
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
      phone: config.ADMIN_PHONE,
    };

    console.log("Checking if admin user already exists...");

    const existingUser = await db.user.findFirst({
      where: {
        email: adminUser.email as string,
      },
    });

    if (existingUser) {
      console.error("Admin user already exists. Aborting.");
      throw new Error("User already exist");
    }

    console.log("Admin user not found. Creating new user...");
    console.log("Using environment values:");
    console.log("APP_URL:", config.APP_URL);
    console.log("BACKEND_URL:", config.BACKEND_URL);

    const response = await fetch(
      `${config.BACKEND_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          Origin: config.APP_URL!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUser),
      },
    );

    if (!response.ok) {
      console.error("API responded with an error:", response.status);
      throw new Error("User creation failed");
    }
    await db.user.update({
      where: {
        email: adminUser.email as string,
      },
      data: {
        emailVerified: true,
        role: "admin",
      },
    });
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Admin setup failed");
    console.error(error);
    process.exit(1);
  }
})();
