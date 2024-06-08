import DreamMain from "@/components/DreamMain";
import { getEntries } from "@/services/getEntries";

const JournalPage = async () => {
    const entries = await getEntries();

    return (
        <div className="px-10">
           <div className="flex flex-col">
                <DreamMain initialEntries={entries} />
           </div>
        </div>
    );
}

export default JournalPage;
