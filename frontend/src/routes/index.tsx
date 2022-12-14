import React from "react";
import { Route, Routes as RrdRoutes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Redirect from "./Redirect";
import GettingThingsReadyLoading from "../components/shared/loadings/GettingThingsReadyLoading";
import ErrorNotFoundPage from "../components/shared/errors/ErrorNotFoundPage";
import AuthRoutes from "./AuthRoutes";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";

const SignInScreen = React.lazy(() => import("../screens/SignInScreen"));
const SignUpScreen = React.lazy(() => import("../screens/SignUpScreen"));
const AccountScreen = React.lazy(() => import("../screens/AccountScreen"));
const ActivationSuccessfulScreen = React.lazy(
  () => import("../screens/ActivationSuccessfulScreen")
);

const ExpertGroupScreen = React.lazy(
  () => import("../screens/ExpertGroupScreen")
);

const AssessmentReportScreen = React.lazy(
  () => import("../screens/AssessmentReportScreen")
);
const SubjectReportScreen = React.lazy(
  () => import("../screens/SubjectReportScreen")
);
const SpacesScreen = React.lazy(() => import("../screens/SpacesScreen"));
const SpaceSettingScreen = React.lazy(
  () => import("../screens/SpaceSettingScreen")
);
const AssessmentsScreen = React.lazy(
  () => import("../screens/AssessmentsScreen")
);
const MetricsScreen = React.lazy(() => import("../screens/MetricsScreen"));
const MetricsReviewScreen = React.lazy(
  () => import("../screens/MetricsReviewScreen")
);
const MetricScreen = React.lazy(() => import("../screens/MetricScreen"));
const QuestionnairesScreen = React.lazy(
  () => import("../screens/QuestionnairesScreen")
);
const CompareScreen = React.lazy(() => import("../screens/CompareScreen"));
const CompareResultScreen = React.lazy(
  () => import("../screens/CompareResultScreen")
);

const ProfilesScreen = React.lazy(() => import("../screens/ProfilesScreen"));
const ProfileScreen = React.lazy(() => import("../screens/ProfileScreen"));

const Routes = () => {
  return (
    <React.Suspense fallback={<GettingThingsReadyLoading />}>
      <RrdRoutes>
        <Route path="/" element={<Redirect />} />
        <Route
          element={
            <AuthLayout>
              <AuthRoutes />
            </AuthLayout>
          }
        >
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route
            path="/account/active/:uid/:token"
            element={<ActivationSuccessfulScreen />}
          />
        </Route>

        <Route
          element={
            <AppLayout>
              <PrivateRoutes />
            </AppLayout>
          }
        >
          <Route
            path="/account/:username/:accountTab"
            element={<AccountScreen />}
          />
          <Route
            path="/account/:username/expert-groups/:expertGroupId"
            element={<ExpertGroupScreen />}
          />
          <Route
            path="/account/:username/expert-groups/:expertGroupId/profiles/:profileId"
            element={<ProfileScreen />}
          />
          <Route path="/spaces" element={<SpacesScreen />} />
          <Route path="/profiles" element={<ProfilesScreen />} />
          <Route path="/profiles/:profileId" element={<ProfileScreen />} />
          <Route path="/:spaceId/setting" element={<SpaceSettingScreen />} />
          <Route path="/:spaceId/assessments" element={<AssessmentsScreen />} />
          <Route
            path="/:spaceId/assessments/:assessmentId/insights"
            element={<AssessmentReportScreen />}
          />
          <Route
            path="/:spaceId/assessments/:assessmentId/insights/:subjectId"
            element={<SubjectReportScreen />}
          />
          <Route
            path="/:spaceId/assessments/:assessmentId/questionnaires"
            element={<QuestionnairesScreen />}
          />
          <Route
            path="/:spaceId/assessments/:assessmentId/questionnaires/:questionnaireId/review"
            element={<MetricsReviewScreen />}
          />
          <Route
            path="/:spaceId/assessments/:assessmentId/questionnaires/:questionnaireId"
            element={<MetricsScreen />}
          >
            <Route path="" element={<MetricScreen />} />
            <Route path=":metricIndex" element={<MetricScreen />} />
          </Route>
          <Route path="/compare" element={<CompareScreen />} />
          <Route path="/compare/result" element={<CompareResultScreen />} />
        </Route>
        <Route path="*" element={<ErrorNotFoundPage />} />
      </RrdRoutes>
    </React.Suspense>
  );
};

export default Routes;
