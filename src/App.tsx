import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { Banner, BannerAdd, BannerEdit } from "./Home/Banner";
import { ContactForm } from "./components/Contact/ContactForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Blog, BlogAdd, BlogDataEdit, BlogEdit } from "./components/Blog/Blog";
import { ReactNode } from "react";
import { StartPracticing, StartPracticingAdd, StartPracticingEdit, StartPracticingQuoteEdit } from "./Home/StartPracticing";
import { ChooseUs, ChooseUsEdit, ChooseUsHeadingEdit, NumberAdd, NumberEdit } from "./Home/ChooseUs";
import { QuestionPaper, QuestionPaperAdd, QuestionPaperEdit } from "./Home/QuestionPaper";
import { LevelUp, LevelUpAdd, LevelUpEdit } from "./Home/LevelUp";
import { FirstStep, FirstStepAdd, FirstStepEdit, FirstStepEditImg } from "./Home/FirstStep";
import { FAQ, FAQAdd, FAQEdit, FAQEditData } from "./Home/FAQ";
import { SuccessStory, SuccessStoryAdd, SuccessStoryEdit, SuccessStoryEditImg } from "./Home/SuccessStory";
import { About, AboutAdd, AboutEdit } from "./About/About";
import { Service, ServiceAdd, ServiceEdit } from "./Service/Service";
import { Contact, ContactEdit } from "./components/Contact/Contact";
import { Test, TestAdd, TestEdit } from "./Test/Test";
import { Board, BoardAdd, BoardEdit, ClassAdd, ClassEdit, PdfAdd, PdfEdit, SubjectAdd, SubjectEdit } from "./Test/Board";
import { Practicepdf, PracticepdfAdd, PracticepdfEdit } from "./Test/PracticePdf";
import { EntranceExam, EntranceExamAdd, EntranceExamEdit, ExamPdfAdd, ExamPdfEdit, ExamSubjectAdd, ExamSubjectEdit } from "./Test/EntranceExam";
import { BoardClass } from "./Test/BoardClass";
import { BoardSubject } from "./Test/BoardSubject";
import { BoardPdf } from "./Test/BoardPdf";
import { ExamSubject } from "./Test/ExamSubject";
import { ExamPdf } from "./Test/ExamPdf";
import { Footer, FooterEdit } from "./Footer/Footer";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default function App() {

  return (
    <div>
    <Router>
            <ToastContainer style={{zIndex:"2147483647"}}/>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />

            {/* Home Page */}
            <Route path="/banner" element={<PrivateRoute><Banner/></PrivateRoute> } />
            <Route path="/banner-add" element={<PrivateRoute><BannerAdd /></PrivateRoute>  } />
            <Route path="/banner-edit/:id" element={<PrivateRoute><BannerEdit /></PrivateRoute>  } />

            <Route path="/StartPracticing" element={<PrivateRoute><StartPracticing/></PrivateRoute>}/>
            <Route path="/StartPracticing-add" element={<PrivateRoute><StartPracticingAdd/></PrivateRoute>}/>
            <Route path="/StartPracticing-edit/:id" element={<PrivateRoute><StartPracticingEdit/></PrivateRoute>}/>
            <Route path="/StartPracticingQuote-edit/:id" element={<PrivateRoute><StartPracticingQuoteEdit/></PrivateRoute>}/>

              <Route path="/ChooseUs" element={<PrivateRoute><ChooseUs/></PrivateRoute>}/>
              <Route path="/number-add" element={<PrivateRoute><NumberAdd/></PrivateRoute>}/>
               <Route path="/number-edit/:id" element={<PrivateRoute><NumberEdit /></PrivateRoute>  } />
               <Route path="/ChooseUs-heading-edit/:id" element={<PrivateRoute><ChooseUsHeadingEdit /></PrivateRoute>  } />
                 <Route path="/ChooseUs-edit/:id" element={<PrivateRoute><ChooseUsEdit /></PrivateRoute>  } />

                     <Route path="/QuestionPaper" element={<PrivateRoute><QuestionPaper/></PrivateRoute> } />
            <Route path="/QuestionPaper-add" element={<PrivateRoute><QuestionPaperAdd /></PrivateRoute>  } />
            <Route path="/QuestionPaper-edit/:id" element={<PrivateRoute><QuestionPaperEdit /></PrivateRoute>  } />

             <Route path="/LevelUp" element={<PrivateRoute><LevelUp/></PrivateRoute> } />
            <Route path="/LevelUp-add" element={<PrivateRoute><LevelUpAdd /></PrivateRoute>  } />
            <Route path="/LevelUp-edit/:id" element={<PrivateRoute><LevelUpEdit /></PrivateRoute>  } />

            <Route path="/FirstStep" element={<PrivateRoute><FirstStep/></PrivateRoute> } />
            <Route path="/FirstStep-add" element={<PrivateRoute><FirstStepAdd /></PrivateRoute>  } />
            <Route path="/FirstStep-edit/:id" element={<PrivateRoute><FirstStepEdit /></PrivateRoute>  } />
<Route path="/FirstStep-edit-img/:id" element={<PrivateRoute><FirstStepEditImg /></PrivateRoute>  } />

           <Route path="/FAQ" element={<PrivateRoute><FAQ/></PrivateRoute> } />
            <Route path="/FAQ-add" element={<PrivateRoute><FAQAdd /></PrivateRoute>  } />
            <Route path="/FAQ-edit/:id" element={<PrivateRoute><FAQEdit /></PrivateRoute>  } />
<Route path="/FAQ-edit-data/:id" element={<PrivateRoute><FAQEditData /></PrivateRoute>  } />

         <Route path="/SuccessStory" element={<PrivateRoute><SuccessStory/></PrivateRoute> } />
            <Route path="/SuccessStory-add" element={<PrivateRoute><SuccessStoryAdd /></PrivateRoute>  } />
            <Route path="/SuccessStory-edit/:id" element={<PrivateRoute><SuccessStoryEdit /></PrivateRoute>  } />
<Route path="/SuccessStory-edit-img/:id" element={<PrivateRoute><SuccessStoryEditImg /></PrivateRoute>  } />

  {/* About Page */}
    <Route path="/About" element={<PrivateRoute><About/></PrivateRoute> } />
            <Route path="/About-add" element={<PrivateRoute><AboutAdd /></PrivateRoute>  } />
            <Route path="/About-edit/:id" element={<PrivateRoute><AboutEdit /></PrivateRoute>  } />

              {/* Service Page */}
    <Route path="/Service" element={<PrivateRoute><Service/></PrivateRoute> } />
            <Route path="/Service-add" element={<PrivateRoute><ServiceAdd /></PrivateRoute>  } />
            <Route path="/Service-edit/:id" element={<PrivateRoute><ServiceEdit /></PrivateRoute>  } />
     
             {/* Test Page */}
            <Route path="/Test" element={<PrivateRoute><Test/></PrivateRoute>} />
            <Route path="/Test-add" element={<PrivateRoute><TestAdd/></PrivateRoute>} />
            <Route path="/Test-edit/:id" element={<PrivateRoute><TestEdit/></PrivateRoute>} />

               {/* Board Page */}
            <Route path="/Board" element={<PrivateRoute><Board/></PrivateRoute>} />
            <Route path="/Board-add" element={<PrivateRoute><BoardAdd/></PrivateRoute>} />
            <Route path="/Board-edit/:id" element={<PrivateRoute><BoardEdit/></PrivateRoute>}/>

            <Route path="/Class" element={<BoardClass/>}/>
            <Route path="/Class-add" element={<PrivateRoute><ClassAdd/></PrivateRoute>} />
            <Route path="/Class-edit/:id" element={<PrivateRoute><ClassEdit/></PrivateRoute>}/>
            
            <Route path="/BoardSubject" element={<PrivateRoute><BoardSubject/></PrivateRoute>}/>
            <Route path="/Subject-add" element={<PrivateRoute><SubjectAdd/></PrivateRoute>} />
            <Route path="/Subject-edit/:id" element={<PrivateRoute><SubjectEdit/></PrivateRoute>}/>
            
            <Route path="/BoardPdf" element={<PrivateRoute><BoardPdf/></PrivateRoute>}/>
            <Route path="/Pdf-add" element={<PrivateRoute><PdfAdd/></PrivateRoute>} />
            <Route path="/Pdf-edit/:id" element={<PrivateRoute><PdfEdit/></PrivateRoute>}/>

             {/* EntranceExam Page */}
            <Route path="/EntranceExam" element={<PrivateRoute><EntranceExam/></PrivateRoute>} />
            <Route path="/EntranceExam-add" element={<PrivateRoute><EntranceExamAdd/></PrivateRoute>} />
            <Route path="/EntranceExam-edit/:id" element={<PrivateRoute><EntranceExamEdit/></PrivateRoute>} />

            <Route path="/ExamSubject" element={<PrivateRoute><ExamSubject/></PrivateRoute>} />
            <Route path="/ExamSubject-add" element={<PrivateRoute><ExamSubjectAdd/></PrivateRoute>} />
            <Route path="/ExamSubject-edit/:id" element={<PrivateRoute><ExamSubjectEdit/></PrivateRoute>} />

            <Route path="/ExamPdf" element={<PrivateRoute><ExamPdf/></PrivateRoute>} />
            <Route path="/ExamPdf-add" element={<PrivateRoute><ExamPdfAdd/></PrivateRoute>} />
            <Route path="/ExamPdf-edit/:id" element={<PrivateRoute><ExamPdfEdit/></PrivateRoute>} />


                 {/* Practicepdf Page */}
            <Route path="/Practicepdf" element={<PrivateRoute><Practicepdf/></PrivateRoute>} />
            <Route path="/Practicepdf-add" element={<PrivateRoute><PracticepdfAdd/></PrivateRoute>} />
             <Route path="/Practicepdf-edit/:id" element={<PrivateRoute><PracticepdfEdit/></PrivateRoute>} />

             {/* Blog Page */}
            <Route path="/Blog" element={<PrivateRoute><Blog/></PrivateRoute>} />
            {/* <Route path="/Blog-detail/:id" element={<PrivateRoute><BlogDetail/></PrivateRoute>} /> */}
            <Route path="/Blog-add" element={<PrivateRoute><BlogAdd/></PrivateRoute>} />
            <Route path="/Blog-edit/:id" element={<PrivateRoute><BlogEdit/></PrivateRoute>} />
            <Route path="/Blog-data-edit/:id" element={<PrivateRoute><BlogDataEdit/></PrivateRoute>} />
            {/* <Route path="/Blog-detail-edit/:id" element={<PrivateRoute><BlogDetailEdit/></PrivateRoute>} /> */}

               {/* Contact Page */}
            <Route path="/Contact" element={<PrivateRoute><Contact/></PrivateRoute>} />
            <Route path="/Contact-edit/:id" element={<PrivateRoute><ContactEdit/></PrivateRoute>} />
            <Route path="/ContactForm" element={<PrivateRoute><ContactForm/></PrivateRoute>} />
            
              {/* Footer Page */}
            <Route path="/Footer" element={<PrivateRoute><Footer/></PrivateRoute>} />
            <Route path="/Footer-edit/:id" element={<PrivateRoute><FooterEdit/></PrivateRoute>} />

            </Route>

          {/* Fallback Route */}
          <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}
