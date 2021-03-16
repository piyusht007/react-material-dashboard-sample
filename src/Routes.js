import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  JobList as JobListView,
  ProjectList as ProjectListView,
  SourcesList as SourcesListView,
  SourceDetails as SourceDetailsView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      {/*<Redirect
        exact
        from="/"
        to="/dashboard"
      />*/}
      <Route
        exact
        path='/sign-in'
        component={SignInView}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={ProjectListView}
        exact
        layout={MainLayout}
        path="/projects"
      />
      <RouteWithLayout
        component={JobListView}
        exact
        layout={MainLayout}
        path="/transactions"
      />
      <RouteWithLayout
        component={JobListView}
        exact
        layout={MainLayout}
        path="/transactions/:projectId"
      />
      <RouteWithLayout
        component={SourcesListView}
        exact
        layout={MainLayout}
        path="/sources"
      />
      <RouteWithLayout
        component={SourceDetailsView}
        exact
        layout={MainLayout}
        path="/sources/:sourceId"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      {/*<RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />*/}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
