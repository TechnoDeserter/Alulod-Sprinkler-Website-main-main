import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

import Footer from "@/components/templates/Footer";
//! /* Add Pages Here */
import AIPage from "../custom/AIPage";
import Overlay from "@/components/templates/Overlay";
import { useC, useS } from "@/hooks/useReactHooks";

import MainPage from "../custom/MainPage";
import Sample_LogsPage from "../z/Logs/Sample_LogsPage";
import FirstVisitPage from "../custom/FirstVisitPage";
import { FHContext } from "../templates/FH_Wrapper";

// ? ----------------------
// ? PAGES
// ? BOTTOM SHEETS
// ? ----------------------

export const enum Pages {
  Main,
  AI,
}

//********************************* */
const defaultPage = Pages.Main;
//********************************* */

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: {} as Dispatch<SetStateAction<Pages>>,
  overlay: null as ReactNode | null,
  setOverlay: {} as Dispatch<SetStateAction<ReactNode | null>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  const { firstVisit } = useC(FHContext);

  //! OVERLAY
  const [overlay, setOverlay] = useS<ReactNode | null>(null);

  //! Page
  const [page, setPage] = useS<Pages>(defaultPage);

  if (firstVisit) {
    return <FirstVisitPage />;
  }

  return (
    <PageWrapperContext
      value={{
        page,
        setPage,
        overlay,
        setOverlay,
      }}
    >
      <Footer
        className=""
        // pages={{
        //   [Pages.Main]: <ControlsIcon />,
        //   [Pages.Settings]: <SettingsIcon />,
        // }}
      />

      <div className="overflow-y-auto wf hf">
        {page === Pages.Main && <MainPage />}
        {/*//! Add Page Mapping Here */}
        {page === Pages.AI && <AIPage />}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext>
  );
};

export default PageWrapper;
