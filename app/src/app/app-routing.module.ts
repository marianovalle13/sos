import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'base', loadChildren: '../pages/base/base.module#BasePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'login-patent', loadChildren: '../pages/login-patent/login-patent.module#LoginPatentPageModule' },
  { path: 'welcome-user', loadChildren: '../pages/welcome-user/welcome-user.module#WelcomeUserPageModule' },
  { path: 'welcome-workingday', loadChildren: '../pages/welcome-workingday/welcome-workingday.module#WelcomeWorkingdayPageModule' },
  { path: 'status', loadChildren: '../pages/status/status.module#StatusPageModule' },
  { path: 'slide', loadChildren: '../pages/slide/slide.module#SlidePageModule' },
  { path: 'services', loadChildren: '../pages/services/services.module#ServicesPageModule' },
  { path: 'service/:id', loadChildren: '../pages/service/service.module#ServicePageModule' },
  { path: 'service-history/:id', loadChildren: '../pages/service-history/service-history.module#ServiceHistoryPageModule' },
  { path: 'record/:period', loadChildren: '../pages/record/record.module#RecordPageModule' },
  { path: 'record-filter', loadChildren: '../pages/record-filter/record-filter.module#RecordFilterPageModule' },
  { path: 'service-reason/:reason', loadChildren: '../pages/service-reason/service-reason.module#ServiceReasonPageModule' },
  // { path: 'service-accepted/:id', loadChildren: '../pages/service-accepted/service-accepted.module#ServiceAcceptedPageModule' },
  { path: 'status-change', loadChildren: '../pages/status-change/status-change.module#StatusChangePageModule' },
  { path: 'patent-new', loadChildren: '../pages/patent-new/patent-new.module#PatentNewPageModule' },
  { path: 'pic-tutorial', loadChildren: '../pages/pic-tutorial/pic-tutorial.module#PicTutorialPageModule' },
  { path: 'car-images', loadChildren: '../pages/car-images/car-images.module#CarImagesPageModule' },
  { path: 'car-image/:stage/:imageNumber/:conditional', loadChildren: '../pages/car-image/car-image.module#CarImagePageModule' },
  { path: 'check-images', loadChildren: '../pages/check-images/check-images.module#CheckImagesPageModule' },
  { path: 'taken-images', loadChildren: '../pages/taken-images/taken-images.module#TakenImagesPageModule' },
  { path: 'sign-tutorial', loadChildren: '../pages/sign-tutorial/sign-tutorial.module#SignTutorialPageModule' },
  { path: 'sign', loadChildren: '../pages/sign/sign.module#SignPageModule' },
  { path: 'patent-pic', loadChildren: '../pages/patent-pic/patent-pic.module#PatentPicPageModule' },
  { path: 'car-images4', loadChildren: '../pages/car-images4/car-images4.module#CarImages4PageModule' },
  { path: 'service-end', loadChildren: '../pages/service-end/service-end.module#ServiceEndPageModule' },
  { path: 'service-map/:id', loadChildren: '../pages/service-map/service-map.module#ServiceMapPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
