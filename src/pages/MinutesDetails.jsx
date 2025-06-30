import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, FileText, Download, Printer } from "lucide-react";

const mockMinutes = [
  {
    id: 1,
    title: "Weekly Team Meeting - January 15, 2024",
    date: "2024-01-15",
    author: "Alex Johnson",
    attendees: ["Alex Johnson", "Sarah Williams", "Mike Chen", "Emily Davis"],
    content: `
      <h3 class="font-bold text-lg mb-2">Agenda</h3>
      <ul class="list-disc list-inside mb-4">
        <li>Review of last week's action items</li>
        <li>Progress update on the annual event planning</li>
        <li>Budget discussion for Q1</li>
        <li>Open floor for new ideas</li>
      </ul>
      <h3 class="font-bold text-lg mb-2">Decisions</h3>
      <ul class="list-disc list-inside mb-4">
        <li>Budget for the annual event was approved.</li>
        <li>Task force for member recruitment was created.</li>
      </ul>
       <h3 class="font-bold text-lg mb-2">Action Items</h3>
      <ul class="list-disc list-inside">
        <li><b>Alex Johnson:</b> Finalize venue contract for the annual event.</li>
        <li><b>Sarah Williams:</b> Draft the announcement for the new recruitment task force.</li>
      </ul>
    `
  }
];

export default function MinutesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const minute = mockMinutes.find(m => m.id === Number(id));

  if (!minute) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Minutes not found</h2>
        <button 
          onClick={() => navigate('/minutes')}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Back to Minutes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <button 
        onClick={() => navigate('/minutes')}
        className="flex items-center text-primary hover:text-primary/80 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Minutes
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{minute.title}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-2">
                        <Calendar size={14}/>
                        <span>{minute.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={14}/>
                        <span>{minute.attendees.length} Attendees</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                    <Download size={16} />
                    Download PDF
                </button>
                 <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                    <Printer size={16} />
                    Print
                </button>
            </div>
        </div>
        
        <div className="border-t my-6"></div>

        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: minute.content }}
        >
        </div>
      </div>
    </div>
  );
} 