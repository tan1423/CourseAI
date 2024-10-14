/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./config/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:wtkoq5NfhAI7@ep-rough-cloud-a5xg20su.us-east-2.aws.neon.tech/AI-Course_Generator?sslmode=require',
  },
};
