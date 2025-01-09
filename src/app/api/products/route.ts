import { productSchema } from "@/validator/productSchema";
import { writeFile } from "node:fs";
import path from "node:path";
import { db } from "@/db/index";
import { productsTable } from "@/db/schema";

import fs from "fs";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  // console.log(request.json);
  const data = await request.formData();
  console.log(data);
  let validatedata;
  try {
    validatedata = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return Response.json({ message: "invalid", error }, { status: 400 });
  }

  const filename = `${Date.now()}.${validatedata.image.name
    .split(".")
    .slice(-1)}`;

  try {
    const buffer = Buffer.from(await validatedata.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", filename),
      buffer,
      (err) => {
        if (err) throw err;
      }
    );
  } catch (error) {
    return Response.json(
      { message: "failed to save the file to fs", error },
      { status: 500 }
    );
  }

  try {
    await db.insert(productsTable).values({ ...validatedata, image: filename });

    return Response.json({ message: "Product added" }, { status: 201 });
  } catch (error) {
    fs.unlink(filename, function (err: unknown) {
      if (err) throw err;
      console.log("File deleted!");
    });

    return Response.json(
      { message: "product not saved to database", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const productList = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.id));
    return Response.json(productList, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "cannot fetch product list" },
      { status: 500 }
    );
  }
}
