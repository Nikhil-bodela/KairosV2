import IntroductionContainer from './Shared/IntroductionContainer';
import SidebarAdvice from './Student/Advice/Advice';
import SidebarBreakTimer from './Student/Break/Break';
import AboutMe from './Student/AboutMe/AboutMe';
import GuideMe from './Student/GuideMe/GuideMe';
import StudentProjects from './Student/StudentProjects/StudentProjects';
import SidebarMorningPulse from './Student/MorningPulse/MorningPulse';
import CreateProject from './Student/CreateProject/CreateProject';
import SidebarWorkshop from './WorkshopBuilder';
import ExpertFinderComponent from './Student/FindExperts/ExpertFinderComponent';
import StandardsSelector from './Student/StandardsSelector';
import { BookOpen } from 'lucide-react';

export default function StudentDashboard({ email }) {
  const openResourceLibrary = () => {
    google.script.run.openResourceLibrary();
  };

  return (
    <div>
      <IntroductionContainer />
      <SidebarMorningPulse />
      <CreateProject />
      <StudentProjects />
      <GuideMe />
      <SidebarWorkshop />
      <SidebarAdvice />
      <ExpertFinderComponent />
      <AboutMe />
      <SidebarBreakTimer />
      <StandardsSelector />
      
      {/* Resource Library Button */}
      <div className="w-full max-w-[300px] font-sans mt-4">
        <button
          onClick={openResourceLibrary}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          Open Resource Library
        </button>
      </div>
    </div>
  );
}
