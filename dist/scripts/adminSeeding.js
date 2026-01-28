"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@/config");
const db_1 = require("@/db");
(async () => {
    try {
        console.log("Starting admin user setup...");
        const adminUser = {
            name: config_1.config.ADMIN_NAME,
            email: config_1.config.ADMIN_EMAIL,
            password: config_1.config.ADMIN_PASSWORD,
            phone: config_1.config.ADMIN_PHONE,
        };
        console.log("Checking if admin user already exists...");
        const existingUser = await db_1.db.user.findFirst({
            where: {
                email: adminUser.email,
            },
        });
        if (existingUser) {
            console.error("Admin user already exists. Aborting.");
            throw new Error("User already exist");
        }
        console.log("Admin user not found. Creating new user...");
        console.log("Using environment values:");
        console.log("APP_URL:", config_1.config.APP_URL);
        console.log("BACKEND_URL:", config_1.config.BACKEND_URL);
        const response = await fetch(`${config_1.config.BACKEND_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                Origin: config_1.config.APP_URL,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminUser),
        });
        if (!response.ok) {
            console.error("API responded with an error:", response.status);
            throw new Error("User creation failed");
        }
        await db_1.db.user.update({
            where: {
                email: adminUser.email,
            },
            data: {
                emailVerified: true,
                role: "admin",
            },
        });
        console.log("Admin user created successfully");
    }
    catch (error) {
        console.error("Admin setup failed");
        console.error(error);
        process.exit(1);
    }
})();
