import JobPagePublished from "@/components/JobPagePublished";

export default async function Page({
    params,
  }: Readonly<{
    params: Promise<{ 
      _id: number,
      slug: string 
    }>
  }>) {

    const { slug } = await params; 

    return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobPagePublished slug={slug} />
    </main>
    );
}