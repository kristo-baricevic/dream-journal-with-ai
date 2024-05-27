import DreamMain from "@/components/DreamMain";
import { getEntries } from "@/utils/api";

const JournalPage = async () => {
    const entries = await getEntries();
    // console.log('Server-side entries:', entries);

    return (
        <div className="px-10">
           <div className="flex flex-col">
                <DreamMain initialEntries={entries} />
           </div>
        </div>
    );
}

export default JournalPage;
