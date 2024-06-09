import { redirect } from "next/navigation";
import DreamMain from "@/components/DreamMain";
import { getEntries } from "@/services/getEntries";
import { getUserByClerkID } from "@/app/api/auth/getUserByClerkID";

const JournalPage = async () => {
//   const userId = getUserByClerkID();

//   if (!userId) {
//     redirect("/login");
//   }

  const entries = await getEntries();

  return (
    <div className="px-10">
      <div className="flex flex-col">
        <DreamMain initialEntries={entries} />
      </div>
    </div>
  );
};

export default JournalPage;