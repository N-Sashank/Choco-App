import { client, db } from "@/app/db/index";
import { migrate } from "drizzle-orm/postgres-js/migrator"

async function main() {
        await migrate(db,{migrationsFolder:"./drizzle"});
        await client.end();
}
main();