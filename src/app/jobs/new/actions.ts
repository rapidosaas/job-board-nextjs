import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validations";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
  
    const {
      title,
      type,
      companyName,
      locationType,
      location,
      applicationEmail,
      applicationUrl,
      description,
      salary,
    } = createJobSchema.parse(values);
  
    const slug = `${toSlug(title)}-${nanoid(10)}`;
  
    console.log({
        title,
        type,
        companyName,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        description,
        salary,
        slug,
    });
    
      redirect("/job-submitted");
    }
