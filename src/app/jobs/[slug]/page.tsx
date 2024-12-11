import JobPage from "@/components/JobPage";

export default async function Page({
    params,
  }: Readonly<{
    params: Promise<{ slug: string }>
  }>) {

    const slug = (await params).slug;    

    return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobPage slug={slug} />
    </main>
    );
}